define({
    fxNull: function() {},
    _dom: '<%em id="%id" class="%cls" %attr>%html</%em>',
    domMaker: function(elem, obj) {
        if (typeof elem == 'object') {
            obj = elem;
            elem = obj['name'];
        } else if (!obj) {
            return '<' + elem + '></' + elem + '>';
        }
        var ret = this._dom;
        if (obj['id']) {
            ret = ret.replace('%id', obj['id']);
        } else {
            ret = ret.replace('id="%id"', '');
        }
        if (obj['class']) {
            ret = ret.replace('%cls', obj['class'].join(' '));
        } else {
            ret = ret.replace('class="%cls"', '');
        }
        if (obj['attr']) {
            var attr = '';
            for (var key in obj['attr']) {
                if (obj['attr'].hasOwnProperty(key)) {
                    attr += key + '="' + obj['attr'][key] + '" ';
                }
            }
            ret = ret.replace('%attr', attr);
        } else {
            ret = ret.replace('%attr', '');
        }
        if (obj['html']) {
            ret = ret.replace('%html', obj['html']);
        } else {
            ret = ret.replace('%html', '');
        }
        if (obj['children']) {
            var children = '';
            for (var idx = 0; idx < obj['children'].length; idx++) {
                children += this.domMaker(obj['children'][idx]);
            }
            ret = ret.replace('</%em>', children + '</%em>');
        }
        ret = ret.replace(/%em/g, elem);
        return ret;
    }
});