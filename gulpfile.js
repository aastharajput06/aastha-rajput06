const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Sass task
gulp.task('sass', function(done) {
  console.log('Running sass task...');
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
    .on('end', done);
});

// Jekyll task
gulp.task('jekyll', function(done) {
  console.log('Running jekyll task...');
  require('child_process').spawn('jekyll', ['build'], { stdio: 'inherit' })
    .on('close', done);
});

// Copy Jekyll output to dist
gulp.task('copy-jekyll', function(done) {
  console.log('Running copy-jekyll task...');
  return gulp.src(['_site/**/*', '!_site/package-lock.json'], { allowEmpty: true })
    .pipe(gulp.dest('dist'))
    .on('end', () => {
      console.log('copy-jekyll completed');
      done();
    });
});

// Build task
gulp.task('build', gulp.series('jekyll', 'sass', 'copy-jekyll'));

// Serve task
gulp.task('serve', function(done) {
  console.log('Running serve task...');
  browserSync.init({
    server: './dist',
    port: 3002
  });
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
  done();
});