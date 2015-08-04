
var webpack = require('webpack');

module.exports = {
    entry: ['main'],
    output: {
        path: __dirname + '/build/js',
        publicPath: '/js/',
        filename: 'main.js',
        chunkFilename: 'chunks/[name].[chunkhash].js',
        pathinfo: true,
    },
    resolve: {
        root: process.cwd(),
        modulesDirectories: ['node_modules', 'bower_components', 'css', 'js', 'templates'],
        extensions: ['', '.js', '.styl', '.html'],
    },
    stylus: {
        use: [(require('nib')())],
        import: [__dirname + '/css/includes/*']
    },
    module: {
        loaders: [
            {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
            {test: /\.css$/,  loader: 'style-loader!css-loader'},
            {test: /\.png$/,  loader: 'url-loader?limit=100000&mimetype=image/png'},
            {test: /\.jpg$/,  loader: 'file-loader'},
            {test: /\.html/,  loader: 'ractive'},
            {test: /\.json/,  loader: 'json'},
        ],
        postLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // do not lint third-party code
                loader: 'jshint-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin()
    ],
    jshint: {
        asi: true
    },
    debug: true,
    production: false,
    devtool: "eval",
    devServer: {
        contentBase: './build',
        colors: true,
        inline: true,
    }
}
