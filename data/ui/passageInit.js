/* global $ */
define([
    '../var/helper'
], function(helper) {
    'use strict';
    return function(index, text) {
        index = index || '?';
        text = text || '';
        var $passage = $(helper.domMaker('div', {
            class: ['cs-passage'],
            attr: { index: index }
        }));
        $passage.append(helper.domMaker('div', {
            class: ['cs-passage-text'],
            html: text
        }));
        $passage.append(helper.domMaker('div', {
            class: ['cs-passage-index'],
            html: index
        }));
        return $passage;
    }
});