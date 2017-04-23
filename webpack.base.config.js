/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackConfig = require('webpack-config').default;
const webpack = require('webpack');

module.exports = new WebpackConfig().merge({
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'temp'),
    filename: 'app.js',
    library: 'App',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['transform-thea-jsx'],
          presets: ['env'],
        },
      },
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
            use: ['postcss-loader'],
          },
        },
      }),
    }],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
  },
});
