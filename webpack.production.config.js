/* eslint-disable import/no-extraneous-dependencies */

const WebpackConfig = require('webpack-config').default;
const webpack = require('webpack');
const path = require('path');

const Uglify = webpack.optimize.UglifyJsPlugin;
const Order = webpack.optimize.OccurrenceOrderPlugin;

const base = './webpack.base.config.js';

module.exports = new WebpackConfig()
  .extend(base)
  .merge({
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'app.js',
      library: 'App',
      libraryTarget: 'umd',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new Uglify(),
      new Order(),
    ],
  });
