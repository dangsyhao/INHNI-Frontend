/*
 * @file
 *
 * - gulp html [--dev]
 *
 * Builds html templates and perform W3C validation.
 *
 */

const html = require('../lib/html'),
    config = require('../../gulp-configuration'),
    glob = require('glob'),
    rls = require('remove-leading-slash'),
    upath = require('upath'),
    browserSync = require('browser-sync').get('BrowserSync Frontend Boilerplate : ' + config.project_name),
    argv = require('minimist')(process.argv.slice(2));

module.exports = function (done) {
    var htmlFiles = glob.sync(rls(upath.join(rls(config.generateHtml.src), 'templates', '**', '*.twig')));
    htmlFiles.push('gulp-includes/core/twig/index.twig');
    glob.sync(rls(upath.join('gulp-includes/core/doc', '*.md'))).forEach(function (file) {
        htmlFiles.push(file);
    });
    htmlFiles.forEach(function (file, index) {
        var fileExtension = upath.extname(file);
        var filename = upath.basename(file);
        var destination = rls(config.generateHtml.output);
        if (fileExtension == '.md') {
            destination = upath.join(rls(config.generateHtml.output), 'gulp-documentation');
        }
        html.generate(file, destination, function (result) {
            var success = result.success;
            if (argv.reload && success && argv._[0] === 'watch') {
                browserSync.stream();
            }
            if (success) {
                if (fileExtension == '.md') {
                    if (index === htmlFiles.length - 1) {
                        done();
                    }
                } else {
                    if (filename != 'index.twig') {
                        if (result.html.length) {
                            html.check(upath.join(rls(config.generateHtml.output), filename.replace('.twig', '.html')), result.html, true, function () {
                                if (index === htmlFiles.length - 1) {
                                    done();
                                }
                            });
                        } else {
                            if (index === htmlFiles.length - 1) {
                                done();
                            }
                        }
                    } else {
                        if (index === htmlFiles.length - 1) {
                            done();
                        }
                    }
                }
            } else if (index === htmlFiles.length - 1) {
                done();
            }
        });
    });
};