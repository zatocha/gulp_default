"use strict";
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    prefix = require('gulp-autoprefixer');

gulp.task('server', function() {
    browserSync.init({
      server: {
        port: 3000,
        baseDir: "./app"
      },
      notify: false
    });
});

gulp.task('styles', function(){
  gulp.src('./app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 15 versions']
    }))
    .pipe( gulp.dest('./app/css') )
    .pipe(browserSync.stream());
});

gulp.task('build', function(){
  gulp.src('./app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', csso()))
  var buildFonts = gulp.src('./app/fonts/**/*')
    .pipe(gulp.dest('./build/fonts'))
  var buildImages = gulp.src('./app/img/**/*')
    .pipe(gulp.dest('./build/img'))
})


gulp.task('watch', function(){
  gulp.watch('./app/sass/**/*.sass', ['styles']);
});

gulp.task('default', ['watch', 'server']);
