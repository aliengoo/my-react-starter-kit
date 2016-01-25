"use strict";

import gulp from "gulp";

var lp = require("gulp-load-plugins")({
  lazy: true
});

import browserify from "browserify";
import watchify from "watchify";
import babelify from "babelify";

import path from 'path';
import source from 'vinyl-source-stream';
import exorcist from 'exorcist';

import {WindowsToaster} from 'node-notifier';

let notifier = new WindowsToaster({
  withFallback: true
});

var mapfile = path.join(__dirname, 'public/js', 'bundle.js.map');

gulp.task("vendor:fonts:font-awesome", () => {
  const src = [
    'node_modules/font-awesome/fonts/*'
  ];

  return gulp.src(src)
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('vendor:fonts', ["vendor:fonts:font-awesome"], () => {
  const src = [
    'node_modules/semantic-ui/dist/themes/**'
  ];

  return gulp.src(src)
    .pipe(gulp.dest('public/css/themes'));
});

gulp.task('vendor:css', ['vendor:fonts'], () => {
  var src = [
    'node_modules/animate.css/animate.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/semantic-ui/dist/semantic.min.css',
    'node_modules/react-select/dist/react-select.css'
  ];

  return gulp.src(src)
    .pipe(lp.concat('vendor.css'))
    .pipe(gulp.dest("public/css"));
});

gulp.task('build:css', () => {

  // pipe the target file to the
  const mainFile = ["src/app.scss"];
  var imports = [
    "!" + mainFile[0],
    'src/**/*.scss'
  ];

  return gulp.src(mainFile)
    .pipe(lp.inject(gulp.src(imports, {read: false}), {
      relative: true,
      starttag: '/* inject:imports */',
      endtag: '/* endinject */',
      transform: function (filePath) {
        return '@import "' + filePath + '";';
      }
    }))
    .pipe(lp.sass())
    .pipe(lp.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(lp.minifyCss())
    .pipe(gulp.dest("public/css"))
    .pipe(lp.livereload());
});

gulp.task("build:js", function (done) {
  var args = watchify.args;
  args.extensions = ['.js'];
  args.debug = true;

  watchify(browserify(path.join("./src", "main.js"), args), args)
    .transform(babelify)
    .bundle()
    .on('error', (err) => {
      console.error(err.message);
      console.error(err.stack);
      notifier.notify({
        title: "build:js",
        message: err.message,
        icon: path.join(__dirname,'.stuff/icons/browserify.png')
      });
      done();
    })
    .pipe(exorcist(mapfile))
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./public/js"))
    .pipe(lp.livereload()).on('end', () => {
    notifier.notify({
      title: "build:js",
      message: "Browserify finished",
      icon: path.join(__dirname,'.stuff/icons/browserify.png')
    });
    done();
  });
});

gulp.task("deploy:index", () => {
  return gulp.src("src/index.html")
    .pipe(gulp.dest("public"))
    .pipe(lp.livereload());
});

var watcher = () => {
  lp.livereload({
    start: true
  });
  gulp.watch(['src/**/*.js'], ["build:js"]);
  gulp.watch('src/**/*.scss', ["build:css"]);
  gulp.watch('src/index.html', ['deploy:index']);
};

gulp.task('default', ['deploy:index', 'vendor:css', 'build:css', 'build:js'], watcher);

gulp.task("build:js:watch", ["build:js"], watcher);
