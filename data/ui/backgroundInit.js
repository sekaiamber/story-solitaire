/* global $ */
define([
    '../var/helper',
], function(helper) {
    'use strict';
    var $img = $('#top .top-bg img').first();
    return function(config) {
        if (config.ua.indexOf('mqqbrowser') == -1) {
            // var drag = false;
            // var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            // var render = function() {
            //     // if (drag) {
            //         $img.css('transform','translateY(' + config.bgImageSpeed * $(window).scrollTop() + 'px)');
            //     // }
            //     requestAnimationFrame(render);
            // };
            // requestAnimationFrame(render);
            $(window).scroll(function(e) {
                $img.css('transform','translateY(' + config.bgImageSpeed * $(window).scrollTop() + 'px)');
            });
        }
    }
});