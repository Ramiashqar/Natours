const gulp = require('gulp'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    postcss = require('gulp-postcss'),
    prefix = require('autoprefixer'),
    imagemin = require('gulp-imagemin'),
    borwserSync = require('browser-sync').create();

gulp.task('previewDist', function () {
    // .init starts the server
    borwserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        },
        open: false,
        browser: "google chrome"

    });
});

gulp.task('deleteDistFolder', function () {
    return del('./docs');
});
gulp.task('prefix', function () {
    return gulp.src('./app/assets/styles/**/*.css')
        .pipe(postcss([prefix()]))
        .pipe(gulp.dest('./app/assets/styles/'))
});
gulp.task('optemizeImages', ['deleteDistFolder'], function () {
    const imgsSrc = [
        './app/assets/images',
        './app/assets/images/**/*',
        '!./app/assets/images/*.mp4',
        '!./app/assets/images/*.webm'
    ];
    return gulp.src(imgsSrc)
        .pipe(imagemin({
            progressive: true,
            intervlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./docs/assets/images/'))
});
gulp.task('usemin', ['deleteDistFolder', 'prefix', 'script'], function () {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [
                function () {
                    return rev();
                },
                function () {
                    return cssnano();
                }

            ],
            js: [
                function () {
                    return rev();
                },
                function () {
                    return uglify();
                }
            ]
        }))
        .pipe(gulp.dest('./docs'));
});
gulp.task('copyGeneralFolders', ['deleteDistFolder'], function () {
    const foldersSrc = [
        './app/assets/styles',
        './app/assets/styles/**/*',
        '!./app/assets/styles/*.css'
    ];
    return gulp.src(foldersSrc)
        .pipe(gulp.dest('./dist/assets/styles'));
});


gulp.task('build', ['deleteDistFolder', 'prefix', 'optemizeImages', 'usemin', 'copyGeneralFolders']);