const path = require('path');
const webpackBase = require('./webpack.base.js');
const merge = require('webpack-merge');
module.exports = merge(webpackBase,{
	mode: 'development',
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, '../dist'),
		port: 3000
	}
})