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
        var searchForm_header = $('.searchForm_header');
        if (searchForm_header.length) {
            searchForm_header.append('<span class="toggle"></span>');
            searchForm_header.find('.toggle').click(function (e) {
                if (gulp_display.getWidth() <= 1500) {
                    e.preventDefault();
                    if ($('body').hasClass('search-open')) {
                        $('body').removeClass('search-open');
                    } else {
                        closeMenuMobile();
                        $('body').addClass('search-open');
                        setTimeout(function () {
                            searchForm_header.find('input[type=text]').focus();
                        }, 300);
                    }
                } else {
                    $(this).parents('form').first().submit();
                }
            });
            $(document).keyup(function (e) {
                if (e.which == 27 && $('body').hasClass('search-open')) {
                    e.preventDefault();
                    $('body').removeClass('search-open');
                }
            });
        }
    });

    $(window).on('resizeend', function () {
        if ($('body').hasClass('search-open') && gulp_display.getWidth() > 1500) {
            $('body').removeClass('search-open');
        }
    });

    $(document).click(function (e) {
        if ($('body').hasClass('search-open')) {
            var target = $(e.target);
            if (!target.is('.searchForm_header') && !target.parents('.searchForm_header').length) {
                e.preventDefault();
                $('body').removeClass('search-open');
            }
        }
    });

})(jQuery);