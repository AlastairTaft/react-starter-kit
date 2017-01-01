var fs = require('fs')
var express = require('express');
	
var app = express()
var gzipStatic = require('connect-gzip-static')

if (process.env.NODE_ENV != 'production' && process.argv.indexOf('--production') == -1){

	// Default env vars
	// Load env vars from the .env file if they aren't present
	if (fs.existsSync('./.env')){
	  var contents = fs.readFileSync('./.env', 'utf8')
	    , lines = contents.split("\n")
	  lines.forEach(function(line){
	    var parts = line.split("=")
	      , name = parts[0]
	      , val = parts[1]

	    if (typeof process.env[name] === 'undefined'){
	      process.env[name] = val

	      console.log('Defaulting env var ', name, ' to ', val)
	    }
	  })
	}

	var path = require('path');
	var webpack = require('webpack');
	var devMiddleware = require('webpack-dev-middleware');
	var hotMiddleware = require('webpack-hot-middleware');
	var config = require('./webpack.config');


	

	var compiler = webpack(config);
	app.use(devMiddleware(compiler, {
	  publicPath: config.output.publicPath,
	  historyApiFallback: true,
	}));

	app.use(hotMiddleware(compiler));

}

app.use(gzipStatic('docs'))

app.listen(process.env.PORT || 3000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:' + (process.env.PORT || 3000) + '/');
});
