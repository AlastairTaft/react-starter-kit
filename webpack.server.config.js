var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

const baseConfig = require('./webpack.base.config.js')

var config = Object.assign({}, baseConfig)

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

Object.assign(config, {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src/server.js'),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "http://localhost:8080/",
    filename: "server.bundle.js"
  },
  target: 'node',
  externals: nodeModules,
  devtool: 'sourcemap',
  node: {
    __dirname: false,
  }
})

// Clone the plugins first so we don't add to the original object
config.plugins = config.plugins.slice()
//webpackConfig.plugins.push(new webpack.IgnorePlugin(/\.(css|less)$/))
config.plugins.push(
  new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false }))

module.exports = config