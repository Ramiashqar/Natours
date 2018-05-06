const gulp = require('gulp'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('../../webpack.config.js');


gulp.task('scriptApp', (callback) => {
    gulp.src('./app/assets/scripts/App.js')
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest('./app/temp/'));
        callback();
});
gulp.task('script', ['scriptApp'], (callback) => {
    gulp.src(['./app/assets/scripts/Vendor.js'])
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest('./app/temp/vendor/'));
        callback();
});
