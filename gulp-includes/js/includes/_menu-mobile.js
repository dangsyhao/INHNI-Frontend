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
        var container = $('#header .wrapper');
        if (container.length) {
            container.prepend('<div class="menu-toggle"><span></span><span></span><span></span><span></span></div>');
            container.find('.menu-toggle').click(function (e) {
                e.preventDefault();
                if ($('body').hasClass('menu-open')) {
                    $('body').removeClass('menu-open');
                } else {
                    $('body').addClass('menu-open');
                }
            });
        }
    });

    $(window).on('resizeend', function () {
        if ($('body').hasClass('menu-open') && gulp_display.getWidth() > 1200) {
            $('body').removeClass('menu-open');
        }
    });

})(jQuery);