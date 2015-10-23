var gulp 		= require('gulp');
var concat 		= require('gulp-concat');
var uglify 		= require('gulp-uglify');
var rename 		= require('gulp-rename');
var jshint 		= require('gulp-jshint');
var stylish 	= require('jshint-stylish');
var sass 		= require('gulp-sass');
var connect 	= require('gulp-connect');
var open		= require('gulp-open');
var imagemin 	= require('gulp-imagemin');
var pngquant 	= require('imagemin-pngquant');


// Cette tâche va s'occuper des fichiers scripts
gulp.task('process-scripts', function()
{
	return gulp.src('./sources/scripts/*.js')
				.pipe(concat('app.js'))
				.pipe(gulp.dest('./dist/'))
				.pipe(rename('app.min.js'))
				.pipe(uglify())
				.pipe(connect.reload())
				.pipe(gulp.dest('./dist/'));
});

// Cette tâche s'occupe de vérifier les erreurs potentielles sur les fichiers JS
gulp.task('lint-scripts', function()
{
	return gulp.src('./sources/scripts/*.js')
				.pipe(jshint())
				.pipe(jshint.reporter(stylish))
});

// Cette tâche va s'occuper des fichiers scss
gulp.task('process-styles', function()
{
	return gulp.src('./sources/styles/*.scss')
				.pipe(sass({outputStyle: 'expanded'}))
				.pipe(rename('app.css'))
				.pipe(gulp.dest('./dist/'))
				.pipe(sass({ouputStyle: 'compressed'}))
				.pipe(rename('app.min.css'))
				.pipe(connect.reload())
				.pipe(gulp.dest('./dist/'));
});

gulp.task('process-images', function () {
    return gulp.src('./images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: true}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/images'));
});


gulp.task('open', function(){
	gulp.src(__filename)
		.pipe(open({ uri: 'http://localhost:8080' }));
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('watch', function()
{
	gulp.watch('./sources/scripts/*.js', ['process-scripts', 'lint-scripts']);
	gulp.watch('./sources/styles/*.scss', ['process-styles'])
});

gulp.task('default', ['connect', 'open', 'process-styles', 'process-scripts', 'process-images', 'lint-scripts', 'watch']);