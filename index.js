'use strict';

var wrapIife = require('wrap-iife');
var through = require('through2');
var applySourceMap = require('vinyl-sourcemaps-apply');


function gulpWrapIife() {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return this.emit('error', new Error('gulp-wrap-iife: does not support streams in vinyls'));
        }

        var result = wrapIife(file.relative, file.contents.toString('utf8'), {sourceMaps: !!file.sourceMap});
        file.contents = new Buffer(result.contents);

        if (file.sourceMap) {
            result.sourceMap.file = file.relative;

            applySourceMap(file, result.sourceMap);
        }

        cb(null, file);
    });
}


module.exports = gulpWrapIife;
