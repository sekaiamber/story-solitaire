/* global $ */
define([
    '../var/helper',
    './passageInit'
], function(helper, factory) {
    'use strict';
    return function($moveTarget, status, index, text) {
        status = status || 'menu';
        var $selector = factory(index, text);
        $selector.addClass('editor').addClass(status);
        var $menu = helper.domMaker({
            name: 'div',
            class: ['cs-passage-menu'],
            children: [{
                name: 'div',
                class: ['cs-passage-option', 'select']
            }, {
                name: 'div',
                class: ['cs-passage-option', 'text']
            }]
        });
        var $text = $(".cs-passage-text", $selector);
        $text.attr('contentEditable', 'true');
        $text.focus(function() {
            var p = $moveTarget.parent();
            p.scroll(p.height());
        });
        $selector.append($menu);
        return $selector;
    }
});