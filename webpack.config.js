// file : /webpack.config.js

const path = require('path');
const WebpackConfig = require('webpack-config').default;

const TARGET = process.env.npm_lifecycle_event;

let webpackConfig;

switch (TARGET) {
  case 'watch':
    webpackConfig = path.resolve(__dirname, 'webpack.dev.config.js');
    break;
  default:
    webpackConfig = path.resolve(__dirname, 'webpack.production.config.js');
    break;
}

module.exports = new WebpackConfig().extend(webpackConfig);
