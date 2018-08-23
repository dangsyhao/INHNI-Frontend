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
            searchForm_header.submit(function (e) {
                var validation = false;
                if (searchForm_header.find('input[type=text]').val().trim().length == 0) {
                    validation = 'Merci de compléter les champs requis';
                }
                if (validation) {
                    e.preventDefault();
                    alert(validation);
                    return false;
                } else {
                    return true;
                }
            });
            searchForm_header.find('.toggle').click(function (e) {
                if (gulp_display.getWidth() <= 1500) {
                    e.preventDefault();
                    if ($('body').hasClass('search-open')) {
                        console.log('a');
                        $('body').removeClass('search-open');
                    } else {
                        $('body').addClass('search-open');
                        setTimeout(function () {
                            searchForm_header.find('input[type=text]').focus();
                        }, 300);
                    }
                } else {
                    $(this).parents('form').first().submit();
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