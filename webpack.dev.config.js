/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const WebpackConfig = require('webpack-config').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = path.resolve(__dirname, './webpack.base.config.js');

module.exports = new WebpackConfig()
  .extend(base)
  .merge({
    plugins: [new HtmlWebpackPlugin({ template: 'dev/index.html' })],
  });
