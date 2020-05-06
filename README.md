
# webpack-react-singlepage

**脚手架搭建规划：**

1. 项目基本构建
2. 完成 js 的简易打包
3. 集成 react
4. 建立开发环境
5. 资源处理（css 图片）
6. webpack 配置抽离
7. 优化


## 功能

1. css 压缩单独打包
2. DLL 动态引入第三方库
3. 引入图片

## 项目基本构建

**目标：** 完成基本项目搭建

## 完成 js 的简易打包

**目标：** 
1. 完成基本配置文件 webpack.config.js 的编写
2. 配置 package.json 命令行配置
3. 配置 html-webpack-plugin 添加 html 模板
4. 用命令进行 js 的简易打包
 

## 集成 react

**目标：**
1. 完成各个插件的安装
2. 配置 config 文件
3. 完成一个 react 单页应用打包

**过程：**

1. 下载 react 和 react-dom 
```shell
npm install --save-dev react react-dom
```

2. 下载 babel （编译 js， jsx， es6 等）
```shell
npm install --save-dev @babel/cli @babel/core @babel/preset-react @babel/preset-env @babel/plugin-transform-runtime babel-loader
```
3. 配置 babel-loader

webpack.config.js 文件

```js
...
entry: {
  //配置页面入口
  index: ['./src/index.js'],
},
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist')
},
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  targets: {
                    chrome: '58',
                    ie: '8',
                  },
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
      ],
    },
  ],
}
...

```

4. 编写 js 代码完成测试

## 建立开发环境

**目标：**

1. 在 package.json 文件添加 dev 命令脚本
2. 安装 webpack-dev-server 插件
3. 配置 webpack.config.js 文件的 devServer 
4. 测试效果

配置代码：

```js
...
    devServer: {
        // 代码运行的目录
        contentBase: path.resolve( __dirname, "../build" ),
        // 监视目录下的所有文件，一旦文件发生变化就 reload
        watchContentbase: true,
        watchOptions: {
            // 忽略文件目录
            ignored: /node_modules/
        },
        // 开启 gzip 压缩
        compress: true,
        // 端口号
        port: 8080,
        // 自动打开浏览器
        open: true,
        // 开启 HMR 功能
        hmr: true,
        // 不要显示启动服务器日志信息
        clientLogLevel: "none"，
        // 除了一些基本启动信息以外，其他内容不显示
        quiet: true,
        // 如果出错，全屏显示
        overlay: true,
        // 代理服务器，解决开发环境跨域问题
        proxy: {
            // 请求转发
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {
                    // 以 api 开头的请求路径去掉 api 
                    "^/api": ""
                }
            }
        }
    }
...
```

## 资源处理（css 图片）

**目标：**
1. 安装 `style-loader` 和 `css-loader` 插件
2. 配置 `module`
3. 完成基本测试

**第二阶段目标**
1. 配置 `autoprefixer` 和 `postcss-loader` 完成 css 对浏览器的前缀兼容
2. 完成 图片 文件的加载

## resolve 基本配置

配置解析模块的规则

resolve 模块的作用：
1. alias： 映射文件路径，可以简写路径
2. extenss：自动匹配文件后缀名
3. modules：配置 webpack 去哪些目录下寻找第三方模块

## webpack 配置抽离

**目标：**

1. 抽离 开发环境 和 生产环境 的打包
2. 配置 package.json 脚本命令

**配置过程**

1. 安装 `webpack-merge` 插件
2. 安装 `cross-env` 配置 NODE_env 环境变量，根据不同环境变量，在公共配置里面，打不同的包
3. 拆分 配置 文件


## 配置 DLL 动态链接库

**目标：**

1. 抽离第三方库文件，单独打包

**配置过程：**

1. 添加单独的 dll 配置文件，单独打包第三方文件
2. 配置 package.json 脚本命令
3. 配置 webpack.prod.js 文件

1. 创建 dll 配置文件

```js
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
```

2. 配置 webpack.prod.js 文件

```js
...
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
    ]
...
```

**dll 动态链接库的配置步骤** 

1. 第三方库单独打包，配置 DLLPlugin 打包生成 manifest.json 文件
2. 在生产环境下，配置 DLLReferencePlugin 在打包时忽略 manifest 内的文件
3. 配置 AddAssetHTMLWebpackPlugin 提前引入打包好的第三方文件


## 配置 antd

1. 安装 antd
```
yarn add antd
```

2. 安装 babel-plugin-import 完成按需加载

```
yarn add babel-plugin-import --dev
```
3. 配置 .babelrc 文件
```json
{
    "presets":[
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins":[[
        "import",{
            "libraryName":"antd",
            "libraryDirectory":"es",
            "style":"css"
        }]
    ]
}
```

4. 引入组件即可

```js
// babel-plugin-import 会帮助你加载 JS 和 CSS
import { Button } from 'antd';
```

## 配置 react-router 和 redux


## 后记

认认真真做好每一件事


## 参考

[MisLab-React-Cli-SinglePage](https://github.com/mis-lab/MisLab-React-Cli-SinglePage)

[从零开始的 webpack4 + React 构建](https://juejin.im/post/5ea3ebc9518825738b422f4c)

