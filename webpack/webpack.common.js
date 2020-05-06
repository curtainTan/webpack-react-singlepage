const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const devMode = process.env.NODE_ENV !== "production"
const miniCssExtractPlugin = require("mini-css-extract-plugin")


module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "js/bundle.js",
        path: path.resolve( "./dist" )
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                // exclude: /node_modules/,
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
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? "style-loader" : {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode
                        }
                    },
                    "css-loader",
                    {
                        loader: "postcss-loader"
                    },
                    "less-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? "style-loader" : {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode
                        }
                    },
                    "css-loader",
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[path][name].[ext]",
                            limit: 1024 * 40,
                            // fallback: "file-loader"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./static/index.html"
        }),
        new miniCssExtractPlugin({
            filename: devMode ? "css/[name].css" : "css/[name]_[hash:5].css",
            chunkFilename: devMode ? "css/[id].css" : "css/[id]_[hash:5].css"
        })
    ],
    resolve: {
        // 省略后缀
        extensions: [ ".js", ".jsx", "json" ],
        // import 省略路径
        alias: {
            "@components": path.resolve( "./src/components" )
        }
    }
}



