/* global $ */
define(function() {
    'use strict';
    return function($moveTarget, config) {
        $moveTarget.css('margin', config.dragTop + 'px 0 ' + config.dragBottom + 'px 0');
    }
});