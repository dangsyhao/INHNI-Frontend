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
        var container = $('#header .container');
        if (container.length) {
            container.prepend('<div class="menu-toggle"><span></span><span></span><span></span><span></span></div>');
            var menu_mobile = $('#menu_mobile');
            if (menu_mobile.length) {
                menu_mobile.find('ul > li > ul').each(function () {
                    $(this).prepend('<li>' + $(this).prev('a')[0].outerHTML + '</li>').prepend('<li class="back"><a href="#"><span>Retour</span></a></li>');
                });

                menu_mobile.find('li.back a').click(function (e) {
                    e.preventDefault();
                    $(this).parents('li.open').first().removeClass('open');
                });

                menu_mobile.find('> ul:first-of-type > li > a').click(function (e) {
                    e.preventDefault();
                    $(this).parent('li').addClass('open');
                });
            }
            container.find('.menu-toggle').click(function (e) {
                e.preventDefault();
                if ($('body').hasClass('menu-open')) {
                    var menu_mobile = $('#menu_mobile');
                    if (menu_mobile.length) {
                        if (menu_mobile.find('li.open').length) {
                            menu_mobile.find('li.open').removeClass('open');
                        } else {
                            closeMenuMobile();
                        }
                    }
                } else {
                    $('body').addClass('menu-open');
                }
            });
            $(document).keyup(function (e) {
                if (e.which == 27 && $('body').hasClass('menu-open')) {
                    e.preventDefault();
                    var menu_mobile = $('#menu_mobile');
                    if (menu_mobile.length) {
                        if (menu_mobile.find('li.open').length) {
                            menu_mobile.find('li.open').removeClass('open');
                        } else {
                            closeMenuMobile();
                        }
                    }
                }
            });
        }
    });

    $(window).on('resizeend', function () {
        if ($('body').hasClass('menu-open') && gulp_display.getWidth() > 1200) {
            closeMenuMobile();
        }
    });

})(jQuery);

function closeMenuMobile() {
    var menu_mobile = $('#menu_mobile');
    if (menu_mobile.length) {
        menu_mobile.find('li.open').removeClass('open');
    }
    $('body').removeClass('menu-open');
}