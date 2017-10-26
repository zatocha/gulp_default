"use strict";
var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	useref = require('gulp-useref'),
	gulpIf = require('gulp-if'),
	uglify = require('gulp-uglify'),
	csso = require('gulp-csso'),
	prefix = require('gulp-autoprefixer'),
	includer = require("gulp-x-includer");

gulp.task('server', function () { // создаем task browser-sync
	browserSync.init({
		server: {
			port: 3000,
			baseDir: "./app"
		},
		notify: false // отключаем уведомления
	});
});

gulp.task('styles', function () { // создаем task
	gulp.src('./app/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 15 versions']
		}))
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.stream());
});

gulp.task('build', function () { // создаем task для сборки проекта
	gulp.src('./app/*.html')
		.pipe(includer()) // выполняем include html файлов
		.pipe(useref()) // конкатенируем скрипты и стили
		.pipe(gulpIf('*.js', uglify())) // сжимаем js
		.pipe(gulpIf('*.css', csso())) // минифицируем стили
		.pipe(gulp.dest('./build')); // выгружаем скрипты и js в папку build
	gulp.src('./app/fonts/**/*') // берем источник
		.pipe(gulp.dest('./build/fonts')); // выгружаем шрифты в папку build
	gulp.src('./app/img/**/*') // берем источник
		.pipe(gulp.dest('./build/img')) // выгружаем картинки в папку build
});


gulp.task('watch', function () { // создаем task для отслеживания изменений в sass
	gulp.watch('./app/sass/**/*.sass', ['styles']);
});

gulp.task('default', ['watch', 'server']);
