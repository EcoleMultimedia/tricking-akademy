var gulp    = require("gulp");
var concat  = require("gulp-concat");
var uglify  = require("gulp-uglify");
var rename  = require("gulp-rename");
var jshint  = require("gulp-jshint");
var stylish = require("jshint-stylish");
var imagemin = require("gulp-imagemin");
var pngquant = require('imagemin-pngquant');
//var sass    = require("gulp-sass");
var connect = require("gulp-connect");
var open    = require("gulp-open");

// Cette tâche va s'occuper des fichiers JS ...
gulp.task('process-scripts', function() {
  return gulp.src('./sources/scripts/*.js')
             .pipe(concat('app.js'))
             .pipe(gulp.dest('./dist/'))
             .pipe(rename('app.min.js'))
             .pipe(uglify())
             .pipe(connect.reload())
             .pipe(gulp.dest('./dist/'));
});

// Cette tâche s'occupe de vérifier les erreurs potentielles sur les fichiers JS
gulp.task('lint-scripts', function() {
  return gulp.src('./sources/scripts/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter(stylish));
});

// Cette tâche va s'occuper des fichiers SCSS ...
gulp.task('process-styles', function() {
  return gulp.src('./sources/styles/*.scss')
             .pipe(sass({ outputStyle: 'expanded' }))
             .pipe(rename('app.css'))
             .pipe(gulp.dest('./dist/'))
             //.pipe(sass({ outputStyle: 'compressed' }))
             .pipe(rename('app.min.css'))
             .pipe(connect.reload())
             .pipe(gulp.dest('./dist/'));
});

gulp.task('images-min', function() {
	return gulp.src('./images/*')
		  .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/images'));
})
// Cette tâche permet de surveiller les modifications effectuées sur des fichiers ciblés et relancer des tâches derrière
gulp.task('watch', function() {
  gulp.watch('./sources/scripts/*.js', ['process-scripts', 'lint-scripts'])
  gulp.watch('./sources/styles/*.scss', ['process-styles']);
});

// Cette tâche permet de lancer un navigateur sur une URL précise
gulp.task('open', function() {
  gulp.src(__filename)
      .pipe(open({ uri: 'http://localhost:8080' }));
});

// Cette tâche permet de créer un serveur local qui sert notre application
gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

// Cette tâche définit la tâche gulp par défaut, qui regroupe les autres
gulp.task('default', ['connect', 'open', 'process-scripts', 'lint-scripts', 'process-styles', 'images-min', 'watch']);