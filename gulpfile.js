var gulp     = require('gulp');
var concat   = require("gulp-concat");
var uglify   = require("gulp-uglify");
var rename   = require("gulp-rename");
var jshint   = require("gulp-jshint");
var stylish  = require("jshint-stylish");
var sass     = require("gulp-sass");

var connect  = require("gulp-connect");
var open     = require("gulp-open");
// traitement images
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
// traitement html
//var processhtml = require('gulp-processhtml');

// Cette tâche va s'occuper des fichiers JS...
gulp.task('process-scripts', function() {
	return gulp.src('./sources/scripts/*.js')
		       .pipe(concat('app.js'))
		       .pipe(gulp.dest('./dist/scripts'))
		       .pipe(rename('app.min.js'))
		       .pipe(uglify())
		       .pipe(connect.reload())
		       .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('copy-index-html', function() {
    gulp.src('./*.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist'));
});

// Cette tache s'occupe de vérifier les erreurs potentielles sur les fichiers
gulp.task('lint-scripts', function() {
	return gulp.src('./sources/scripts/*.js')
			   .pipe(jshint())
			   .pipe(jshint.reporter(stylish))
});

//cette tache va s'occuper des fichiers css
gulp.task('process-styles', function() {
	return gulp.src('./sources/styles/*.scss')
			   .pipe(sass({ outputStyle: 'expanded'}))
			   .pipe(rename('app.css'))
			   .pipe(gulp.dest('./dist/styles'))
			   .pipe(sass({ outputStyle: 'compressed'}))
			   .pipe(rename('app.min.css'))
			   .pipe(connect.reload())
			   .pipe(gulp.dest('./dist/styles'));
});

gulp.task('process-images', function () {
    return gulp.src('./images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/images'));
});

/*gulp.task('process-html', function () {
    return gulp.src('./*.html')
               .pipe(processhtml(opts))
               .pipe(gulp.dest('./dist'));
});*/

gulp.task('watch', function() {
	gulp.watch(['./gulp/*.html'], ['html']);
	gulp.watch('./sources/scripts/*.js', ['process-scripts', 'lint-scripts'])
	gulp.watch('./sources/styles/*.css', ['process-styles'])
});

gulp.task('open', function(){
	gulp.src(__filename)
		.pipe(open({ uri: 'http://localhost:8080' }));
});

// créer un serveur directement
gulp.task('connect', function() {
	connect.server({
		root: './',
		livereload: true
	});
});

gulp.task('default', [
	'connect', 'open','process-scripts', 'lint-scripts',
	'process-styles', 'process-images', 'copy-index-html', 'watch'
]);