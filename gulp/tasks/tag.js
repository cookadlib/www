'use strict';

import {argv} from 'yargs';
import bump from 'gulp-bump';
import debug from 'gulp-debug';
import filter from 'gulp-filter';
import git from 'gulp-git';
import gulp from 'gulp';
import tagVersion from 'gulp-tag-version';

import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

function increment(importance) {
  // get all the files in which to bump version
  return gulp.src([
      './package.json',
      './bower.json'
    ])
    .pipe(debug({
      title: 'tag'
    }))
    // bump the version number in those files
    .pipe(bump({
      type: importance
    }))
    // save files back to filesystem
    .pipe(gulp.dest('./'))
    // commit the changed version number
    .pipe(git.commit('bumps package version'))
    // read only one file to get the version number
    .pipe(filter('package.json'))
    // create tag in the repository
    .pipe(tagVersion())
    .on('error', helper.reportError);
}

export default function task(namespace = defaultNamespace) {
  switch (argv.version) {
    case 'major':
      increment('major');
      break;
    case 'minor':
      increment('minor');
      break;
    case 'patch':
      increment('patch');
      break;
  }

  git.push('origin', 'master', function(err) {
    if (err) {
      throw err;
    }
  });

  git.push('origin', 'master', {
    args: '--tags'
  }, function(err) {
    if (err) {
      throw err;
    }
  });
}
