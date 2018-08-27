/*
 * @file
 *
 * Available variables
 * - gulp_display
 *
 */

(function ($) {
    'use strict';

    $(document).ready(function () {
        var IE_version = detectIE();
        if (IE_version == 10) {
            $('html').addClass('ie10');
        } else if (IE_version == 11) {
            $('html').addClass('ie11');
        }
    });

})(jQuery);