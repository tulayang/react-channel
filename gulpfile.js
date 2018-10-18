const Gulp = require('gulp')
const Typescript = require('gulp-typescript') 
const sourcemaps = require('gulp-sourcemaps')
const Rimraf = require('rimraf')                               
const Webpack = require('webpack-stream')
const WebpackF = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const Path = require('path')
const tsconfig = require('./tsconfig.json')                      

const PROJ_DIR = __dirname
const SOURCE_DIR = Path.join(PROJ_DIR, 'src') 
const DIST_DIR = Path.join(PROJ_DIR, 'dist') 

Gulp.task('clear', function (cb) {
  Rimraf.sync(DIST_DIR)
  cb()
})

Gulp.task('copy', function () {
  return Gulp
           .src(Path.join(SOURCE_DIR, './**/*.!(styl|ts|tsx|*.styl|*.tsx|*.ts)'), {
             base: SOURCE_DIR,
           })
           .pipe(Gulp.dest(DIST_DIR))
})

Gulp.task('build-browser', function compileComponents() {
  var ws = Webpack({
    output: {
      filename: 'react-channel.web.min.js',
      libraryTarget: "umd",
      library: "ReactChannel"
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    externals: [
      {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    ],
    //devtool: 'source-map',
    module: {
      rules: [
        { 
          test: /\.tsx$/, 
          use: ['awesome-typescript-loader'],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new WebpackF.optimize.UglifyJsPlugin()
    ]
  }).on('error', function (error) {
    console.error(error.toString())
    this.emit('end')
  })
  return Gulp
          .src(Path.join(SOURCE_DIR, './react-channel.tsx'), {
            base: SOURCE_DIR
          })
          .pipe(ws)
          .pipe(Gulp.dest(DIST_DIR))
})

Gulp.task('build-browser-test', function compileComponents() {
  var ws = Webpack({
    output: {
      filename: 'test.web.js',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    externals: [
      {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-channel': 'ReactChannel'
      }
    ],
    module: {
      rules: [
        { 
          test: /\.tsx$/, 
          use: ['awesome-typescript-loader'],
          exclude: /node_modules/
        }
      ]
    }
  }).on('error', function (error) {
    console.error(error.toString())
    this.emit('end')
  })
  return Gulp
          .src(Path.join(SOURCE_DIR, './test.tsx'), {
            base: SOURCE_DIR
          })
          .pipe(ws)
          .pipe(Gulp.dest(DIST_DIR))
})

Gulp.task('build', ['clear', 'copy', 'build-browser', 'build-browser-test'])


