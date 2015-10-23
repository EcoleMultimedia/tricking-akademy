var  gulp  =  require("gulp");
var  concat=  require ("gulp-concat");
var uglify =  require ("gulp-uglify");
var rename =  require ("gulp-rename");
var jshint=  require ("gulp-jshint");
var stylish= require  ("jshint-stylish");
var sass        = require('gulp-sass');
var connect     = require('gulp-connect');
var open        = require('gulp-open');



//cette  tache va s'occuper  des fichiers  JS
gulp.task('process-scripts', function(){
	return gulp.src('./sources/scripts/*.js')
			   .pipe(concat('app.js'))
			   .pipe(gulp.dest('./dist/'))
			   .pipe(rename('app.min.js'))
			   .pipe(connect.reload())
			   .pipe(uglify())
			   .pipe(gulp.dest('./dist/'));
});


// cette  tache   s'occupe  de  verifier  les erreurs potentielles  sur les fichiers 
gulp.task('lint-scripts' , function(){
	return gulp.src('./sources/scripts/*.js')
			   .pipe(jshint())
			   .pipe(jshint.reporter(stylish))
			   		   
});


//cette  tache  va s'occuper  des fichiers  scss
gulp.task('process-styles', function(){

	return  gulp.src('./sources/styles/*.scss')
				.pipe(sass({outputStyle: 'expanded' }))
			   .pipe(rename('styles.css'))
			   .pipe(gulp.dest('./dist/'))
			   .pipe(sass({outputStyle: 'compressed'}))
			   .pipe(rename('styles.min.css'))
			   .pipe(connect.reload())
			   .pipe(gulp.dest('./dist/'))

});


gulp.task('connect', function(){
	connect.server({
	root: '.',
    livereload: true
  });
});


//cette tache  va  s'occuper  de watcher  les modifications  js  et scss
gulp.task('watch', function(){
	gulp.watch('./sources/scripts/*.js' , ['process-scripts' , 'lint-scripts']);
	gulp.watch('./sources/styles/*.scss' , ['process-styles']);
	gulp.watch('./*.html' , ['process-styles']);
});

gulp.task('open', function(){
	gulp.src(__filename)
	.pipe(open({uri: 'http://localhost:8080'}));	
});


gulp.task('default', ['connect','open','process-scripts' , 'lint-scripts', 'process-styles','watch'  ]  );