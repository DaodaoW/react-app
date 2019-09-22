const path = require('path');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.js');

module.exports = merge(webpackBase, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../public'),
    port: 3000,
    quiet: true,
    compress: true,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 使用babel-loader进行转义
        use: ['babel-loader'],
        // 设置目标文件
        include: path.join(__dirname, '../src'),
        // 设置排除文件
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: { // options、query不能和loader数组一起使用
            cacheDirectory: true // 利用缓存，提高性能，babel is slow
          },
        }],
        include: path.resolve(__dirname, 'src'),
      },
    ]
  }
});
