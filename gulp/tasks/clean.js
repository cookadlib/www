'use strict';

import clean from 'gulp-clean';
import debug from 'gulp-debug';
import gulp from 'gulp';

import * as config from '../config';
import * as helper from '../helper';

export default task;

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.directory.destination.base;

export function task(namespace = defaultNamespace) {
  return gulp.src(sourceFiles, {
    dot: true,
    read: false
  })
  .pipe(debug({
    title: namespace
  }))
  .pipe(clean())
  .on('error', helper.reportError);
}
