const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('pre-test', function() {
    return gulp.src(['libs/**/*.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
    return gulp.src(['spec/**/*.js'])
        .pipe(mocha({reporter: 'spec'}))
        .pipe(istanbul.writeReports());
});

gulp.task('lint', () => {
    return gulp.src(['app.js', 'libs/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint', 'test']);
