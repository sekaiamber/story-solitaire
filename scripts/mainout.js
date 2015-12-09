define("var/helper",{fxNull:function(){},_dom:'<%em id="%id" class="%cls" %attr>%html</%em>',domMaker:function(e,t){if(typeof e=="object")t=e,e=t.name;else if(!t)return"<"+e+"></"+e+">";var n=this._dom;t.id?n=n.replace("%id",t.id):n=n.replace('id="%id"',""),t["class"]?n=n.replace("%cls",t["class"].join(" ")):n=n.replace('class="%cls"',"");if(t.attr){var r="";for(var i in t.attr)t.attr.hasOwnProperty(i)&&(r+=i+'="'+t.attr[i]+'" ');n=n.replace("%attr",r)}else n=n.replace("%attr","");t.html?n=n.replace("%html",t.html):n=n.replace("%html","");if(t.children){var s="";for(var o=0;o<t.children.length;o++)s+=this.domMaker(t.children[o]);n=n.replace("</%em>",s+"</%em>")}return n=n.replace(/%em/g,e),n}}),define("ui/backgroundInit",["../var/helper"],function(e){"use strict";var t=$("#top .top-bg img").first();return function(e){e.ua.indexOf("mqqbrowser")==-1&&$(window).scroll(function(n){t.css("transform","translateY("+e.bgImageSpeed*$(window).scrollTop()+"px)")})}}),define("config",{__version__:"0.0.1",ui:{ua:navigator.userAgent.toLowerCase(),target:"#main",moveTarget:"#content",dragTop:"1rem",dragBottom:"15rem",maxinputcount:200,getNextPassagesSize:4,bgImageSpeed:.5},route:{getNextPassages:"./api/getnextpassages/%id.json"}}),define("ui/passageInit",["../var/helper"],function(e){"use strict";return function(t,n,r){t=t||"",n=n||"";var i=$(e.domMaker({name:"div","class":["cs-passage"],attr:{index:t},id:r,children:[{name:"div","class":["cs-passage-text"],html:n},{name:"div","class":["cs-passage-index"],html:t}]}));return i}}),define("ui/optionSelector",["../var/helper","../config","./passageInit"],function(e,t,n){"use strict";var r=function(e,n,r,i){i=i||t.ui.getNextPassagesSize,$.ajax({url:t.route.getNextPassages.replace("%id",e)}).done(function(e){n(e.data)})};return function(t,i,s,o,u){s=s||"menu",o=o||"?";var a=n(o,u);a.addClass("editor").addClass(s);var f={currentId:$('.cs-passage[index!="?"]:last').attr("id"),currentIndex:parseInt($('.cs-passage[index!="?"]:last').attr("index")),selectEmpty:!1,submit:function(e){return"__TODO__"},updatePassage:function(e,t){var r=n(a.data("currentIndex")+1,t,e);r.addClass("animated bounceIn"),a.before(r),a.data("empty")()}};a.data(f);var l=$(".cs-passage-index",a);l.addClass("menu").addClass("is-visible").addClass("iconfont").addClass("icon-wenhao"),l.empty();var c=$(e.domMaker({name:"div","class":["cs-passage-index","select","is-hidden","iconfont","icon-dianji"]}));a.append(c);var h=$(e.domMaker({name:"div","class":["cs-passage-index","text","is-hidden","iconfont","icon-iconspeak"]}));a.append(h);var p=$(e.domMaker({name:"div","class":["cs-passage-menu"],children:[{name:"div","class":["cs-passage-option","select"],children:[{name:"span","class":["iconfont","icon-dianji"]},{name:"span","class":["cs-passage-span"],html:"随缘选一个"}]},{name:"div","class":["cs-passage-option","text"],children:[{name:"span","class":["iconfont","icon-iconspeak"]},{name:"span","class":["cs-passage-span"],html:"自己扯一个"}]}]}));a.append(p);var d=$(".cs-passage-text",a),v=$(e.domMaker({name:"div","class":["cs-passage-input"],attr:{contentEditable:"true"}})),m=$(e.domMaker({name:"div","class":["cs-passage-count"],html:"0/"+i.maxinputcount}));v.on("blur keyup paste input",function(){var e=$(this),t=m.html();return t=t.substring(t.length-4),t=e.text().length+t,m.html(t),e});var g=$(e.domMaker({name:"div","class":["cs-passage-text-ctl"],children:[{name:"div","class":["ok"],html:"确定"},{name:"div","class":["return"],html:"返回"}]}));$(".return",g).click(function(){$(".cs-passage-index.is-visible",a).removeClass("is-visible").addClass("is-hidden"),$(".cs-passage-index.menu",a).removeClass("is-hidden").addClass("is-visible"),d.fadeOut(300,function(){$(p,a).fadeIn(300)})}),$(".ok",g).click(function(){});var y=$(e.domMaker({name:"div","class":["cs-passage-textarea"]}));y.append(v).append(m),d.append(y).append(g);var b=$(e.domMaker({name:"div","class":["cs-passage-select"],attr:{style:"display:none;"},children:[{name:"div","class":["cs-passage-select-list"],children:[{name:"div","class":["cs-passage-select-list-content"]},{name:"div","class":["cs-passage-select-loading","animated","swing","infinite"],html:"死命加载中..."},{name:"div","class":["cs-passage-select-msg","is-hidden"],html:""}]},{name:"div","class":["cs-passage-select-ctl"],children:[{name:"div","class":["ok"],html:"确定"},{name:"div","class":["return"],html:"返回"}]}]})),w=$(".cs-passage-select-ctl",b);$(".return",w).click(function(){$(".cs-passage-index.is-visible",a).removeClass("is-visible").addClass("is-hidden"),$(".cs-passage-index.menu",a).removeClass("is-hidden").addClass("is-visible"),b.fadeOut(300,function(){$(p,a).fadeIn(300)})}),$(".ok",w).click(function(){var e=$(".cs-passage-select-list-item.is-active",E);e.length&&($(".return",w).click(),a.data("updatePassage")(e.attr("id"),e.text()))}),a.append(b);var E=$(".cs-passage-select-list-content",b),S=$(".cs-passage-select-loading",b),x=$(".cs-passage-select-msg",b),T=function(t){if(!t)return;for(var n=0;n<t.length;n++){var r=$(e.domMaker({name:"div","class":["cs-passage-select-list-item"],attr:{id:t[n].id},html:t[n].content}));r.click(function(){var e=$(this);$(".cs-passage-select-list-item.is-active",E).removeClass("is-active"),e.addClass("is-active")}),E.append(r)}t.length>0?a.data("selectEmpty",!0):(x.html("没有后续啦，自己扯一个吧！"),x.removeClass("is-hidden")),S.addClass("is-hidden")};a.data("empty",function(){E.empty(),v.empty(),a.data("selectEmpty",!1),a.data("currentId",$('.cs-passage[index!="?"]:last').attr("id")),a.data("currentIndex",parseInt($('.cs-passage[index!="?"]:last').attr("index"))),x.addClass("is-hidden")}),$(".cs-passage-option.select",p).click(function(){$(".cs-passage-index.is-visible",a).removeClass("is-visible").addClass("is-hidden"),$(".cs-passage-index.select",a).removeClass("is-hidden").addClass("is-visible"),p.fadeOut(300,function(){a.data("selectEmpty")||S.removeClass("is-hidden"),x.addClass("is-hidden"),b.fadeIn(300,function(){a.data("selectEmpty")||r(a.data("currentId"),T,0)})}),a.removeClass("menu text"),a.addClass("select")}),$(".cs-passage-option.text",p).click(function(){$(".cs-passage-index.is-visible",a).removeClass("is-visible").addClass("is-hidden"),$(".cs-passage-index.text",a).removeClass("is-hidden").addClass("is-visible"),p.fadeOut(300,function(){d.fadeIn(300)}),a.removeClass("menu select"),a.addClass("text")}),a.append($('<div style="clear:both;"></div>'));switch(s){case"menu":$(".cs-passage-text",a).css("display","none");break;case"text":$(".cs-passage-menu",a).css("display","none");break;case"select":$(".cs-passage-menu",a).css("display","none");break;default:}return a}}),define("ui/contentInit",["./optionSelector"],function(e){"use strict";return function(t,n){t.css("margin",n.dragTop+" 0 "+n.dragBottom+" 0"),$(".cs-passage",t).each(function(){var e=$(this),t=e.html();e.empty(),e.append('<div class="cs-passage-text">'+t+"</div>"),e.append('<div class="cs-passage-index">'+e.attr("index")+"</div>")}),t.append(e(t,n))}}),define("ui/main",["./backgroundInit","./contentInit"],function(e,t){"use strict";var n=function(e){this.config=e,this.init()};return n.prototype={init:function(){this.$target=$(this.config.target),e(this.config);var n=$(this.config.moveTarget);t(n,this.config)}},n}),define("ui",["./ui/main","config"],function(e,t){"use strict";var n=new e(t.ui);return window.ui=n,e}),define("main",["ui"],function(e,t){"use strict";});