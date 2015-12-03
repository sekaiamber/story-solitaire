/* global $ */
define(function() {
    'use strict';
    return function(index, text) {
        index = index || '?';
        text = text || '';
        var $passage = $('<div class="cs-passage" index="' + index + '"></div>');
        $passage.append('<div class="cs-passage-text">' + text + '</div>');
        $passage.append('<div class="cs-passage-index">' + index + '</div>');
        return $passage;
    }
});