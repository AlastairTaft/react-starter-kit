import copyFile from './copyFile.js'
import webpack from 'webpack'
import webpackClientConfig from './../webpack.config.js'
import webpackServerConfig from './../webpack.server.config.js'
import fs from 'fs'

var CompressionPlugin = require("compression-webpack-plugin")

fs.mkdirSync('./dist')
fs.mkdirSync('./dist/public')
copyFile('tools/prod-template.html', './dist/public/index.html')
compileWebpackClientBundle()
compileWebpackServerBundle()

function compileWebpackClientBundle(){
	webpackClientConfig.output.publicPath = '/'
  if (process.env.NODE_ENV === 'production'){
  	webpackClientConfig.plugins.push(new webpack.optimize.UglifyJsPlugin())
  	webpackClientConfig.plugins.push(new webpack.DefinePlugin({
  	  'process.env.NODE_ENV': process.env.NODE_ENV == 'production' ? '"production"' : '"development"'
  	}))
    webpackClientConfig.plugins.push(new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }))
  }
  var compiler = webpack(webpackClientConfig);
  compiler.run(function(err, stats) {
    if (err) throw err
    console.log(stats.toString())
  });
};

function compileWebpackServerBundle(){
	webpackServerConfig.output.publicPath = '/'
  var compiler = webpack(webpackServerConfig);
  compiler.run(function(err, stats) {
    if (err) throw err
    console.log(stats.toString())
  });
};