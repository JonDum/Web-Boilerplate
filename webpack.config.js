var webpack = require('webpack');
var path = require('path');

module.exports = {

	entry: ['js/main'],

	output: {
		path: path.join(__dirname, '/build/js'),
		publicPath: 'js/',
		filename: 'main.js',
		chunkFilename: 'chunks/[name].[chunkhash].js',
		pathinfo: true,
	},

	resolve: {
		modules: [path.join(__dirname, '/src'), 'node_modules', 'css', 'js', 'js/lib', 'templates'],
		extensions: ['.js', '.styl', '.html'],
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|lib)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [['es2015', {
								modules: false
							}]]
						}
					}
				]
            },
			{
				test: /\.styl$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'stylus-loader', options: { use: [(require('nib')())], import: [__dirname + '/css/includes/*'] } }
				],
			},
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.png$/, use: ['url-loader?limit=100000&mimetype=image/png'] },
			{ test: /\.jpg$/, use: ['file-loader'] },
			{ test: /\.html/, use: ['ractive-loader'] },
			{ test: /\.txt/, use: ['raw-loader'] },
        ]
	},

	plugins: [
		new webpack.DefinePlugin({
			DEBUG: true,
			PRODUCTION: false
		})
    ],

	devtool: "cheap-source-map",

	devServer: {
		contentBase: './build',
		colors: true,
		inline: true,
	},

}
