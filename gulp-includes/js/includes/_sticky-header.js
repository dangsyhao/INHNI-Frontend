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
        updateStickyHeader();
    });
    $(window).on('load resizeend scroll', function () {
        updateStickyHeader();
    });

    function updateStickyHeader() {
        if (gulp_display.getScrollY() > 0) {
            $('body').addClass('sticky-header');
        } else {
            $('body').removeClass('sticky-header');
        }
    }

})(jQuery);