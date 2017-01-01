var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

const config = require('./webpack.config.js')

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var serviceWorker = config.plugins.findIndex(plugin => 
  (plugin instanceof ServiceWorkerWebpackPlugin))
if (serviceWorker != -1)
  config.plugins.splice(serviceWorker, 1)

Object.assign(config, {
  entry: [
    path.join(__dirname, 'src/templateRender.js'),
  ],
  output: {
    path: path.resolve(__dirname, "tools/templateRender"),
    filename: "index.js",
    //library: 'templateRender',
    libraryTarget: 'commonjs2',
    publicPath: '/js/'
  },
  target: 'node',
  externals: nodeModules,
  devtool: 'sourcemap',
  node: {
    __dirname: false,
  }
})

module.exports = config