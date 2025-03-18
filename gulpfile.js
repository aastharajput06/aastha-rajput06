const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Sass task
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Jekyll task
gulp.task('jekyll', function(done) {
  require('child_process').spawn('jekyll', ['build'], { stdio: 'inherit' });
  done();
});

// Copy Jekyll output to dist, exclude package-lock.json
gulp.task('copy-jekyll', function() {
  return gulp.src(['_site/**/*', '!_site/package-lock.json'])
    .pipe(gulp.dest('dist'));
});

// JS task (optional)
gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Images task (optional)
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

// Build task
gulp.task('build', gulp.series('jekyll', 'sass', 'copy-jekyll' /*, 'js', 'images' */));

// Serve task
gulp.task('serve', function(done) {
  browserSync.init({
    server: './dist'
  });
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
  done();
});