let gulp = require('gulp');
let browserSync = require('browser-sync').create();
//let less = require('gulp-less');
let plumber = require('gulp-plumber');
let notify = require('gulp-notify');
let autoprefixer = require('gulp-autoprefixer');
let scss = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let pug = require('gulp-pug');
let del = require('del');
let runSequence = require('run-sequence');

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: './build/'
		}
	});

	gulp.watch('src/pug/**/*.*', ['pug']);
	//gulp.watch('src/less/**/*.less', ['less']);
	gulp.watch('src/scss/**/*.scss', ['scss']);
	gulp.watch('src/js/**/*.js', ['copy:js']);
	gulp.watch('src/libs/**/*.*', ['copy:libs']);
	gulp.watch('src/img/**/*.*', ['copy:img']);
});

// gulp.task('less', function() {
// 	return gulp.src('./src/less/main.less')
// 	.pipe(plumber({
// 		errorHandler: notify.onError(function(err) {
// 					return {
// 						title: 'Styles',
// 						message: err.message
// 					}
// 		})
// 	}))
// 	.pipe(sourcemaps.init())
// 	.pipe(less())
// 	.pipe(autoprefixer({
// 		browsers: ['last 3 versions'],
// 		cascade: false
// 	}))
// 	.pipe(sourcemaps.write())
// 	.pipe(gulp.dest('./build/css'))
// 	.pipe(browserSync.stream());
// });

gulp.task('scss', function() {
	return gulp.src('./src/scss/main.scss')
	.pipe(plumber({
		errorHandler: notify.onError(function (err) {
			return {
				title: 'Styles',
				message: err.message
			}
		})      
	}))
	.pipe(sourcemaps.init())
	.pipe(scss())
	.pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
});

gulp.task('pug', function() {
		return gulp.src('./src/pug/pages/**/*.pug')
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'Pug',
					message: err.message
				}
			})
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
});

gulp.task('copy:js', function() {
		return gulp.src('src/js/**/*.*')
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
});

gulp.task('copy:libs', function () {
	return gulp.src('src/libs/**/*.*')
		.pipe(gulp.dest('./build/libs'))
		.pipe(browserSync.stream());
});

gulp.task('copy:img', function () {
	return gulp.src('src/img/**/*.*')
		.pipe(gulp.dest('./build/img'))
		.pipe(browserSync.stream());
});

gulp.task('clean:build', function() {
		return del('./build');
});

gulp.task('default', function(cb) {
	runSequence(
		'clean:build', ['scss', 'pug', 'copy:js', 'copy:libs', 'copy:img'], 'server', cb
	)
});