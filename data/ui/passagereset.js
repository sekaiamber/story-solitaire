define(function() {
    'use strict';
    return function($moveTarget, $dragcontent, offset) {
        // $dragcontent.velocity({
        //     scrollTop: $moveTarget.data('stack')[$moveTarget.data('current')] + $moveTarget.data('currentDom').outerHeight() / 2
        // }, 300);
        $moveTarget.data('currentDom').velocity('scroll', {
            container: $dragcontent,
            duration: 300,
            offset: -100-offset
        })
        // $dragcontent.scrollTop();
    }
});