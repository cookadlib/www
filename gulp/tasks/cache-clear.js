'use strict';

import cache from 'gulp-cached';
import gulp from 'gulp';

import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

export default function task(namespace = defaultNamespace) {
  cache.caches = {};
}
