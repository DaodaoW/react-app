const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBase = require('./webpack.base.js');

module.exports = merge(webpackBase, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin()
  ]
});
