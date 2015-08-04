var gulp = require('gulp'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber');

/* provide a web server and liveload*/
gulp.task('connect', [], function() {
  connect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('src/**/*.html')
    // listening the changes to reload server
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('src/sass/*.scss')
    // prevent watch task from stopping when error happened
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    // listening the changes to reload server
    .pipe(connect.reload());
});

// custom build zeptojs
gulp.task('buildZepto', shell.task([
  'npm install',
  'set MODULES=zepto event ajax form data deferred callbacks touch',
  'npm run-script dist'
], {cwd: "src/lib/zeptojs"}));

gulp.task('watch', function () {
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch(['src/sass/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'connect', 'watch']);
