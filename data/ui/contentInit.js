/* global $ */
define([
    './optionSelector'
], function(optionSelector) {
    'use strict';
    return function($moveTarget, config) {
        $moveTarget.css('margin', config.dragTop + ' 0 ' + config.dragBottom + ' 0');
        $(".cs-passage", $moveTarget).each(function() {
            var $this = $(this);
            var text = $this.html();
            $this.empty();
            $this.append('<div class="cs-passage-text">' + text + '</div>');
            $this.append('<div class="cs-passage-index">' + $this.attr('index') + '</div>');
        });
        $moveTarget.append(optionSelector($moveTarget, config));
    }
});