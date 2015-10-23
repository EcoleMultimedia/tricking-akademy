var gulp 		= require('gulp');
var concat 		= require('gulp-concat');
var uglify 		= require('gulp-uglify');
var rename 		= require('gulp-rename');
var jshint 		= require('gulp-jshint');
var stylish 	= require('jshint-stylish');
var sass 		= require('gulp-sass');
var connect 	= require('gulp-connect');
var open 		= require('gulp-open');
var minifyHTML 	= require('gulp-minify-html');
var minifyCss 	= require('gulp-minify-css');

//Cette tâche va s'occuper des fichier Js...
gulp.task('process-script', function() {
	return  gulp.src("./sources/scripts/*.js")
				.pipe(concat('app.min.js'))
				.pipe(uglify())
				.pipe(connect.reload())
				.pipe(gulp.dest('./dist/'));
});

//Cette tâche va s'occuper des fichier Scss...
gulp.task('lint-script', function() {
	return  gulp.src("./sources/scripts/*.js")
				.pipe(jshint())
				.pipe(jshint.reporter(stylish))
				//.pipe(jshint.reporter(playSoundIfError))
});

// ici les scss
gulp.task('process-scss', function() {
	return  gulp.src("./sources/styles/*.scss")
				.pipe(sass({ outputStyle: "compressed" }))
				.pipe(rename('style.min.css'))
				.pipe(connect.reload())
				.pipe(gulp.dest('./dist/'));
});

//Cette tâche va s'occuper des fichier Html...
gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
});

var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
 
gulp.task('minify-css', function() {
  return gulp.src('lib/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});



gulp.task('watch', function(){
	gulp.watch("./sources/scripts/*.js", ["process-script", "lint-script"]);
	gulp.watch("./sources/styles/*.scss", ["process-scss"]);
})

gulp.task('open', function() {
	gulp.src(__filename)
		.pipe(open({ uri: 'http://localhost:8080'}));
});

gulp.task('connect', function() {
  connect.server({
  	root: './',
  	livereload: true
  });
});


gulp.task('start', ["minify-html","process-script", "lint-script",'connect', "process-scss",'open', 'watch']);
