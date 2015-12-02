/* global $ */
define([
    './dragscreen'
], function(dragscreen) {
    'use strict';
    var Cls_ui = function(config) {
        this.config = config;
        this.init();
    };
    Cls_ui.prototype = {
        init: function() {
            this.$target = $(this.config.target);
            var $moveTarget = $(this.config.moveTarget);
            $moveTarget.data({
                y: 0,
                stack: []
            });
            $(".cs-passage", $moveTarget).each(function() {
                
            });
            dragscreen(document.getElementById(this.config.dragscreen), $moveTarget);
        }
    }
    return Cls_ui;
});