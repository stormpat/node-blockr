
/**
 * Gulpfile for the node-blockr module.
 * Spring 2014
 * @author Patrik Storm, storm.patrik@gmail.com
 * @licence MIT.
 */
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');

var coffeeSrc = 'coffee/';
var coffeeTarget = 'lib/';

gulp.task('coffee', function() {
    gulp.src(coffeeSrc + '*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(coffeeTarget));
});

gulp.task('watch', function() {
    gulp.watch(coffeeSrc + '/**/*.coffee', ['coffee']);
});

gulp.task('default', ['coffee', 'watch']);