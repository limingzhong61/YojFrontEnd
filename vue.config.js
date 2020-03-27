// vue.config.js
const webpack = require("webpack");
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    //这样能产生本地能直接访问的dist，但是服务器使用会出问题
    // publicPath: process.env.NODE_ENV === 'production' ?
    //     './' :
    //     '/',
    // assetsDir: process.env.NODE_ENV === 'production' ?
    //     './' :
    //     '/',
    devServer: {
        host: "localhost",
        port: 8081,
        // hot: true,
        open: true,
        //cancel vue proxy because use nginx proxy
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                ws: true,
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': ''
                // }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                // Popper: ["popper.js", "default"]
            })
        ]
    },
    chainWebpack: (config) => {
        /* 添加分析工具*/
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end();
                config.plugins.delete('prefetch')
            }
        } else {
        }
    },
    //关闭eslint代码规范
    // lintOnSave: false
}