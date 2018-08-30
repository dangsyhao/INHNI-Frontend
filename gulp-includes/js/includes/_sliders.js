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

        /* ----------------- Slider || Bloc job offers (tablet + mobile) ----------------- */

        var slider = $('.job-offers-bloc .jobs');
        var slide = $('.job-offers-bloc .jobs .job');
        if (slide.length > 1) {
            if (gulp_display.getWidth() <= 1200) {
                slider.not('.slick-initialized').slick(
                    {
                        dots : false,
                        slidesToShow : 3,
                        speed : 300,
                        slidesToScroll : 3,
                        arrows : true,
                        cssEase : 'ease-in-out',
                        autoplay : false,
                        variableWidth : true,
                        infinite : true,
                        swipeToSlide : true,
                        centerMode : true,
                        prevArrow : '<button class="slick-prev slick-arrow"></button>',
                        nextArrow : '<button class="slick-next slick-arrow"></button>',
                        responsive : [
                            {
                                breakpoint : 900,
                                settings : {
                                    slidesToShow : 2,
                                    slidesToScroll : 2
                                }
                            },
                            {
                                breakpoint : 615,
                                settings : {
                                    slidesToShow : 1,
                                    slidesToScroll : 1
                                }
                            }
                        ]
                    }
                );
            } else {
                slider.filter('.slick-initialized').slick('unslick');
            }
        }

    }

})(jQuery);