const path = require('path');
const webpack = require('webpack');
const json = require('./package.json');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'development',
	entry: './src/client/index.js',
	output: {
		libraryTarget: 'var',
		library: 'Client'
	},
	module: {
		rules: [
			{
				test: '/\.js$/',
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				type: 'javascript/auto',
				test: '/\.json$/',
        		loader: 'json-loader'
			},
			{
	        	test: /\.scss$/,
	       		use: [ 'style-loader', MediaQueryPlugin.loader, 'css-loader', 'sass-loader' ]
			},
			{
	          test: /\.(png|svg|jpg|gif)$/,
	          use: [
	            'file-loader',
	          ],
	        },
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/client/views/index.html",
			filename: "./index.html",
		}),
	        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
   		}),
	        new MediaQueryPlugin({
            include: [
                'example'
            ],
            queries: {
                'print, screen and (min-width: 75em)': 'desktop'
            }
        }),
	        //new BundleAnalyzerPlugin(),
	]
	//output: { ...output options }
}