var gulp 		= require('gulp');
var concat		= require('gulp-concat');
var uglify 		= require('gulp-uglify');
var rename 		= require("gulp-rename");
var jshint 		= require('gulp-jshint');
var stylish		= require('jshint-stylish');
var sass 		= require('gulp-sass');
var connect 	= require('gulp-connect');
var open 		= require('gulp-open');
var validator 	= require('gulp-html');
var htmlreplace = require('gulp-html-replace');

//cette tâche va s'occuper des fichiers JS ...
gulp.task('process-scripts', function() {
	return gulp.src('./sources/scripts/*.js')
			   .pipe(concat('app.js'))
			   .pipe(gulp.dest('./dist/sources/scripts/'))	
 			   .pipe(rename('app.min.js'))
			   .pipe(uglify())
			   .pipe(connect.reload())
			   .pipe(gulp.dest('./dist/sources/scripts/'));
});

//Cette tâche s'occupe de verifier les erreures potentielles sur les fichiers JS ...
gulp.task('lint-scripts', function() {
	return gulp.src('./sources/scripts/*.js')
	    	   .pipe(jshint.reporter(stylish))
});

//Cette tâche va s'occuper des fichiers SCSS ...
gulp.task('process-styles', function() {
	return gulp.src('./sources/styles/*.scss')
			   .pipe(sass({outputStyle: 'expanded'}))
			   .pipe(rename('app.css'))
			   .pipe(gulp.dest('./dist/sources/styles/'))
			   .pipe(sass({outputStyle: 'compressed'}))
			   .pipe(rename('app.min.css'))
			   .pipe(connect.reload())
			   .pipe(gulp.dest('./dist/sources/styles/'));
});

 
gulp.task('process-html', function() {
  return gulp.src('./*.html')
  			 .pipe(gulp.dest('./dist/'));
});

gulp.task('bower', function() {
  return gulp.src('./bower_components/**/')
  			 .pipe(gulp.dest('./dist/bower_components/'));
});

gulp.task('connect', function() {
	connect.server({
		root		: './',
		livereload	: true
	});
});

gulp.task('watch', function() {
	gulp.watch('./sources/scripts/*.js',['process-scripts', 'lint-scripts'])
	gulp.watch('./sources/styles/*.scss',['process-styles'])
});

gulp.task('open', function() {
	gulp.src(__filename)
  		.pipe(open({uri:'http://localhost:8080'}));
})

gulp.task('default', ['connect', 'open', 'watch', 'process-styles', 'process-scripts', 'lint-scripts', 'process-html','bower'] );