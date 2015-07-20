var gulp = require('gulp'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    less = require('gulp-less'),
    minify-css = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber');

gulp.task('connect', [], function() {
  connect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('src/**/*.html')
    .pipe(connect.reload());
});

gulp.task('less', function () {
  gulp.src('src/less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('src/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch(['src/less/*.less'], ['less']);
});

gulp.task('default', ['connect', 'watch']);