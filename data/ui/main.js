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
            var $dragscreen = $(this.config.dragscreen)
            dragscreen($dragscreen, $moveTarget, this.config);
        }
    }
    return Cls_ui;
});