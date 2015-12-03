/* global $ */
define([
    './passagereset'
],function(passageReset) {
    'use strict';
    return function($target, $moveTarget, config) {
        var $dragcontent = $('<div class="dragcontent" style="height:100%;width:100%;overflow-y:scroll;padding:0 1000px 0 0;"></div>');
        $moveTarget.wrap($dragcontent);
        var mt = config.dragFocus;
        var mb = $target.height() - mt;
        $moveTarget.css('margin', mt + 'px 0 ' + mb + 'px 0');
        $dragcontent = $('.dragcontent', $target);
        $moveTarget.data({
            y: 0,
            stack: [],
            stackDom: [],
            current: 0,
            currentDom: null,
            dragstart: false,
        });
        var zero = 0;
        $(".cs-passage", $moveTarget).each(function(i) {
            if(i == 0) {
                zero = $(this).position().top
                $(this).addClass('active');
                $moveTarget.data('currentDom', $(this));
            };
            $moveTarget.data('stack').push($(this).position().top - zero);
            $moveTarget.data('stackDom').push($(this));
        });
        var stack = $moveTarget.data('stack');
        var stackDom = $moveTarget.data('stackDom');
        var currentIdx = 0;
        $dragcontent.scroll(function(e) {
            if ($moveTarget.data('dragstart')) {
                var top = $(this).scrollTop();
                var idx = 0;
                for (var i = 0; i < stack.length; i++) {
                    if (top >= stack[i]) {
                        idx = i;
                    } else {
                        break;
                    }
                }
                if (currentIdx != idx) {
                    $moveTarget.data('currentDom').removeClass('active');
                    stackDom[idx].addClass('active');
                    currentIdx = idx;
                    $moveTarget.data('current', idx);
                    $moveTarget.data('currentDom', stackDom[idx]);
                }
            }
        });
        $target.each(function() {
            var target = this;
            this.addEventListener("touchstart", {
                startPos: null,
                prevPos: null,
                endPos: null,
                handleEvent: function(event) {
                    var self = this;
                    if (event.type == 'touchstart') {
                        self.start(event);
                    } else if (event.type == 'touchmove') {
                        self.move(event);
                    } else if (event.type == 'touchend') {
                        self.end(event);
                    }
                },
                start: function(event){
                    var touch = event.targetTouches[0];
                    // this.startPos = {
                    //     x: touch.pageX,
                    //     y: touch.pageY,
                    //     time: +new Date
                    // };
                    // this.prevPos = {
                    //     x: touch.pageX,
                    //     y: touch.pageY,
                    //     time: +new Date
                    // };
                    target.addEventListener('touchmove', this, false);
                    target.addEventListener('touchend', this, false);
                    $moveTarget.data('dragstart', true);
                },
                move: function(event) {
                    if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
                    // var touch = event.targetTouches[0];
                    // var endPos = {
                    //     x: touch.pageX - this.prevPos.x,
                    //     y: touch.pageY - this.prevPos.y
                    // };
                    // this.prevPos.x = touch.pageX;
                    // this.prevPos.y = touch.pageY;
                    
                    // this.isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;
                    // if (this.isScrolling === 1){
                    // }
                },
                end:function(event){
                    // var duration = +new Date - this.startPos.time;
                    // //解绑事件
                    $moveTarget.data('dragstart', false);
                    target.removeEventListener('touchmove',this,false);
                    target.removeEventListener('touchend',this,false);
                    passageReset($moveTarget, $dragcontent, config.dragFocus);
                }
            }, false);
        });
        
    }
});