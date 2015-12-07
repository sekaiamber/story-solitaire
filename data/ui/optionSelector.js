/* global $ */
define([
    '../var/helper',
    './passageInit'
], function(helper, factory) {
    'use strict';
    return function($moveTarget, config, status, index, text) {
        status = status || 'menu';
        var $selector = factory(index, text);
        $selector.addClass('editor').addClass(status);
        // index
        var $menuindex = $(".cs-passage-index", $selector);
        $menuindex.addClass('menu').addClass('is-visible').addClass('iconfont').addClass('icon-wenhao');
        var $selectindex = $(helper.domMaker({
            name: 'div',
            class: ['cs-passage-index', 'select', 'is-hidden', 'iconfont', 'icon-dianji'],
        }));
        $selector.append($selectindex);
        var $textindex = $(helper.domMaker({
            name: 'div',
            class: ['cs-passage-index', 'text', 'is-hidden', 'iconfont', 'icon-iconspeak']
        }));
        $selector.append($textindex);
        // menu
        var $menu = $(helper.domMaker({
            name: 'div',
            class: ['cs-passage-menu'],
            children: [{
                name: 'div',
                class: ['cs-passage-option', 'select'],
                children: [{
                    name: 'span',
                    class: ['iconfont', 'icon-dianji'],
                }, {
                    name: 'span',
                    class: ['cs-passage-span'],
                    html: '随缘选一个'
                }]
            }, {
                name: 'div',
                class: ['cs-passage-option', 'text'],
                children: [{
                    name: 'span',
                    class: ['iconfont', 'icon-iconspeak']
                }, {
                    name: 'span',
                    class: ['cs-passage-span'],
                    html: '自己扯一个'
                }]
            }]
        }));
        $selector.append($menu);
        $('.cs-passage-option.select', $menu).click(function(){
            $('.cs-passage-index.is-visible').removeClass('is-visible').addClass('is-hidden');
            $('.cs-passage-index.select').removeClass('is-hidden').addClass('is-visible');
            $menu.fadeOut(300, function() {
                $('.cs-passage-select', $selector).fadeIn(300);
            });
            $selector.removeClass('menu text');
            $selector.addClass('select');
        });
        $('.cs-passage-option.text', $menu).click(function(){
            $('.cs-passage-index.is-visible').removeClass('is-visible').addClass('is-hidden');
            $('.cs-passage-index.text').removeClass('is-hidden').addClass('is-visible');
            $menu.fadeOut(300, function() {
                $('.cs-passage-text', $selector).fadeIn(300);
            });
            $selector.removeClass('menu select');
            $selector.addClass('text');
        });
        // text
        var $text = $(".cs-passage-text", $selector);
        var $input = $(helper.domMaker({
            name: 'div',
            class: ['cs-passage-input'],
            attr: { contentEditable: 'true' }
        }));
        var $count = $(helper.domMaker({
            name: 'div',
            class: ['cs-passage-count'],
            html: '0/' + config.maxinputcount
        }));
        $input.focus(function() {
            console.log(1);
        });
        $input.on('blur keyup paste input', function() {
            var $this = $(this);
            var t = $count.html(); 
            t = t.substring(t.length - 4);
            t = $this.text().length + t;
            $count.html(t);
            return $this;
        });
        var $textcontrol = $(helper.domMaker({
            name: 'div',
            class: ['cs-passage-text-ctl'],
            children: [{
                name: 'div',
                class: ['ok'],
                html: '确定'
            }, {
                name: 'div',
                class: ['return'],
                html: '返回'
            }]
        }));
        $('.return', $textcontrol).click(function() {
            $('.cs-passage-index.is-visible').removeClass('is-visible').addClass('is-hidden');
            $('.cs-passage-index.menu').removeClass('is-hidden').addClass('is-visible');
            $text.fadeOut(300, function() {
                $($menu, $selector).fadeIn(300);
            });
        });
        $('.ok').click(function() {
            // todo
        });
        var $textarea = $(helper.domMaker({
            name: 'div',
            class: ['cs-passage-textarea']
        }));
        $textarea.append($input).append($count);
        $text.append($textarea).append($textcontrol);
        // select
        var $select = $(helper.domMaker({
            name: 'div',
            class: ['cs-passage-select'],
            attr: { style: 'display:none;' },
            children: [{
                name: 'div',
                class: ['cs-passage-select-list']
            }, {
                name: 'div',
                class: ['cs-passage-select-ctl'],
                children: [{
                    name: 'div',
                    class: ['ok'],
                    html: '确定'
                }, {
                    name: 'div',
                    class: ['change'],
                    html: '换一批'
                }, {
                    name: 'div',
                    class: ['return'],
                    html: '返回'
                }]
            }]
        }));
        var selectcontrol = $('.cs-passage-select-ctl', $select);
        $('.return', selectcontrol).click(function() {
            $('.cs-passage-index.is-visible').removeClass('is-visible').addClass('is-hidden');
            $('.cs-passage-index.menu').removeClass('is-hidden').addClass('is-visible');
            $select.fadeOut(300, function() {
                $($menu, $selector).fadeIn(300);
            });
        });
        $selector.append($select);
        // other
        $selector.append($('<div style="clear:both;"></div>'));
        switch (status) {
            case 'menu':
                $('.cs-passage-text', $selector).css('display', 'none');
                break;
            case 'text':
                $('.cs-passage-menu', $selector).css('display', 'none');
                break;
            case 'select':
                $('.cs-passage-menu', $selector).css('display', 'none');
                break;
            default:
                break;
        }
        return $selector;
    }
});