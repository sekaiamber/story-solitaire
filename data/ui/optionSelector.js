/* global $ */
define([
    './passageInit'
], function(factory) {
    'use strict';
    return function($moveTarget, isNoSelect, index, text) {
        var $selector = factory(index, text);
        $selector.addClass('editor').addClass('menu');
        var $text = $(".cs-passage-text", $selector);
        $text.attr('contentEditable', 'true');
        $text.focus(function() {
            var p = $moveTarget.parent(); 
            p.scroll(p.height());
        });
        return $selector;
    }
});