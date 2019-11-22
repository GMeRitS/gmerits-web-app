var gulp = require('gulp');
var replace = require('gulp-replace');
var _ = require('lodash');

gulp.task('build_development', function() {
  return gulp
    .src(['./build/index.html'])
    .pipe(
      printEnv({
        ENV: 'development',
        API_HOST: 'https://devapi.mesensei.com'
      })
    )
    .pipe(gulp.dest('./build'));
});

gulp.task('build_production', function() {
  return gulp
    .src(['./build/index.html'])
    .pipe(
      printEnv({
        ENV: 'production',
        API_HOST: ''
      })
    )
    .pipe(gulp.dest('./build'));
});

function printEnv(env) {
  var str = '';
  _.forOwn(env, function(value, key) {
    if (value) {
      str += 'window.' + key + ' = "' + value + '";\n';
    }
  });
  return replace(/__ENV__/g, str);
}