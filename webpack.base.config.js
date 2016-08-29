var path = require('path')

const webpackConfig = {
  entry: [
    path.join(__dirname, 'src/app.js'),
  ],
  output: {
    path: path.resolve(__dirname, "dist", "public"),
    publicPath: "http://localhost:8080/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV == 'production' ? '"production"' : '"development"',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/, 
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
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
    extensions: [ '', '.js', '.jsx' ],
    fallback: path.join(__dirname, "node_modules")
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  }
}

module.exports = webpackConfig