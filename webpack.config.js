var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    "home": [ "./src/home", 'webpack-hot-middleware/client' ],
    "movie-effects": [ "./src/movie-effects", 'webpack-hot-middleware/client' ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]/[name].bundle.js',
    publicPath: '/assets/'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015'] }
      },
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        loader:'file?name=images/[name].[ext]'
      }
    ]
  },
  sassLoader: {
    inlcudePaths: [path.join(__dirname, 'src', 'styles')]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 version', 'ie >= 9']
    }),
    mqpacker()
  ],
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'home/index.html',
      template: 'src/home/index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      filename: 'movie-effects/index.html',
      template: 'src/movie-effects/index.html',
      chunks: ['movie-effects']
    }),
    new ExtractTextPlugin("[name]/[name].css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
}
