const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const { spawn } = require('child_process');

// 🧩 Compile SCSS → CSS
gulp.task('sass', function (done) {
  console.log('🔧 Running sass task...');
  return gulp
    .src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
    .on('end', done);
});

// 🧩 Build Jekyll
gulp.task('jekyll', function (done) {
  console.log('🏗️  Building Jekyll site...');
  const jekyll = spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit', shell: true });
  jekyll.on('close', done);
});

// 🧩 Copy built site to dist/
gulp.task('copy-jekyll', function (done) {
  console.log('📦 Copying Jekyll _site → dist ...');
  return gulp
    .src(['_site/**/*', '!_site/package-lock.json'], { allowEmpty: true })
    .pipe(gulp.dest('dist'))
    .on('end', () => {
      console.log('✅ copy-jekyll completed');
      done();
    });
});

// 🧩 Optimize Images (optional)
gulp.task('images', function () {
  return gulp.src('img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

// 🧩 JS Minification (optional)
gulp.task('scripts', function () {
  return gulp.src('js/**/*.js')
    // .pipe(uglify()) // disabled to support ES6
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});


// 🧩 Build everything once
gulp.task('build', gulp.series('jekyll', 'sass', 'copy-jekyll', 'images', 'scripts'));

// 🧩 Serve & watch for changes
gulp.task('serve', function (done) {
  console.log('🚀 Starting BrowserSync on http://localhost:3002');
  browserSync.init({
    server: './dist',
    port: 3002,
  });

  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
  gulp.watch(['*.html', '_includes/**/*.html', '_layouts/**/*.html', 'js/**/*.js'], gulp.series('build', (cb) => {
    browserSync.reload();
    cb();
  }));

  done();
});

// ✅ Default task (this fixes your error)
gulp.task('default', gulp.series('build', 'serve'));
