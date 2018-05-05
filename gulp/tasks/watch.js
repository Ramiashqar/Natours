const gulp = require('gulp'),
    borwserSync = require('browser-sync').create(),
    watch = require('gulp-watch');
gulp.task('watch', function () {
    // .init starts the server
    borwserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        },
        open: false,
        browser: "google chrome"

    });
});
watch('./app/index.html', function () {
    gulp.start('html');
});
watch('./sass/**/*.scss', function(){
    gulp.start('sass');
});
watch('./app/assets/styles/**/*.css', function () {
    gulp.start('cssInject');
});
watch('./app/assets/scripts/**/*.js', function () {
    gulp.start('scriptRefresh')
});

gulp.task('html', function () {
    borwserSync.reload();
});
gulp.task('cssInject', function () {
    return gulp.src('./app/assets/styles/app.css')
        .pipe(borwserSync.stream());
});
gulp.task('scriptsRefresh', function () {
    borwserSync.reload();
});