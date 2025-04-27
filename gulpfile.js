var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var include_file = require('gulp-file-include');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

function browserSyncInit() {
    browserSync.init({
        server: './build'
    })

    gulp.watch('./build/*.html').on('change', browserSync.reload);
    gulp.watch('./build/css/*.css').on('change', browserSync.reload);
}

function html(cb) {
    return gulp.src('./src/*.html')
        .pipe(include_file({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulp.dest('build'))
    ;
}

function js(cb) {
    gulp.task('js', function () {
        return gulp.src('/js/*.js')
            .pipe(uglify())
            .pipe(concat('app.js'))
            .pipe(gulp.dest('build/js'));
    });
}

function css(cb) {
    return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in src/scss and children dirs
        .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
        .pipe(gulp.dest('build/css')) // Outputs it in the css folder
    ;
}

exports.default = function() {
    // You can use a single task
    gulp.watch('src/scss/**/*.scss', css);
    gulp.watch('src/**/*.html', html);

    browserSyncInit();
};



