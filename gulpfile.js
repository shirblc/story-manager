const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const jasmineBrowser = require('gulp-jasmine-browser');
const order = require("gulp-order");

//copies the html to the disribution folder
gulp.task("copy-html", function() {
	gulp.src("index.html")
	.pipe(gulp.dest('./dist'))
});

//copies the images folder to the distribution folder
gulp.task("copy-imgs", function() {
	gulp.src("img/*")
	.pipe(gulp.dest("dist/img"))
});

//sets gulp to add prefixes with Autoprefixer after Dreamweaver outputs the Sass filee to CSS
//once the prefixer finishes its job, outputs the file to the distribution folder
gulp.task("styles", function() {
	gulp.src("css/*.css")
	.pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
	.pipe(gulp.dest('./dist/css'))
});

//deals with concating the scripts while in development mode
gulp.task("scripts", function() {
	gulp.src("js/*.js")
	.pipe(sourcemaps.init())
	.pipe(babel({presets: ['@babel/preset-env']}))
	.pipe(order([]))
	.pipe(concat('all.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/js"))
});

//deals with concating the scripts while in production mode
gulp.task("scripts-dist", function() {
	gulp.src("js/*.js")
	.pipe(sourcemaps.init())
	.pipe(babel({presets: ['@babel/preset-env']}))
	.pipe(order([]))
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/js"))
});

//automatic testing in the Jasmine headless browser
gulp.task("tests", function() {
	gulp.src(["dist/js/all.js", "tests/specs.js"])
	.pipe(jasmineBrowser.specRunner({ console: true }))
	.pipe(jasmineBrowser.headless({ driver: 'chrome' }));
});

//testing in whatever browser you want to use; just enter "localhost:3001" in the address line
gulp.task("browser-tests", function() {
	gulp.src(["dist/js/all.js", "tests/specs.js"])
	.pipe(jasmineBrowser.specRunner())
	.pipe(jasmineBrowser.server({ port: 3001 }));
})

//prepare for distribution
gulp.task("dist", gulp.parallel(
	"copy-html",
	"copy-imgs",
	"styles",
	"scripts-dist"
));

//default task
gulp.task("default", gulp.parallel("dist", "copy-html", "copy-imgs", "styles", "scripts", "scripts-dist", "tests", "browser-tests"), function() {
	gulp.watch('css/*.css', ['styles']);
	gulp.watch('/index.html', ['copy-html']);
});