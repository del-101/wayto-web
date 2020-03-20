// tslint:disable
const path = require("path");
const webpack = require("webpack");

module.exports =
{
    entry:
    {
        
        uxmid:
        [
            "uxmid-core"
        ],
        vendor:
        [
            "./src/vendor.ts"
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
        new webpack.DllReferencePlugin
        ({
            context: process.cwd(),
            manifest: require("./public/static/vendor/vue-manifest.json")
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, "public/static/vendor", "[name]-manifest.json"),
            name: "[name]_[hash]",
            context: process.cwd()
        })
    ]
};
