// tslint:disable
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports =
{
    entry:
    {
        vue:
        [
            "vue",
            "vue-router",
            "vuex"
        ]
    },
    output:
    {
        path: path.join(__dirname, "public/static/vendor"),
        filename: "[name].dll.js",
        library: "[name]_[hash]" // vendor.dll.js中暴露出的全局变量名
    },
    plugins:
    [
        // 清除之前的dll文件
        new CleanWebpackPlugin(["*.*"], {
            root: path.join(__dirname, "public/static/vendor")
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, "public/static/vendor", "[name]-manifest.json"),
            name: "[name]_[hash]",
            context: process.cwd()
        })
    ]
};
