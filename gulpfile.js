var gulp    = require("gulp");
var concat  = require("gulp-concat");
var uglify  = require("gulp-uglify");
var rename  = require("gulp-rename");
var jshint  = require("gulp-jshint");
var stylish = require("jshint-stylish");
var htmlreplace = require('gulp-html-replace');
var sass    = require("gulp-sass");
var connect = require("gulp-connect");
var open    = require("gulp-open");

// Cette t�che va s'occuper des fichiers JS ...
gulp.task('process-scripts', function() {
  return gulp.src('./sources/scripts/*.js')
             .pipe(concat('app.js'))
             .pipe(gulp.dest('./dist/source/js/'))
             .pipe(rename('app.min.js'))
             .pipe(uglify())
             .pipe(connect.reload())
             .pipe(gulp.dest('./dist/source/js/'));
});

gulp.task('bower', function() {
  return gulp.src('./lib/**')
             .pipe(connect.reload())
             .pipe(gulp.dest('./dist/lib/'));
});
gulp.task('process-html', function() {
  return gulp.src('./*.html')
             .pipe(connect.reload())
             .pipe(gulp.dest('./dist/'));
              gulp.src('index.html')
   
});

// Cette t�che s'occupe de v�rifier les erreurs potentielles sur les fichiers JS
gulp.task('lint-scripts', function() {
  return gulp.src('./sources/scripts/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter(stylish));
});

// Cette t�che va s'occuper des fichiers SCSS ...
gulp.task('process-styles', function() {
  return gulp.src('./sources/styles/*.scss')
             .pipe(sass({ outputStyle: 'expanded' }))
             .pipe(rename('app.css'))
             .pipe(gulp.dest('./dist/source/styles/'))
             .pipe(sass({ outputStyle: 'compressed' }))
             .pipe(rename('app.min.css'))
             .pipe(connect.reload())
             .pipe(gulp.dest('./dist/source/styles/'));
});

// Cette t�che permet de surveiller les modifications effectu�es sur des fichiers cibl�s et relancer des t�ches derri�re
gulp.task('watch', function() {
  gulp.watch('./sources/scripts/*.js', ['process-scripts', 'lint-scripts'])
  gulp.watch('./sources/styles/*.scss', ['process-styles']);
});

// Cette t�che permet de lancer un navigateur sur une URL pr�cise
gulp.task('open', function() {
  gulp.src(__filename)
      .pipe(open({ uri: 'http://localhost:8080' }));
});

// Cette t�che permet de cr�er un serveur local qui sert notre application
gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

// Cette t�che d�finit la t�che gulp par d�faut, qui regroupe les autres
gulp.task('default', ['connect', 'open', 'bower','process-html', 'process-scripts', 'lint-scripts', 'process-styles', 'watch']);