
var webpack = require('webpack');

module.exports = {
    entry: ['main'],
    output: {
        path: __dirname + '/build/js',
        publicPath: '/js/',
        filename: 'main.js?[hash]',
        chunkFilename: 'chunks/[name].js?[hash]',
    },
    resolve: {
        root: process.cwd(),
        modulesDirectories: ['node_modules', 'bower_components', 'css', 'js', 'templates'],
        extensions: ['', '.js', '.styl', '.html']
    },
    module: {
        loaders: [
            {test: /\.styl$/, loader:'style-loader!css-loader!stylus-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png'},
            {test: /\.jpg$/, loader: 'file-loader'},
            {test: /\.html/, loader: 'raw-loader'}
        ],
    },
    plugins: [
        new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main']))
    ]
}
