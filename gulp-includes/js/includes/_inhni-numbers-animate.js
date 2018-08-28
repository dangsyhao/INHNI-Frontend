/*
 * @file
 *
 * Available variables
 * - gulp_display
 *
 */

(function ($) {
    'use strict';

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    $(document).ready(function () {
        var container = $('.inhni-numbers-bloc');
        if (container.length) {
            var lazyObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var elem = $(entry.target);
                        lazyObserver.unobserve(entry.target);
                        initNumbersAndCanvas();
                    }
                });
            }, {
                rootMargin : '0px 0px 256px 0px' //https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/#mind_the_fold
            });
            lazyObserver.observe(container.get(0));
        }
    });

    function initNumbersAndCanvas() {
        var container = $('.inhni-numbers-bloc:not(.init)');
        container.addClass('init');
        var circle = container.find('.number.circle');
        circle.prepend('<canvas></canvas>');
        var canvas = circle.find('canvas').get(0);
        var ctx = canvas.getContext('2d');
        var width = circle.outerWidth(false);
        canvas.width = width;
        canvas.height = width;
        ctx.lineWidth = 11;
        ctx.strokeStyle = '#009DDD';
        animate(ctx, width, 11, Math.PI * 2, Math.PI / -2, parseInt(circle.find('.digit').attr('data-digit')), 0);
        container.find('.digit').each(function () {
            $(this).find('.value').numerator({
                easing : 'swing',
                duration : 1500,
                delimiter : '',
                toValue : $(this).attr('data-digit')
            });
        });

    }

    function animate(ctx, width, lineWidth, circum, start, finish, curr, draw_to) {
        ctx.clearRect(0, 0, width, width);
        ctx.beginPath();
        ctx.arc(width / 2, width / 2, (width - lineWidth * 2) / 2 + lineWidth / 2, Math.PI / -2, draw_to, false);
        ctx.stroke();
        curr++;
        if (curr < finish + 1) {
            requestAnimationFrame(function () {
                animate(ctx, width, lineWidth, circum, start, finish, curr, circum * curr / 100 + start);
            });
        }
    }

})(jQuery);