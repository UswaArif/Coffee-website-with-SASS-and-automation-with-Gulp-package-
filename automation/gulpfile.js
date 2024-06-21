const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');

// Define source and destination directories
const srcDir = 'src';
const distDir = 'dist';

// Compilation task
gulp.task('compile-sass', function () {
    return gulp.src(`${srcDir}/sass/styles.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${distDir}/css`));
});

// Autoprefixing task
gulp.task('autoprefix', function () {
    return gulp.src(`${distDir}/css/styles.css`)
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest(`${distDir}/css`));
});

// Compression task
gulp.task('compress', function () {
    return gulp.src(`${distDir}/css/styles.css`)
        .pipe(cleanCSS())
        .pipe(gulp.dest(`${distDir}/css`));
});

// Images task
gulp.task('images', () => {
    return gulp.src(`${srcDir}/images/**/*`)
        .pipe(gulp.dest(`${distDir}/images`));
});

// Watch task
gulp.task('watch', function () {
    gulp.watch(`${srcDir}/sass/styles.scss`, gulp.series('compile-sass', 'autoprefix', 'compress'));
    gulp.watch(`${srcDir}/images/**/*`, gulp.series('images'));
});

// Default task
gulp.task('default', gulp.series('compile-sass', 'autoprefix', 'compress', 'images', 'watch'));
