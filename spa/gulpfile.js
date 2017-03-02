var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var watchify = require('watchify');
var exorcist = require('exorcist');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');

// Watchify args contains necessary cache options to achieve fast incremental bundles.
// See watchify readme for details. Adding debug true for source-map generation.
watchify.args.debug = true;
// Input file.
var bundler = watchify(browserify('./assets/app.js', watchify.args));

// Babel transform
bundler.transform(babelify.configure({
	sourceMapRelative: 'assets',
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
	gutil.log('Compiling JS...');

	return bundler.bundle()
		.on('error', function (err) {
			gutil.log(err.message);
			browserSync.notify('Browserify Error!');
			this.emit('end');
		})
		.pipe(exorcist('./dist/bundle.js.map'))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
	return bundle();
});

gulp.task('prefix', function () {
	var plugins = [
		autoprefixer({browsers: ['last 2 versions']})
	];

	return gulp.src('./assets/style.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle', 'prefix'], function () {
	browserSync.init({
		server: './'
	});

	gulp.watch('./assets/*.css', ['prefix']);
});
