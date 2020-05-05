
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")


module.exports = merge(common, {
    mode: "production",
    plugins: [
        new UglifyjsWebpackPlugin({
            sourceMap: true
        }),
        new CleanWebpackPlugin()
    ]
})



