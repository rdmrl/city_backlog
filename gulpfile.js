const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
// const sourcemaps = require('sourcemaps');
const groupmq = require('gulp-group-css-media-queries');
const bs = require('browser-sync');

const SASS_SOURCES = [
  'sass/*.scss', // All other Sass files in the /css directory.
  'sass/**/*.scss', // All other Sass files in the /css directory.
];

/**
 * Compile Sass files.
 */
gulp.task('compile:sass', () =>
  gulp.src(SASS_SOURCES, { base: './sass' })
    .pipe(plumber())  // Prevent termination on error
    .pipe(sass({
      indentType: 'space',
      indentWidth: 2,
      outputStyle: 'expanded',
    })).on('error', sass.logError)
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      })
    ]))
    .pipe(groupmq())  // Group media queries!
    .pipe(gulp.dest('./css')) // Output compiled files in the same dir as the Sass sources
    .pipe(bs.stream())); // Stream to browserSync


/**
 * Watch Sass files for changes.
 */
gulp.task('watch:sass', ['compile:sass'], () => {
  gulp.watch(SASS_SOURCES, ['compile:sass']);
});

/**
 * Default task executed by running 'gulp'.
 */
gulp.task('default', ['watch:sass']);
