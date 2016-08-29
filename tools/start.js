import gaze from 'gaze'
import cp from 'child_process'
import path from 'path' 
import fs from 'fs'
import chalk from 'chalk'
import copyFile from './copyFile.js'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import webpackAppConfig from './../webpack.config.js'
import webpackServerConfig from './../webpack.server.config.js'
var babel = require("babel-core");

fs.mkdirSync('./dist')
fs.mkdirSync('./dist/public')
copyFile('tools/dev-template.html', './dist/public/index.html')
runWebpackDevServer()  
startServer()

/**
 * Starts the server and watches for file changes, restarts the process when
 * files are changed.
 */
function startServer(){
  const entryFile = path.join(__dirname, '../dist/server.bundle.js')
  
  var server

  var config = Object.assign({}, webpackServerConfig)
  var compiler = webpack(config);
  compiler.plugin("compile", function() {
    console.log((chalk.red(`server bundle rebuilding`)))
  });
  /*compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    //poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
  }, function(err, stats) {
    if (err) throw err
    //console.log(require('util').inspect(stats))
    console.log((chalk.red(`server bundle rebuilt`)))
    if (server) server.kill('SIGTERM');
    server = spawnServerProcess();
  });*/
  // Don't restart the server on changes, this usually isn't
  // needed
  compiler.run(function(err, stats) {
    console.log((chalk.red(`server bundle built`)))
    server = spawnServerProcess();
  });

  function spawnServerProcess() {
    const server = cp.fork(entryFile, {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false,
    });
    process.on('exit', () => server.kill('SIGTERM'));
    return server;
  }
}

function runWebpackDevServer(){

  var config = Object.assign({}, webpackAppConfig)
  config.entry.push("webpack/hot/dev-server")
  config.entry.push("webpack-dev-server/client?http://localhost:8080/")
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.devtool = 'source-map'
  var compiler = webpack(config);

  process.env.NODE_PATH = path.resolve(__dirname, '..', 'node_modules')

  var server = new WebpackDevServer(compiler, {
    // webpack-dev-server options

    contentBase: path.resolve(__dirname, '../src'),
    // or: contentBase: "http://localhost/",

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: false,

    // Set this if you want to enable gzip compression for assets
    compress: true,

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    //lazy: true,
    //filename: "bundle.js",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    //publicPath: "/",
    headers: { "X-Custom-Header": "yes" },
    stats: { 
      colors: true,
      // This means in the output window it will only show the chunk
      // which changed
      cached: false, 
    }
  });
  server.listen(8080, "localhost", function() {
    console.log('webpack dev server running on port 8080')
  });
}
