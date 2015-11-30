/* global $ */
define(function() {
    'use strict';
    var Cls_ui = function(config) {
        this.init($(config.target));
    };
    Cls_ui.prototype = {
        init: function($target) {
            this.$target = $target;
        }
    }
    return Cls_ui;
});