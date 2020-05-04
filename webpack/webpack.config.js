
const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve( "./dist" )
    },
    mode: "development",
    plugins: [
        new HTMLWebpackPlugin({
            template: "./static/index.html"
        })
    ]
}



