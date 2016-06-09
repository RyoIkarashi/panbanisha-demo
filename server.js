const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// Home
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'dist', 'home', 'index.html'));
});

// Demo for Movie Effects
app.get('/movie-effects', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'dist', 'movie-effects', 'index.html'));
});

app.listen(4000, 'localhost', (err) => {
  if(err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:4000');
});
