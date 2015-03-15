
var webpack = require("webpack");

module.exports = {
    entry: ["main"],
    output: {
        path: __dirname + "/build/js",
        filename: "main.js?[hash]",
        chunkFilename: "[hash]/js/[id].js",
    },
    resolve: {
        modulesDirectories: ["node_modules", "bower_components", "css", "js"]
    },
    module: {
        loaders: [
            {test:/\.styl$/, loader:'style-loader!css-loader!stylus-loader'},
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png"},
            {test: /\.jpg$/, loader: "file-loader"}
        ],
        resolve: {
            extensions: ['', '.js', '.styl']
        }
    },
    plugins: [
        new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"]))
    ]
}
