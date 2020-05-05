
const path = require("path")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const DLLReferencePlugin = require("webpack/lib/DllReferencePlugin")
const AddAssetHTMLWebpackPlugin = require("add-asset-html-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

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
        // 引入资源
        new AddAssetHTMLWebpackPlugin({
            filepath: path.resolve( __dirname, "../dll", "react.dll.js" )
        }),
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ],
        // 代码分割
        splitChunks: {
            // 对入口文件 和 异步导入 文件都进行处理
            chunks: "all",
            minSize: 30 * 1024,
            // 医用次数达到 1 ，进行代码分割
            minChunks: 1,
            // 入口文件请求的 chunks 不超过 3 个
            maxInitialRequests: 3,
            // 同时最多加载 5 个请求，异步请求的 chunk 不超过 5 个
            maxAsyncRequests: 5
        }
    }
})



