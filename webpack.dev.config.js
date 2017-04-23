/* eslint-disable import/no-extraneous-dependencies */

const WebpackConfig = require('webpack-config').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = './webpack.base.config.js';

module.exports = new WebpackConfig()
  .extend(base)
  .merge({
    plugins: [new HtmlWebpackPlugin({ template: 'dev/index.html' })],
  });
