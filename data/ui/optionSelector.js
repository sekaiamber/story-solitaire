/* global $ */
define([
    '../var/helper',
    '../config',
    './passageInit',
], function(helper, config, factory) {
    'use strict';
    var getNextPassages = function(resource, callback, from, size) {
        size = size || config.ui.getNextPassagesSize;
        $.ajax({
            url: config.route.getNextPassages.replace('%id', resource)
        }).done(function(data) {
            callback(data.data)
        });
    };
    return function($moveTarget, config, status, index, text) {
        status = status || 'menu';
        index = index || '?';
        var $selector = factory(index, text);
        $selector.addClass('editor').addClass(status);
        // data
        var domdata = {
            currentId: $('.cs-passage[index!="?"]:last').attr('id'),
            currentIndex: parseInt($('.cs-passage[index!="?"]:last').attr('index')),
            selectEmpty: false,
            submit: function(content) {
                // TODO
                return '__TODO__';
            },
            updatePassage: function(id, content) {
                var $new = factory($selector.data('currentIndex') + 1, content, id);
                $new.addClass('animated bounceIn');
                $selector.before($new);
                helper.changeCurrentUrl(id);
                $selector.data('empty')();
            }
        }
        $selector.data(domdata);
        $(window.location).on('change', function(e, data) {
            var current = null;
            // zero
            if (data.currentHash == "") {
                current = $('.cs-passage[index="0"]');
            } else {
                current = $(data.currentHash);
            }
            if (current.length) {
                var targetIdx = parseInt(current.attr('index'));
                var currentIdx = parseInt($('.cs-passage[index!="?"]:last').attr('index'));
                for (var idx = currentIdx; idx > targetIdx; idx--) {
                    $('.cs-passage[index="' + idx + '"]').remove();
                }
            }
        });
        // index
        var $menuindex = $(".cs-passage-index", $selector);
        $menuindex.addClass('menu').addClass('is-visible').addClass('iconfont').addClass('icon-wenhao');
        $menuindex.empty();
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
        // $input.focus(function() {
        // });
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
            $('.cs-passage-index.is-visible', $selector).removeClass('is-visible').addClass('is-hidden');
            $('.cs-passage-index.menu', $selector).removeClass('is-hidden').addClass('is-visible');
            $text.fadeOut(300, function() {
                $($menu, $selector).fadeIn(300);
            });
        });
        $('.ok', $textcontrol).click(function() {
            // TODO
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
                class: ['cs-passage-select-list'],
                children: [{
                    name: 'div',
                    class: ['cs-passage-select-list-content']
                }, {
                    name: 'div',
                    class: ['cs-passage-select-loading', 'animated', 'swing', 'infinite'],
                    html: '死命加载中...'
                }, {
                    name: 'div',
                    class: ['cs-passage-select-msg', 'is-hidden'],
                    html: ''
                }]
            }, {
                name: 'div',
                class: ['cs-passage-select-ctl'],
                children: [{
                    name: 'div',
                    class: ['ok'],
                    html: '确定'
                }, {
                //     name: 'div',
                //     class: ['change'],
                //     html: '换一批'
                // }, {
                    name: 'div',
                    class: ['return'],
                    html: '返回'
                }]
            }]
        }));
        var $selectcontrol = $('.cs-passage-select-ctl', $select);
        $('.return', $selectcontrol).click(function() {
            $('.cs-passage-index.is-visible', $selector).removeClass('is-visible').addClass('is-hidden');
            $('.cs-passage-index.menu', $selector).removeClass('is-hidden').addClass('is-visible');
            $select.fadeOut(300, function() {
                $($menu, $selector).fadeIn(300);
            });
        });
        $('.ok', $selectcontrol).click(function() {
            var $active = $('.cs-passage-select-list-item.is-active', $selectlist);
            if ($active.length) {
                $('.return', $selectcontrol).click();
                $selector.data('updatePassage')($active.attr('id'), $active.text());
            };
        });
        $selector.append($select);
        var $selectlist = $('.cs-passage-select-list-content', $select);
        var $loading = $('.cs-passage-select-loading', $select);
        var $msg = $('.cs-passage-select-msg', $select);
        var updatePassageList = function(data) {
            if (!data) return;
            for (var idx = 0; idx < data.length; idx++) {
                var $item = $(helper.domMaker({
                    name: 'div',
                    class: ['cs-passage-select-list-item'],
                    attr: { id: data[idx]['id'] },
                    html: data[idx]['content']
                }));
                $item.click(function() {
                    var $this = $(this);
                    $('.cs-passage-select-list-item.is-active', $selectlist).removeClass('is-active');
                    $this.addClass('is-active');
                });
                $selectlist.append($item);
            }
            if (data.length > 0) {
                $selector.data('selectEmpty', true);
            } else {
                $msg.html('没有后续啦，自己扯一个吧！');
                $msg.removeClass('is-hidden');
            }
            $loading.addClass('is-hidden');
        };
        // other
        $selector.data('empty', function() {
            $selectlist.empty();
            $input.empty();
            $selector.data('selectEmpty', false);
            $selector.data('currentId', $('.cs-passage[index!="?"]:last').attr('id'));
            $selector.data('currentIndex', parseInt($('.cs-passage[index!="?"]:last').attr('index')));
            $msg.addClass('is-hidden');
        });
        $('.cs-passage-option.select', $menu).click(function(){
            $('.cs-passage-index.is-visible', $selector).removeClass('is-visible').addClass('is-hidden');
            $('.cs-passage-index.select', $selector).removeClass('is-hidden').addClass('is-visible');
            $menu.fadeOut(300, function() {
                if (!$selector.data('selectEmpty')) {
                    $loading.removeClass('is-hidden');
                }
                $msg.addClass('is-hidden');
                $select.fadeIn(300, function() {
                    if (!$selector.data('selectEmpty')) {
                        getNextPassages($selector.data('currentId'), updatePassageList, 0);
                    }
                });
            });
            $selector.removeClass('menu text');
            $selector.addClass('select');
        });
        $('.cs-passage-option.text', $menu).click(function(){
            $('.cs-passage-index.is-visible', $selector).removeClass('is-visible').addClass('is-hidden');
            $('.cs-passage-index.text', $selector).removeClass('is-hidden').addClass('is-visible');
            $menu.fadeOut(300, function() {
                $text.fadeIn(300);
            });
            $selector.removeClass('menu select');
            $selector.addClass('text');
        });
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