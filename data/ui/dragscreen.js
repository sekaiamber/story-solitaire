/* global $ */
define(function() {
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
            current: null,
        });
        var zero = 0;
        $(".cs-passage", $moveTarget).each(function(i) {
            if(i == 0) {
                zero = $(this).position().top
                $(this).addClass('active');
                $moveTarget.data('current', $(this));
            };
            $moveTarget.data('stack').push($(this).position().top - zero);
            $moveTarget.data('stackDom').push($(this));
        });
        var stack = $moveTarget.data('stack');
        var stackDom = $moveTarget.data('stackDom');
        $dragcontent.scroll(function(e) {
            var top = $(this).scrollTop();
            
            var idx = 0;
            for (var i = 0; i < stack.length; i++) {
                if (top >= stack[i]) {
                    idx = i;
                } else {
                    break;
                }
            }
            // console.log(e);
            $moveTarget.data('current').removeClass('active');
            stackDom[idx].addClass('active');
            $moveTarget.data('current', stackDom[idx]);
            // console.log(idx);
        });
        // $target.each(function() {
        //     var target = this;
        //     this.addEventListener("touchstart", {
        //         $dragcontent: $dragcontent,
        //         startPos: null,
        //         prevPos: null,
        //         endPos: null,
        //         handleEvent: function(event) {
        //             var self = this;
        //             if (event.type == 'touchstart') {
        //                 self.start(event);
        //             } else if (event.type == 'touchmove') {
        //                 self.move(event);
        //             } else if (event.type == 'touchend') {
        //                 self.end(event);
        //             }
        //         },
        //         start: function(event){
        //             var touch = event.targetTouches[0];
        //             this.startPos = {
        //                 x: touch.pageX,
        //                 y: touch.pageY,
        //                 time: +new Date
        //             };
        //             this.prevPos = {
        //                 x: touch.pageX,
        //                 y: touch.pageY,
        //                 time: +new Date
        //             };
        //             this.$dragcontent = $('.dragcontent');
        //             var isScrolling = 0;
        //             target.addEventListener('touchmove', this, false);
        //             target.addEventListener('touchend', this, false);
        //         },
        //         move: function(event) {
        //             if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
        //             var touch = event.targetTouches[0];
        //             var endPos = {
        //                 x: touch.pageX - this.prevPos.x,
        //                 y: touch.pageY - this.prevPos.y
        //             };
        //             this.prevPos.x = touch.pageX;
        //             this.prevPos.y = touch.pageY;
                    
        //             this.isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;
        //             // if (this.isScrolling === 1){
        //             //     event.preventDefault();
        //             //     // this.slider.className = 'cnt';
        //             //     // this.slider.style.left = -this.index*600 + endPos.x + 'px';
        //             //     var y = $moveTarget.data('y') + endPos.y;
        //             //     $moveTarget.data('y', y);
        //             //     // $moveTarget.css('transform', 'translateY(' + y + 'px)');
        //             // }
        //             // console.log(this.$dragcontent.scrollTop());
        //         },
        //         end:function(event){
        //             var duration = +new Date - this.startPos.time;
        //             // if(this.isScrolling === 0){    //当为水平滚动时
        //             //     this.icon[this.index].className = '';
        //             //     if(Number(duration) > 10){     
        //             //         //判断是左移还是右移，当偏移量大于10时执行
        //             //         if(endPos.x > 10){
        //             //             if(this.index !== 0) this.index -= 1;
        //             //         }else if(endPos.x < -10){
        //             //             if(this.index !== this.icon.length-1) this.index += 1;
        //             //         }
        //             //     }
        //             //     this.icon[this.index].className = 'curr';
        //             //     this.slider.className = 'cnt f-anim';
        //             //     this.slider.style.left = -this.index*600 + 'px';
        //             // }
        //             // //解绑事件
        //             target.removeEventListener('touchmove',this,false);
        //             target.removeEventListener('touchend',this,false);
        //         }
        //     }, false);
        // });
        
    }
});