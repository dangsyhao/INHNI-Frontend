const mainConfig = require('../../gulp-configuration');

const config = {
    output_path : mainConfig.generateHtml.output,
    jQuery : true,
    src : [
        'gulp-includes/core/js/includes/**/*.js'
    ],
    plugins : {
        modernizr : {
            'feature-detects' : []
        },
        gulp_display : true,
        load_print_css: false,
        responsiveImage : false,
        detectNewHtmlElements: false,
        lazyloadIframe: false,
        dev : false
    }

};

module.exports = config;