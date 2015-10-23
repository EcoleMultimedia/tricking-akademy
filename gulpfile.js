var gulp   = require("gulp");
var rename = require("gulp-rename");
var sass   = require("gulp-sass");
var inject = require("gulp-inject");

var app     = { path: './app', tmp : { path: '.tmp/ '} };
var images  = { path: app.path + '/images' };
var scripts = { path: app.path + '/sources/scripts' };
var styles  = { path: app.path + '/sources/styles' };

gulp.task("index", function () {
  var filesToInject = gulp.src([scripts.path + '/**/*.js', styles.path + '/**/*.css'], { read: false });
  return gulp.src(app.path + "/*.html")
              .pipe(inject(filesToInject))
              .pipe(gulp.dest(app.tmp.path));
});