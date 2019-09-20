const path = require('path');
const webpackBase = require('./webpack.base.js');
const merge = require('webpack-merge');
module.exports = merge(webpackBase, {
	mode: 'development',
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, '../public'),
		port: 3000,
		quiet: true,
		compress: true,
		overlay: true
	}
})