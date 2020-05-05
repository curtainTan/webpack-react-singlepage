
const path = require("path")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const DLLReferencePlugin = require("webpack/lib/DllReferencePlugin")
const AddAssetHTMLWebpackPlugin = require("add-asset-html-webpack-plugin")


module.exports = merge(common, {
    mode: "production",
    plugins: [
        new UglifyjsWebpackPlugin({
            sourceMap: true
        }),
        new CleanWebpackPlugin(),
        new DLLReferencePlugin({
            manifest: path.resolve( __dirname, "../dll/react.manifest.json" )
        }),
        new AddAssetHTMLWebpackPlugin({
            filepath: path.resolve( __dirname, "../dll", "react.dll.js" )
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: "all"
        }
    }
})



