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