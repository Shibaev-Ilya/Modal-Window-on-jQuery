var gulp = require("gulp");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
// var imagemin = require("gulp-imagemin");
// var imageminJpegRecompress = require("imagemin-jpeg-recompress");
// var pngquant = require("imagemin-pngquant");
// var cache = require("gulp-cache");

// Images optimization and copy in /img
function images(done) {
  gulp
    .src("./src/images/*")
    .pipe(
      cache(
        imagemin(
          [
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imageminJpegRecompress({
              loops: 5,
              min: 65,
              max: 70,
              quality: "medium"
            }),
            imagemin.svgo(),
            imagemin.optipng({ optimizationLevel: 3 }),
            pngquant({ quality: "65-70", speed: 5 })
          ],
          {
            verbose: true
          }
        )
      )
    )
    .pipe(gulp.dest("./img/"));

  done();
}

// Clearing the cache
function clear(done) {
  cache.clearAll(done);
  done();
}
// scss to minimalized css
function css_style(done) {
  gulp
    .src("./src/scss/**/*.scss")
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: "compressed"
      })
    )
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./css/"));

  done();
}

function js(done) {
  gulp
    .src("./src/js/**/*.js")
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./js/"));

  done();
}

function watch_file() {
  gulp.watch("./src/scss/**/*", css_style);
  gulp.watch("./src/js/**/*", js);
}

gulp.task("default", gulp.parallel(watch_file));
gulp.task(images);
gulp.task(clear);
gulp.task(js);
