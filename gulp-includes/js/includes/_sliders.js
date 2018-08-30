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
        createSlick();
    });

    $(window).on('resizeend', function () {
        createSlick();
    });

    function createSlick() {

        /* ----------------- Slider || Bloc jobs offers (tablet + mobile) ----------------- */
        var slider = $('.jobs-offers-bloc .jobs');
        var slide = $('.jobs-offers-bloc .jobs .job');
        if (slide.length > 1) {
            if (gulp_display.getWidth() <= 1200) {
                slider.not('.slick-initialized').slick(
                    {
                        cssEase : 'ease-in-out',
                        variableWidth : true,
                        swipeToSlide : true,
                        centerMode : true,
                        prevArrow : '<button class="slick-prev slick-arrow"></button>',
                        nextArrow : '<button class="slick-next slick-arrow"></button>'
                    }
                );
            } else {
                slider.filter('.slick-initialized').slick('unslick');
            }
        }
        /* ------------------------------------------------------------------------------ */

        /* ----------------- Slider || Bloc jobs zoom (tablet + mobile) ----------------- */
        slider = $('.jobs-zoom-bloc .zooms');
        slide = $('.jobs-zoom-bloc .zooms .zoom');
        if (slide.length > 1) {
            if (gulp_display.getWidth() <= 1200) {
                slider.not('.slick-initialized').slick(
                    {
                        cssEase : 'ease-in-out',
                        variableWidth : true,
                        swipeToSlide : true,
                        centerMode : true,
                        prevArrow : '<button class="slick-prev slick-arrow"></button>',
                        nextArrow : '<button class="slick-next slick-arrow"></button>'
                    }
                );
            } else {
                slider.filter('.slick-initialized').slick('unslick');
            }
        }
        /* ------------------------------------------------------------------------------ */

    }

})(jQuery);