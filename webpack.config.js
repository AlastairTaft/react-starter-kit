var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: process.env.NODE_ENV == 'production' ? undefined : 'cheap-module-source-map',
  entry: process.env.NODE_ENV == 'production' ? [
    './src/index',
  ] : [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'docs', 'js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: process.env.NODE_ENV == 'production' ? [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({ 
      'process.env.NODE_ENV': '"production"',
    }),
  ] : [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.gif$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { 
        test: /\.css$/, 
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ],
    modules: [
      path.join(__dirname, "node_modules")
    ]
  },
};
