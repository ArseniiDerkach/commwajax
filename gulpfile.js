var gulp = require('gulp');
var sass = require('gulp-sass');

// copy index file to build
gulp.task('copy', function() {
  gulp.src('index.html')
  .pipe(gulp.dest('build'));
  gulp.src('./src/img/*.*')
  .pipe(gulp.dest('build/img/'));
  gulp.src('./src/css/*.*')
  .pipe(gulp.dest('build/css/'));
  gulp.src('./src/plugins/**')
  .pipe(gulp.dest('build/plugins/'));
  gulp.src('./src/fonts/**')
  .pipe(gulp.dest('build/fonts/'));
  gulp.src('./src/js/**')
  .pipe(gulp.dest('build/js/'));
});

// compile all sass files to css
gulp.task('sass', function() {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});
gulp.task('js', function() {
  gulp.src('./js/**')
  .pipe(gulp.dest('build/js/'));
})
