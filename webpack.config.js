
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
        root: path.join(__dirname, '/src'),
        modulesDirectories: ['node_modules', 'css', 'js', 'templates'],
        extensions: ['', '.js', '.styl', '.html'],
    },

    stylus: {
        use: [(require('nib')())],
        import: [__dirname + '/css/includes/*']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|lib|parsers|syntax)/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            },
            {test: /\.styl$/, loader: 'style!css!stylus-loader'},
            {test: /\.css$/,  loader: 'style!css'},
            {test: /\.png$/,  loader: 'url?limit=100000&mimetype=image/png'},
            {test: /\.jpg$/,  loader: 'file'},
            {test: /\.html/,  loader: 'ractive'},
            {test: /\.json/,  loader: 'json'},
            {test: /\.txt/,   loader: 'raw'},
        ]
    },

    plugins: [
        new webpack.optimize.DedupePlugin()
    ],

    eslint: {
        configFile: '.eslintrc'
    },

    debug: true,
    production: false,

    devtool: "cheap-source-map",

    devServer: {
        contentBase: './build',
        colors: true,
        inline: true,
    },

    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
}
