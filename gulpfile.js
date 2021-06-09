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
    img: source_folder + '/img/**/*.*',
    fonts: source_folder + '/fonts/*.ttf',
  },
  watch: {
    html: source_folder + '/**/*.html',
    css: source_folder + '/css/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.*',
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

const cb = () => null;

const {src, dest, series, parallel} = require('gulp'),
  gulp = require('gulp'),
  fs = require('fs'),
  rename = require('gulp-rename'),
  bs = require('browser-sync').create(),
  rimraf = require('rimraf'),
  // css
  prefixer = require('gulp-autoprefixer'),
  scss = require('gulp-sass'),
  cssmin = require('gulp-minify-css'),
  // js
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  uglify = require('gulp-uglify'),
  // html
  fileInclude = require('gulp-file-include'),
  // fonts
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2');

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
    .pipe(scss({outputStyle: 'expanded'}))
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
  return browserify(path.source.js)
    .bundle()
    .pipe(source('script.js'))
    .pipe(dest(path.build.js))
    // .pipe(rename({
    //   extname: '.min.js'
    // }))
    // .pipe(uglify())
    .pipe(bs.stream())
}

const img = () => {
  return src(path.source.img)
    .pipe(dest(path.build.img))
    .pipe(bs.stream());
}

const fonts = () => {
  src(path.source.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));

  return src(path.source.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
}

const includeFonts = (done) => {
  const fontsStylePath = source_folder + '/css/base/fonts.scss';

  const weights = {
    'Thin': 100, 'Hairline': 100,
    'ExtraLight': 200, 'UltraLight': 200,
    'Light': 300,
    'Normal': 400, 'Regular': 400,
    'Medium': 500,
    'SemiBold': 600, 'DemiBold': 600,
    'Bold': 700,
    'ExtraBold': 800, 'UltraBold': 800,
    'Black': 900, 'Heavy': 900,
  };

  const styles = {
    'Normal': 'normal',
    'Italic': 'italic',
  }

  let file_content = fs.readFileSync(fontsStylePath);

  fs.writeFile(fontsStylePath, '', cb);

  fs.readdir(path.build.fonts, (err, items) => {
    if (items) {
      let c_file_name;

      items.forEach(el => {
        let [file_name] = el.split('.');

        if (c_file_name !== file_name) {
          let font_name = file_name;

          let weightReg = new RegExp(Object.keys(weights).join('|'));
          let matchWeight = font_name.match(weightReg);
          let weight = matchWeight ? weights[matchWeight[0]] : weights.Normal;
          font_name = matchWeight ? font_name.replace(matchWeight[0], '') : font_name;

          let styleReg = new RegExp(Object.keys(styles).join('|'));
          let matchStyle = font_name.match(styleReg);
          let style = matchStyle ? styles[matchStyle[0]] : styles.Normal;
          font_name = matchStyle ? font_name.replace(matchStyle[0], '') : font_name;

          let dirtySymsReg = new RegExp(['-'].join('|'), 'gi');
          font_name = font_name.replace(dirtySymsReg, '');

          fs.appendFileSync(fontsStylePath, `@include font("${font_name}","${file_name}", ${weight}, ${style});\r\n`);
        }

        c_file_name = file_name;
      });
    }
  });

  done();
}

const clean = (cb) => {
  rimraf(path.clean, cb);
}

const watchFiles = (done) => {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], img);
  done();
}

const buildFonts = series(fonts, includeFonts);
const build = series(clean, buildFonts, html, css, js, img);
const watch = parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.fonts = fonts;
exports.includeFonts = includeFonts;
exports.buildFonts = buildFonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch
exports.default = watch;