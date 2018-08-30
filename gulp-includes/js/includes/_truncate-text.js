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
        truncateText();
    });

    $(window).on('resizeend', function () {
        truncateText();
    });

    function truncateText() {

        $('.job .title-4, .job p, .zoom p').truncate({
            lines : 2
        });

        var selector = $('.article.big p');
        if (gulp_display.getWidth() <= 1200) {
            if (selector.hasClass('truncated')) {
                selector.removeClass('truncated').truncate('expand');
            }
        } else {
            selector.addClass('truncated').truncate({
                lines : 4
            });
        }

    }

})(jQuery);