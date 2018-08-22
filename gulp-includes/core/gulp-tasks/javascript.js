/*
 * @file
 *
 * - gulp javascript [--dev]
 *
 * Builds JavaScript code.
 *
 */

const javascript = require('../lib/javascript'),
    glob = require('glob'),
    rls = require('remove-leading-slash'),
    upath = require('upath'),
    fs = require('fs-extra'),
    argv = require('minimist')(process.argv.slice(2)),
    config = require('../../gulp-configuration'),
    browserSync = require('browser-sync').get('BrowserSync Frontend Boilerplate : ' + config.project_name);

module.exports = function (done) {
    var jsFiles = glob.sync(rls(upath.join(rls(config.generateJs.src_path), '*.js')));
    jsFiles.forEach(function (file, index) {
        var filename = upath.basename(file);
        delete require.cache[require.resolve('../../js/' + filename)];
        var fileConfig = require('../../js/' + filename);
        fileConfig = JSON.parse(JSON.stringify(fileConfig));
        if (!argv.dev) {
            fs.removeSync(rls(upath.join(rls(fileConfig.output_path), filename.replace('.js', '') + '.js.map')));
        }
        var result = javascript.generate(rls(upath.join(rls(config.generateJs.src_path), filename)), fileConfig, true);
        if (argv.reload && config.generateHtml.enable && result.success && argv._[0] === 'watch') {
            browserSync.stream();
        }
        if (index === jsFiles.length - 1) {
            done();
        }
    });
};