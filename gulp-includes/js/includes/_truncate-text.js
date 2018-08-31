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
        setInterval(function () {
            truncateText();
        }, 5000);
        detectNewHtmlElements([
            {
                selector : '.job .title-4, .job p, .zoom p, .article.big p',
                callback : function () {
                    truncateText();
                }
            }
        ]);
    });

    $(window).on('load resizeend', function () {
        truncateText();
    });

    function truncateText() {

        /* ----------------- .job / .zoom blocs ----------------- */
        var selector = $('.job .title-4, .job p, .zoom p');
        selector.truncate({
            lines : 2
        });
        selector.truncate('collapse');
        /* ------------------------------------------------------------------------------ */

        /* ----------------- .article.big ----------------- */
        selector = $('.article.big p');
        if (gulp_display.getWidth() <= 1200) {
            if (selector.hasClass('truncated')) {
                selector.removeClass('truncated').truncate('expand');
            }
        } else {
            selector.addClass('truncated').truncate({
                lines : 4
            });
            selector.truncate('collapse');
        }
        /* ------------------------------------------------------------------------------ */

    }

})(jQuery);