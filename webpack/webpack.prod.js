
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")


module.exports = merge(common, {
    mode: "production",
    plugins: [
        new UglifyjsWebpackPlugin({
            sourceMap: true
        }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    }
})



