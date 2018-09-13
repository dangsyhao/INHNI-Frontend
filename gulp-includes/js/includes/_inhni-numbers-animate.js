/*
 * @file
 *
 * Available variables
 * - gulp_display
 *
 */

(function ($) {
    'use strict';

    function detectNewHtmlElements(options) {
        if (Modernizr.mutationobserver) {
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.addedNodes) {
                        $.each(options, function (key, item) {
                            if ($(mutation.addedNodes[0]).is(item.selector)) {
                                item.callback($(mutation.addedNodes[0]));
                            } else if ($(mutation.addedNodes[0]).find(item.selector).length) {
                                $(mutation.addedNodes[0]).find(item.selector).each(function () {
                                    item.callback($(this));
                                });
                            }
                        });
                    }
                });
            });
            var config = {
                attributes : false,
                childList : true,
                subtree : true,
                characterData : false
            };
            observer.observe($('body')[0], config);
        } else {
            $(document).on('DOMNodeInserted', function (e) {
                var target = $(e.target);
                $.each(options, function (key, item) {
                    if (target.is(item.selector)) {
                        item.callback(target);
                    } else if (target.find(item.selector).length) {
                        target.find(item.selector).each(function () {
                            item.callback($(this));
                        });
                    }
                });
            });
        }
    }

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    $(document).ready(function () {
        var container = $('.inhni-numbers-bloc .numbers');
        if (container.length) {
            var lazyObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        lazyObserver.unobserve(entry.target);
                        initNumbersAndCanvas();
                    }
                });
            }, {
                rootMargin : '0px 0px 0px 0px' //https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/#mind_the_fold
            });
            lazyObserver.observe(container.get(0));
        }
        detectNewHtmlElements([
            {
                selector : '.inhni-numbers-bloc .numbers',
                callback : function (el) {
                    lazyObserver.observe(el.get(0));
                }
            }
        ]);
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