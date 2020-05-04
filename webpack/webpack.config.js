
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
    ],
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: "/src",
        hot: true,
        open: true
    }
}



