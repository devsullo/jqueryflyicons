// //////////////////////////////////////
// Required
// //////////////////////////////////////

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat');




// //////////////////////////////////////
// Scripts Task
// //////////////////////////////////////

gulp.task('scripts',function(){
	gulp.src([
		'src/*.js'
		])
	.pipe(plumber())
	.pipe(concat('jqueryflyicons.js'))
	.pipe(gulp.dest('dist/'))
    .pipe(concat('jqueryflyicons.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});


// //////////////////////////////////////
// Sass Task
// //////////////////////////////////////

gulp.task('sass', function () {
  gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
	        browsers: ['last 4 versions'],
	        cascade: false
	    }))
    .pipe(rename("jqueryflyicons.css"))
    .pipe(gulp.dest('dist/'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename("jqueryflyicons.min.css"))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});



// //////////////////////////////////////
// html Task
// //////////////////////////////////////
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(reload({stream:true}));
});


// //////////////////////////////////////
// Brouwser-Sync Tasks
// //////////////////////////////////////
gulp.task('browser-sync',function(){
	browserSync.init({
		server: "./",
		port: 9090
    });
});


// //////////////////////////////////////
// Watch Task
// //////////////////////////////////////

gulp.task('watch',function(){
	gulp.watch('src/*.js',['scripts']);
	gulp.watch('src/*.scss',['sass']);
	gulp.watch('src/*.html',['html']);
});


// //////////////////////////////////////
// Default tast
// //////////////////////////////////////
gulp.task('default',['sass','scripts','html','browser-sync','watch']);