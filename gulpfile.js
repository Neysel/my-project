const gulp = require('gulp')
const less = require('gulp-less')
const del = require('del')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')


const paths = {
    styles: {
        src: 'src/styles/**/*.less', 
        dest: 'dist/css/' 
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}
// удаляет дист
function clean() {
    return del(['dist'])
}


// изменяет файл лесс в css
function styles() {
    return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(rename({
        basename: 'main', 
        suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}


function scripts() { 
    return gulp.src(paths.scripts.src, {
        sourcemaps: true 
    })
.pipe(babel())
.pipe(uglify())
.pipe(concat('main.min.js'))
.pipe(gulp.dest(paths.styles.dest))
}



// позволяет в риелтайме менять less в css
function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)

}

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)

exports.clean = clean
exports.styles = styles
exports.watch = watch
exports.build - build 
exports.default = build 
exports.scripts = scripts