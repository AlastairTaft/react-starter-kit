
var path = require('path')
var webpack = require('webpack')
var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

var IS_PRODUCTION = process.env.NODE_ENV == 'production' || process.argv.indexOf('--production') != -1

var entry = []
if (!IS_PRODUCTION){
	entry.push('react-hot-loader/patch')
	entry.push('webpack-hot-middleware/client')
}
entry.push('./src/index.js')

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({ 
    'process.env.NODE_ENV': IS_PRODUCTION ? '"production"' : '"development"',
    'process.env.BUILD_HASH': '"' + Math.random().toString(36).substr(2, 8) + '"',
  }),
  new ServiceWorkerWebpackPlugin({
	  entry: path.join(__dirname, 'src/sw.js'),
	  filename: '../sw.js',
    publicPath: '/js/'
	}),
]
if (IS_PRODUCTION){
	plugins.push(new webpack.optimize.UglifyJsPlugin())
} else {
	plugins.push(new webpack.HotModuleReplacementPlugin())
	plugins.push(new webpack.NoErrorsPlugin())
}

if (!IS_PRODUCTION)
	var devtool = 'cheap-module-source-map'

const webpackConfig = {
  devtool: devtool,
  entry: entry,
  output: {
    path: path.join(__dirname, 'docs/js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/, 
        loader: 'babel',
        exclude: /(node_modules|bower_components|redux-actions|redux-async-props|draft-js-editor|cms-controls)/,
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.gif$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      // Needed for the css-loader for bootstrap.css
      // loads bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
    ],
  },
  resolve: {
    root: path.join(process.cwd(), 'node_modules'),
  },
  resolveLoader: {
    root: path.join(process.cwd(), 'node_modules'),
  },
}

module.exports = webpackConfig
