const config = {

    /* Compiled Bundle destination */
    output_path : '/public/assets/js/main.js',

    /* Include jQuery in the bundle; true/false */
    jQuery : false,

    /* Path to external libs (e.g. sliders, modals ...). */
    /* Most likely node_modules or includes stuffs */
    src : [
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/jquery-numerator/jquery-numerator.js',
        'node_modules/intersection-observer/intersection-observer.js',
        'node_modules/truncate.js/dist/truncate.min.js',
        'gulp-includes/js/helpers/_detect-ie.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'gulp-includes/js/includes/**/*.js'
    ],

    plugins : {

        /* Include Modernizr tests at the beginning of the bundle if feature-detects is filled. */
        /* Features : https://modernizr.com/download */
        modernizr : {
            /* https://modernizr.com/download?video-videoloop */
            'feature-detects' : [
                // "test/video",
                // "test/video/loop"
            ]
        },

        /* If this option is enabled, the following dependencies will be included in the bundle : */
        /* If will add a <link rel="stylesheet"> element after page load if gulp_print_css_url is defined. */
        /* - jQuery, unless you set the jQuery option above to false */
        /* - gulp-includes/core/plugins/load-print-css/load-print-css.js */
        load_print_css : true,

        /* Refer to documentation, Plugin: Built-in JavaScript viewport informations (gulp_display) */
        /* If this option is enabled, the following dependencies will be included in the bundle : */
        /* - jQuery, unless you set the jQuery option above to false */
        /* - jquery.resizeend: https://www.npmjs.com/package/jquery.resizeend */
        /* - verge: https://www.npmjs.com/package/verge */
        /* - gulp-includes/core/js/display.js */
        gulp_display : true,

        /* Refer to documentation, Plugin: Responsive/Retina/Lazyload image */
        /* If this option is enabled, the following dependencies will be included in the bundle : */
        /* - jQuery, unless you set the jQuery option above to false */
        /* - Polyfill: https://www.npmjs.com/package/intersection-observer */
        /* - Modernizr tests (test/dom/mutationObserver, test/customevent, test/img/srcset) */
        /* - gulp-includes/core/plugins/responsive-image/responsive-image.js */
        responsiveImage : true,

        /* Refer to documentation, Plugin: Detect New Html Elements */
        /* If this option is enabled, the following dependencies will be included in the bundle : */
        /* - jQuery, unless you set the jQuery option above to false */
        /* - Modernizr test (test/dom/mutationObserver) */
        /* - gulp-includes/core/plugins/detect-new-html-elements/detect-new-html-elements.js */
        detectNewHtmlElements : false,

        /* Refer to documentation, Plugin: Lazyload Iframe */
        /* If this option is enabled, the following dependencies will be included in the bundle : */
        /* - jQuery, unless you set the jQuery option above to false */
        /* - Polyfill: https://www.npmjs.com/package/intersection-observer */
        /* - Modernizr tests (test/dom/mutationObserver, test/customevent) */
        /* - gulp-includes/core/plugins/lazyload-iframe/lazyload-iframe.js */
        lazyloadIframe : false,

        /* If --dev option is detected, gulp-includes/core/js/dev.js will be included in the bundle. */
        /* It will provides additional logging for useful informations in console. */
        dev : true

    }

};

module.exports = config;