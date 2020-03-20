const path = require("path");
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const resolve = function(dir)
{
    return path.join(__dirname, dir)
};

const isProd = process.env.NODE_ENV === "production";

module.exports =
{
    publicPath: isProd ? (process.env.OSS_DOMAIN + process.env.npm_package_name + "/") : "/",
    productionSourceMap: false,
    configureWebpack: config =>
    {

        if (process.env.NODE_ENV === "production")
        {
            const WebpackAliyunOssPlugin = require("webpack-aliyun-oss-plugin");

            // 为生产环境修改配置...
            config.plugins.push
            (
                new WebpackAliyunOssPlugin({
                    ak: process.env.OSS_AK,
                    sk: process.env.OSS_SK,
                    bucket: process.env.OSS_BUCKET,
                    region: process.env.OSS_REGION, // bucket所在区域的接入点
                    filter: function (asset) {
                        return !/\.html|config\.js$/.test(asset);
                    }
                })
            )
        }

        // 添加dll Mainfest。
        config.plugins.push
        (
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require("./public/static/vendor/vue-manifest.json")
            })
        );

        config.plugins.push
        (
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require("./public/static/vendor/uxmid-manifest.json")
            })
        );

        config.plugins.push
        (
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require("./public/static/vendor/vendor-manifest.json")
            })
        );

        // 将 dll 注入到 生成的 html 模板中
        config.plugins.push
        (
            new AddAssetHtmlPlugin({
                // dll文件位置
                filepath: resolve("public/static/vendor/*.js"),
                // dll 引用路径
                publicPath: isProd ? (process.env.OSS_DOMAIN + process.env.npm_package_name + "/static/vendor") : "/static/vendor",
                // dll最终输出的目录
                outputPath: "/static/vendor"
            })
        );
    },
    chainWebpack: config =>
    {
        // 设置路径别名。
        config.resolve.alias
            .set("vue$", "vue/dist/vue.esm.js")
            .set("src", resolve("src"))
            .set("apis", resolve("src/apis"),           )
            .set("application", resolve("src/application"))
            .set("assets", resolve("src/assets"))
            .set("common", resolve("src/common"))
            .set("config", resolve("src/common/config"))
            .set("enums", resolve("src/common/enums"))
            .set("filters", resolve("src/common/filters"))
            .set("layouts", resolve("src/common/layouts"))
            .set("mixins", resolve("src/common/mixins"))
            .set("utils", resolve("src/common/utils"))
            .set("components", resolve("src/components"))
            .set("models", resolve("src/models"))
            .set("services", resolve("src/services"))
            .set("routes", resolve("src/routes"))
            .set("store", resolve("src/store"))
            .set("views", resolve("src/views"))
            .set("styles", resolve("src/styles"));

        // 添加ts检测范围。
        config.plugin("fork-ts-checker").tap(options =>
        {
            return [{
                ...options[0],
                reportFiles: ["src/**/*.{ts,tsx,vue}"]
            }]
        });

        // 添加cur文件的loader处理。
        config.module
            .rule("cur")
            .test(/\.cur$/)
            .use("url-loader")
                .loader("url-loader")
                .end();
    },
    pluginOptions:
    {
        // 配置less全局变量。
        "style-resources-loader":
        {
            preProcessor: "less",
            patterns:
            [
                path.resolve(__dirname, "src/styles/base/variables.less"),
                path.resolve(__dirname, "src/styles/base/mixins.less")
            ]
        }
    },
    devServer:
    {
        port: 8080
    }
};
