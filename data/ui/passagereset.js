define(function() {
    'use strict';
    return function($moveTarget, $dragcontent, offset) {
        $dragcontent.animate({
            scrollTop: $moveTarget.data('stack')[$moveTarget.data('current')] + $moveTarget.data('currentDom').outerHeight() / 2
        }, 300);
        // $dragcontent.scrollTop();
    }
});