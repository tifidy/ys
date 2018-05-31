var gulp =require("gulp");
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    ngAnnotate = require('gulp-ng-annotate'),
    htmlmin   =  require('gulp-htmlmin'),
    ngHtml2Js = require("gulp-ng-html2js");

var resourcesPath = '';
var distPath  = '';

var public_html = './public';

gulp.task('less', function () {
  gulp.src(['resources/less/starter.less']
    )
      .pipe(plumber())
      .pipe(less())
      .pipe(concat('./custom-compiled.css'))
      .pipe(minifycss())
    .pipe(gulp.dest(public_html+'/assets/css/compiled'))
})

gulp.task('js', function () {
  return gulp.src(['./resources/app/support/*.js','./resources/app/app.js', './resources/app/libs/*.js', './resources/app/config/*.js', './resources/app/directives/*.js', './resources/app/services/*.js', './resources/app/**/*.js'])
    .pipe(plumber())
     .pipe(concat('./app-compiled.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(gulp.dest(public_html+'/assets/js/compiled'))
    .pipe(livereload());
})


gulp.task('html2js', function () {
  gulp.src(['resources/app/views/*.html', 'resources/app/views/**/*.html', 'resources/app/views/**/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))  
    .pipe(ngHtml2Js({
        moduleName: "templatePartials",
        prefix: "tpl-"
  }))
    .pipe(concat("partials.js"))
    .pipe(uglify())
    .pipe(gulp.dest(public_html+"/assets/js/compiled"));
});






gulp.task('all', ['less', 'js', 'html2js'], function () {
  livereload.listen();

    gulp.watch(['resources/less/*.less', 'resources/less/**/*.less'], ['less'])
    .on('change', function(file) {
      console.log("compiling")
        livereload.changed(file.path);
    });

    gulp.watch(['./resources/app/*.js', './resources/app/**/*.js', './resources/app/**/**/*.js'], ['js'])
    .on('change', function(file) {
      console.log("compiling")
        livereload.changed(file.path);
    });

    gulp.watch(['resources/app/views/*.html', 'resources/app/views/**/*.html', 'resources/app/views/**/**/*.html'], ['html2js'])
    .on('change', function(file) {
      console.log("compiling")
        livereload.changed(file.path);
    });

    gulp.watch([public_html+'/index.html'])
    .on('change', function(file) {
        livereload.changed(file.path);
    });

});