/* global $ */
define([
    '../var/helper'
], function(helper) {
    'use strict';
    return function(index, text, id) {
        index = index || '';
        text = text || '';
        var $passage = $(helper.domMaker({
            name: 'div',
            class: ['cs-passage'],
            attr: { index: index },
            id: id,
            children: [{
                name: 'div',
                class: ['cs-passage-text'],
                html: text
            }, {
                name: 'div',
                class: ['cs-passage-index'],
                html: index
            }]
        }));
        return $passage;
    }
});