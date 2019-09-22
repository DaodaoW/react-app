const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
	entry: {
		polyfill: '@babel/polyfill',
		main: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/index.[hash:7].js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']// use从右往左写  
			},
			// 解析less  
			{
				test: /\.less$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				loader: 'url-loader',
				options:{
					limit: 8192,
					publicPath: '../',
					name:'image/[name].[hash:7].[ext]'
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
			template: path.resolve(__dirname, '../public/index.html'),
			filename: 'index.html',
			favicon: path.resolve(__dirname, '../src/favicon.ico'),
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