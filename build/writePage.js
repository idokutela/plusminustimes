const p = require('promisify-node');
const path = require('path');
const CleanCss = require('clean-css');
const del = require('del');
const htmlMinifiy = require('html-minifier').minify;

const fs = p('fs');

/* eslint-disable global-require, import/no-dynamic-require */
module.exports = (outdir, js = 'app.js', css = 'app.css') => {
  const GameContainer = require(path.join(outdir, js)).default;

  return fs.readFile(path.join(outdir, css), 'utf8')
    .then((styles) => {
      const clean = new CleanCss();
      return clean.minify(styles).styles;
    })
    .then(styles => `
        <!doctype html>
          <html class="no-js" lang="">
            <head>
              <meta charset="utf-8">
              <meta http-equiv="x-ua-compatible" content="ie=edge">
              <title>ToDo in Thea</title>
              <meta name="description" content="">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>${styles}</style>
            </head>
            <body>
              ${GameContainer().toString()}
              <div class="loading-message">
                <span>One moment while the script loads…</span>
              </div>
              <script type="text/javascript">
                document.body.parentNode.removeAttribute('class');
                function a() {
                  document.body.parentNode.setAttribute('class', 'loading');
                }
                document.body.addEventListener('click', a, true);
                document.body.addEventListener('focus', a, true);
              </script>
              <script type="text/javascript" src="${js}"></script>
            </body>
          </html>
        `)
    .then(file => htmlMinifiy(file, {
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      minifyCSS: true,
    }))
    .then(file => fs.writeFile(path.join(outdir, 'index.html'), file, 'utf8'))
    .then(() => del(path.join(outdir, css)));
};
