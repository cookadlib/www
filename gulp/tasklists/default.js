'use strict';

import gulp from 'gulp';

export default tasklist;

export function tasklist() {
  return gulp.series(
    'all'
  );
}

export default function watch() {
  return gulp.series(
    'all:watch'
  );
}
