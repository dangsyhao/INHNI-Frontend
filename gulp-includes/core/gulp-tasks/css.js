/*
 * @file
 *
 * - gulp css [--dev]
 *
 * Builds CSS stylesheets.
 *
 */

const css = require('../lib/css'),
    config = require('../../gulp-configuration'),
    glob = require('glob'),
    rls = require('remove-leading-slash'),
    upath = require('upath'),
    fs = require('fs-extra'),
    browserSync = require('browser-sync').get('BrowserSync Frontend Boilerplate : ' + config.project_name),
    argv = require('minimist')(process.argv.slice(2));

module.exports = function (done) {
    var cssFiles = glob.sync(rls(upath.join(rls(config.generateCss.src_path), '*.scss')));
    cssFiles.forEach(function (file, index) {
        var filename = upath.basename(file);
        if (!argv.dev) {
            fs.removeSync(rls(upath.join(rls(config.generateCss.output_path), filename.replace('.scss', '') + '.css.map')));
        }
        var result = css.generate(file, rls(config.generateCss.output_path), true);
        if (argv.reload && config.generateHtml.enable && result.success && argv._[0] === 'watch') {
            browserSync.stream();
        }
        if (index === cssFiles.length - 1) {
            done();
        }
    });
};