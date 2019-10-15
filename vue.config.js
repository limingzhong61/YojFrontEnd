// vue.config.js
const webpack = require("webpack");
module.exports = {
    devServer: {
        // host: "localhost",
        // port: 8888,
        // hot: true,
        // open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                Popper: ["popper.js", "default"]
            })
        ]
    }
    //关闭eslint代码规范
    // lintOnSave: false
}