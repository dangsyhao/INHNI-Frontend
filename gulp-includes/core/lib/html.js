const config = require('../../gulp-configuration'),
    glob = require('glob'),
    rls = require('remove-leading-slash'),
    upath = require('upath'),
    Twig = require('twig'),
    fs = require('fs-extra'),
    os = require('os'),
    log = require('./log'),
    _ = require('lodash'),
    notifier = require('node-notifier'),
    localeCode = require('locale-code'),
    validator = require('html-validator'),
    argv = require('minimist')(process.argv.slice(2)),
    pretty = require('pretty'),
    showdown = require('showdown'),
    javascript = require('./javascript'),
    css = require('./css'),
    minify = require('html-minifier').minify;

Twig.cache(false);

module.exports = {
    generate : function (source, destination, callback) {
        var success = true;
        var sourceFilename = upath.basename(source);
        var favicon_url = false;
        if (fs.pathExistsSync(rls(config.generateFavicon.output))) {
            favicon_url = upath.normalize(upath.relative(destination, rls(config.generateFavicon.output)));
            if (favicon_url.substr(favicon_url.length - 1) != '/') {
                favicon_url = favicon_url + '/';
            }
        }
        var img_url = upath.normalize(upath.relative(destination, rls(config.generateImages.folder)));
        if (img_url.substr(img_url.length - 1) != '/') {
            img_url = img_url + '/';
        }
        var img_gulp_demo = upath.normalize(upath.relative(destination, rls('gulp-includes/core/images')));
        if (img_gulp_demo.substr(img_gulp_demo.length - 1) != '/') {
            img_gulp_demo = img_gulp_demo + '/';
        }
        var js_files = false;
        if (config.generateJs.enable) {
            var jsFiles = glob.sync(rls(upath.join(rls(config.generateJs.src_path), '*.js')));
            if (jsFiles.length) {
                js_files = [];
                jsFiles.forEach(function (file) {
                    var filename = upath.basename(file, '.js');
                    delete require.cache[require.resolve('../../js/' + filename + '.js')];
                    js_files.push({
                        filename : filename,
                        url : upath.normalize(upath.relative(destination, rls(upath.join(rls(JSON.parse(JSON.stringify(require('../../js/' + filename + '.js'))).output_path), filename + '.js'))))
                    });
                });
                js_files = _.sortBy(js_files, 'filename');
            }
        }
        var css_files = false;
        if (config.generateJs.enable) {
            var cssFiles = glob.sync(rls(upath.join(rls(config.generateCss.src_path), '*.scss')));
            if (cssFiles.length) {
                css_files = [];
                cssFiles.forEach(function (file) {
                    var filename = upath.basename(file, '.scss');
                    css_files.push({
                        filename : filename,
                        url : upath.normalize(upath.relative(destination, rls(upath.join(rls(config.generateCss.output_path), filename + '.css'))))
                    });
                });
                css_files = _.sortBy(css_files, 'filename');
            }
        }
        var html_files = false;
        var templatesfiles = glob.sync(rls(upath.join(rls(config.generateHtml.src), 'templates', '**', '*.twig')));
        if (templatesfiles.length) {
            html_files = [];
            templatesfiles.forEach(function (html_file) {
                var filename = upath.basename(html_file, '.twig');
                html_files.push({
                    filename : filename,
                    url : upath.normalize(upath.relative(destination, rls(upath.join(destination, filename + '.html'))))
                });
            });
            html_files = _.sortBy(html_files, 'filename');
        }
        var project_git_url = config.project_git_url.trim();
        if (project_git_url.length == 0) {
            project_git_url = false;
        }
        var project_preview_links = config.project_preview_links;
        if (project_preview_links.length == 0) {
            project_preview_links = false;
        }
        var project_other_links = config.project_other_links;
        if (project_other_links.length == 0) {
            project_other_links = false;
        }
        var js_code_demo = false;
        var css_code_demo = false;
        var css_print_code_demo = false;
        if (sourceFilename == 'index.twig') {
            var js_code_demo_path = './gulp-includes/core/js/gulp-index.js';
            var js_code_demo_filename = upath.basename(js_code_demo_path);
            delete require.cache[require.resolve('../js/' + js_code_demo_filename)];
            var fileConfig = require('../js/' + js_code_demo_filename);
            fileConfig = JSON.parse(JSON.stringify(fileConfig));
            var result = javascript.generate(rls(js_code_demo_path), fileConfig, false);
            if (result.code && result.success) {
                js_code_demo = result.code;
            }
            var css_code_demo_path = './gulp-includes/core/scss/gulp-index.scss';
            var result = css.generate(rls(css_code_demo_path), false, false);
            if (result.code && result.success) {
                css_code_demo = result.code;
            }
            var css_print_code_demo_path = './gulp-includes/core/scss/gulp-print.scss';
            var result = css.generate(rls(css_print_code_demo_path), false, false);
            if (result.code && result.success) {
                css_print_code_demo = result.code;
            }
        }
        var fileExtension = upath.extname(source);
        new Promise(function (resolve) {
            if (fileExtension == '.md') {
                if (fs.pathExistsSync(source)) {
                    var fileContent = fs.readFileSync(source, 'utf8');
                    var converter = new showdown.Converter({
                        emoji : true,
                        completeHTMLDocument : true,
                        tables : true,
                        backslashEscapesHTMLTags : true,
                        simpleLineBreaks : false,
                        tablesHeaderId : true,
                        parseImgDimensions : true
                    });
                    var styles = '<style>.markdown-body { box-sizing: border-box; min-width: 200px; max-width: 980px; margin: 0 auto; padding: 45px; } @media (max-width: 768px) { .markdown-body { padding: 15px; } } ';
                    if (fs.pathExistsSync('node_modules/github-markdown-css/github-markdown.css')) {
                        var cssContent = fs.readFileSync('node_modules/github-markdown-css/github-markdown.css', 'utf8');
                        styles += cssContent;
                    }
                    styles += ' </style>';
                    var fileHtml = converter.makeHtml(fileContent).replace(new RegExp('src="../images/', 'g'), 'src="' + img_gulp_demo).replace(new RegExp('.md"', 'g'), '.html"').replace(new RegExp('<body>', 'g'), '<body class="markdown-body">' + styles);
                    try {
                        fs.outputFileSync(upath.join(rls(destination), upath.basename(source).replace('.md', '.html')), fileHtml);
                    } catch (err) {
                        success = false;
                        notifier.notify({
                            title : 'Possible permission Error',
                            message : 'Cannot update or create file. Please check permissions.',
                            icon : './gulp-includes/core/images/fidesio-logo.png'
                        });
                        console.log(os.EOL);
                        log.error(err);
                        console.log(os.EOL);
                    } finally {
                        resolve({
                            success : success,
                            html : fileHtml
                        });
                    }
                } else {
                    success = false;
                    notifier.notify({
                        title : 'HTML compilation Error',
                        message : 'A file is missing.',
                        icon : './gulp-includes/core/images/fidesio-logo.png'
                    });
                    console.log(os.EOL);
                    log.error('ERROR! File ' + source + ' does not exist.');
                    console.log(os.EOL);
                }
                resolve({
                    success : success
                });
            } else {
                Twig.renderFile(source, {
                    settings : { 'twig options' : { async : false } },
                    favicon_url : favicon_url,
                    css_files : css_files,
                    js_files : js_files,
                    css_url : upath.normalize(upath.relative(rls(destination), rls(config.generateCss.output_path))),
                    html_files : html_files,
                    project_name : config.project_name.trim(),
                    project_short_name : config.project_short_name.trim(),
                    img_url : img_url,
                    img_gulp_demo : img_gulp_demo,
                    js_code_demo : js_code_demo,
                    css_code_demo : css_code_demo,
                    css_print_code_demo : css_print_code_demo,
                    lang_code : localeCode.getLanguageCode(config.project_lang),
                    lang_code_extended : config.project_lang.replace('-', '_'),
                    favicon_color : config.generateFavicon.main_color,
                    project_git_url : project_git_url,
                    project_preview_links : project_preview_links,
                    project_other_links : project_other_links
                }, function (err, html) {
                    if (err) {
                        success = false;
                        notifier.notify({
                            title : 'HTML compilation Error',
                            message : 'Please check the syntax in your TWIG files.',
                            icon : './gulp-includes/core/images/fidesio-logo.png'
                        });
                        console.log(os.EOL);
                        log.error(err);
                        console.log(os.EOL);
                        resolve({
                            success : success
                        });
                    }
                    module.exports.beautifyOrMinify(html, function (result) {
                        try {
                            fs.outputFileSync(upath.join(rls(destination), upath.basename(source).replace('.twig', '.html')), result);
                        } catch (err) {
                            success = false;
                            notifier.notify({
                                title : 'Possible permission Error',
                                message : 'Cannot update or create file. Please check permissions.',
                                icon : './gulp-includes/core/images/fidesio-logo.png'
                            });
                            console.log(os.EOL);
                            log.error(err);
                            console.log(os.EOL);
                        } finally {
                            resolve({
                                success : success,
                                html : result
                            });
                        }
                    });
                });
            }
        }).then(function (result) {
            if (callback) {
                callback(result);
            }
        });
    },
    check : function (filepath, html, echo, callback) {
        var success = true;
        new Promise(function (resolve) {
            validator({
                format : 'text',
                data : html
            }, function (error, data) {
                if (error) {
                    success = false;
                    notifier.notify({
                        title : 'W3C Html checker failed',
                        message : 'An error occured during html validation.',
                        icon : './gulp-includes/core/images/fidesio-logo.png'
                    });
                    console.log(os.EOL);
                    log.error(error);
                    console.log(os.EOL);
                } else {
                    var splittedDatas = data.split('\n');
                    if (splittedDatas.length != 2) {
                        success = false;
                        for (var i = 0; i < splittedDatas.length; i++) {
                            if (splittedDatas[i] == '' || splittedDatas[i] == 'The document validates according to the specified schema(s).' || splittedDatas[i] == 'There were errors.') {
                                splittedDatas.splice(i, 1);
                                i--;
                            }
                        }
                        notifier.notify({
                            title : 'W3C Html validation Error',
                            message : 'There\'re syntax error(s) in your html code.',
                            icon : './gulp-includes/core/images/fidesio-logo.png'
                        });
                        console.log(os.EOL);
                        log.info('  W3C Markup Validation Service: ' + filepath);
                        var message = '';
                        splittedDatas.forEach(function (data, index) {
                            if (index % 2 == 0) {
                                message = data;
                            } else {
                                message = '      ' + message.trim() + ' ' + data;
                                if (splittedDatas[index - 1].search('Error:') > -1) {
                                    log.error(message);
                                } else {
                                    log.warn(message);
                                }
                            }
                        });
                        console.log(os.EOL);
                    }
                }
                resolve(success);
            });
        }).then(function (success) {
            if (callback) {
                callback(success);
            }
        });
    },
    beautifyOrMinify : function (html, callback) {
        var result = false;
        new Promise(function (resolve) {
            if (argv.dev) {
                result = pretty(html, { ocd : true });
            } else {
                result = minify(html, {
                    caseSensitive : true,
                    collapseBooleanAttributes : true,
                    collapseInlineTagWhitespace : true,
                    collapseWhitespace : true,
                    decodeEntities : true,
                    keepClosingSlash : true,
                    minifyCSS : true,
                    minifyJS : true,
                    processConditionalComments : true,
                    quoteCharacter : '"',
                    removeComments : true,
                    sortAttributes : true,
                    sortClassName : true
                });
            }
            resolve(result);
        }).then(function (result) {
            if (callback) {
                callback(result);
            }
        });
    }
};