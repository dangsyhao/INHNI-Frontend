/*
    (function ($) {
        'use strict';
        $(document).ready(function () {
            if (detectIE()) {
                alert('This is IE (from v6 to v11) !');
            }
        });
    })(jQuery);
*/

function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        return true;
    } else {
        return false;
    }
}