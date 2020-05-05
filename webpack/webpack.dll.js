
const path = require("path")
const DLLPlugin = require("webpack/lib/DllPlugin")


module.exports = {
    mode: "production",
    entry: {
        // 动态链接库的入口
        react: [ "react", "react-dom" ]
    },
    output: {
        // 输出动态链接库的名字
        filename: "[name].dll.js",
        path: path.resolve( __dirname, "../dll" ),
        library: "[name]"
    },
    plugins: [
        new DLLPlugin({
            // 动态链接库的全局变量名称 与 output.library 保持一致
            name: "[name]",
            // manifest.json
            path: path.resolve( __dirname, "../dll/[name].manifest.json" )
        })
    ]
}

