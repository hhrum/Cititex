const build_folder = 'dist';
const source_folder = '#src';

const path = {
  build: {
    html: build_folder + '/',
    css: build_folder + '/css/',
    js: build_folder + '/js/',
    img: build_folder + '/img/',
    fonts: build_folder + '/fonts/',
  },
  source: {
    html: source_folder + '/*.html',
    css: source_folder + '/css/style.scss',
    js: source_folder + '/js/script.js',
    img: source_folder + '/img/**/*.{jpg, png, svg, gif, webp}',
    fonts: source_folder + '/fonts/*.ttf',
  },
  watch: {
    html: source_folder + '/**/*.html',
    css: source_folder + '/css/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.{jpg, png, svg, gif, webp}',
  },
  clean: './' + build_folder + '/',
}

const config = {
  server: {
    baseDir: `./${build_folder}`
  },
  tunnel: true,
  host: 'localhost',
  port: 3000,
  notify: false
}

const {src, dest, series, parallel} = require('gulp'),
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  bs = require('browser-sync').create(),
  rimraf = require('rimraf'),
  prefixer = require('gulp-autoprefixer'),
  scss = require('gulp-sass'),
  cssmin = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  fileInclude = require('gulp-file-include');

const browserSync = (done) => {
  bs.init(config);
  done();
}

const html = () => {
  return src(path.source.html)
    .pipe(fileInclude())
    .pipe(dest(path.build.html))
    .pipe(bs.stream())
}

const css = () => {
  return src(path.source.css)
    .pipe(scss())
    .pipe(prefixer())
    .pipe(dest(path.build.css))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(cssmin())
    .pipe(dest(path.build.css))
    .pipe(bs.stream())
}

const js = () => {
  return src(path.source.js)
    .pipe(fileInclude())
    .pipe(dest(path.build.js))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(bs.stream())
}

const clean = (cb) => {
  rimraf(path.clean, cb);
}

const watchFiles = (done) => {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  done();
}

const build = series(clean, html, css, js);
const watch = parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.clear = clean;
exports.build = build;
exports.watch = watch
exports.default = watch;