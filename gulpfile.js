/// <binding />
var gulp = require('gulp');
var Server = require('karma').Server;

var webpack = require('webpack');
var config = require(__dirname + '/webpack.config.js');
var gutil = require('gutil');
var chalk = require('chalk');
//var WebpackDevServer = require("webpack-dev-server");

gulp.task('Webpack-Build', function (done) {
    webpack(config).run(onBuild(done));
});

//gulp.task("webpack-dev-server", function(callback) {
//    // Start a webpack-dev-server
//    var compiler = webpack(config);

//    new WebpackDevServer(compiler, {
//        // server and middleware options
//    }).listen(80, "localhost", function(err) {
//        if(err) throw new gutil.PluginError("webpack-dev-server", err);
//        // Server listening
//        gutil.log("[webpack-dev-server]", "http://mbadev/mbas-and-management-education/Articles/Article%20Layout");

//        // keep the server alive or continue?
//        // callback();
//    });
//});

function onBuild(done) {
    return function (err, stats) {
        if (err) {
            gutil.log('Error', err);
            if (done) {
                done();
            }
        } else {
            Object.keys(stats.compilation.assets).forEach(function (key) {
                gutil.log('Webpack: output ', chalk.green(key));
            });
            gutil.log('Webpack: ', chalk.blue('finished '));
            if (done) {
                done();
            }
        }
    }
}
// Run test once and exit
gulp.task('Build-Test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});