var gulp    = require('gulp');
var sass    = require('gulp-sass');
var minCSS  = require('gulp-clean-css');
var minHTML = require('gulp-minify-html-2');
var rename  = require('gulp-rename');

/**
* Minifica arquivos html 
**/
gulp.task('min-html', function(){
	var opts = {comments:true,spare:true};

	return gulp.src('./source/index.html')
		.pipe(minHTML(opts))
		.pipe(gulp.dest('./dist/'))
});

/**
* Compila arquivos SCSS
**/
gulp.task('sass', function(){
	return gulp.src('./source/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dist/css/'))
});

/**
* Minifica os arquivos CSS
*/
gulp.task('min-css', function(){
	return gulp.src(['./dist/css/*.css', '!./dist/css/*.min.css'])
		.pipe(minCSS({compatibility: 'ie8'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/css/'))
});

/**
* Monitora alterações nos arquivos SCSS, HTML
*/
gulp.task('view', function(){
	gulp.watch('./source/scss/*.scss', ['sass'])
	gulp.watch(['./dist/css/*.css', '!./dist/css/*.min.css'], ['min-css'])
	gulp.watch('./source/index.html', ['min-html'])
});

/**
* Task default
* Inicia executando todas as tasks
*/
gulp.task('default',['min-html', 'sass', 'min-css', 'view']);