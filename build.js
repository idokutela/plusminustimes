/* eslint-disable import/no-extraneous-dependencies, no-console */
const path = require('path');
const del = require('del');
const webpack = require('webpack');

const config = require('./webpack.config.js');

const writePage = require('./build/writePage');

const dir = path.join(__dirname, 'docs');

del(dir)
  .then(() => new Promise((res, rej) => {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        rej(err || new Error(`Error in build. ${stats.toJson().errors}`));
      }
      res();
    });
  }))
  .then(() => writePage(dir))
  .then(() => console.log('Build success.'))
  .catch((e) => {
    console.error(`Build error.

${e}`);
    process.exit(1);
  });
