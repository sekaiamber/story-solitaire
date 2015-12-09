/* global $ */
define([
    './backgroundInit',
    './contentInit',
], function(backgroundInit, contentInit) {
    'use strict';
    var Cls_ui = function(config) {
        this.config = config;
        this.init();
    };
    Cls_ui.prototype = {
        init: function() {
            this.$target = $(this.config.target);
            backgroundInit(this.config);
            var $moveTarget = $(this.config.moveTarget);
            contentInit($moveTarget, this.config);
        }
    }
    return Cls_ui;
});