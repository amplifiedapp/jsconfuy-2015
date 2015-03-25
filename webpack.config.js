var webpack = require('webpack');

var config = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3000/', // WebpackDevServer host and port
      'webpack/hot/only-dev-server',
      './app/index'
    ]
  },
  output: {
    filename: 'build/[name].js',
    path: __dirname,
    publicPath: '/' // Required for webpack-dev-server
  },
  resolve: {
    root: __dirname,
    alias: {
      app: __dirname + '/app',
      waveform: __dirname + '/vendor/js/waveform.js'
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: [/node_modules/, /vendor/], loaders: ['react-hot', 'babel?experimental'] }
    ]
  }
};

module.exports = config;
