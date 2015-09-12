var gulp = require('gulp');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var concat = require("gulp-concat");
var sourcemaps = require('gulp-sourcemaps');

gulp.task('server', function() {
  gulp.src("src/server.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('server.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch('src/server.js', ['server']);
});

gulp.task('default', ['watch', 'server']);