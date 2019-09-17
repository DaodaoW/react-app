const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const config = require('../config/webpack.dev.js');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
	entry: {
		polyfill: '@babel/polyfill',
		main: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/index.[hash:7].js'
	},
	module: {
		rules: [
			{
				//匹配js或jsx类型文件
				test:/\.js$/,
				//使用babel-loader进行转义
				use:['babel-loader'],
				//设置目标文件
				include:path.resolve(__dirname,'../src'),
				//设置排除文件
				exclude:path.resolve(__dirname,'../node_modules')
			},
			{
				test: /\.(less|css)$/,
				use: [
					{ 
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../dist'
						}
					},
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				loader: 'url-loader',
				options:{
					limit: 8192,
					outputPath:'/',
					name:'img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/,
				loader: 'file-loader',
				options:{
					name:'font/[name].[hash:7].[ext]'
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].[hash:7].css",
			chunkFilename: "[id].css"
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new CopyPlugin([
	    { from: 'public', to: '../dist', ignore: ['*.html'] },
		]),
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: ['You can now view \033[1m Your App\033[0m in the browser \033[1mhttp://localhost:3000/\033[0m'],
				notes: ['To create a production build, use\033[40;34m npm run build.\033[0m']
			},
			onErrors: function(severity, errors) {},
			clearConsole: true
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
		alias: {
			'@': path.resolve(__dirname, '../src')
		}
	}
}