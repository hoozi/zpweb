const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash].js'
    },
    module: {
        unknownContextCritical : false,
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname,"./node_modules"),
                include: path.resolve(__dirname, "./src"),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [
                            'babel-plugin-transform-class-properties',
                            'transform-async-to-generator',
                            'transform-regenerator',
                            'transform-decorators-legacy', 
                            'dynamic-import-webpack',
                            'transform-object-rest-spread'
                        ]
                    }
                }
            },
            {
                test: /\.ejs$/,
                exclude: path.resolve(__dirname,"./node_modules"),
                include: path.resolve(__dirname, "./src"),
                use: {
                    loader: 'ejs-loader'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|gif)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.css$/,
                //include: path.resolve(__dirname, "./src"),
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                })
            }
        ]
    },
    resolve: {
        alias: {
            'jquery': path.resolve(__dirname, './node_modules/jquery'),
            'backbone': path.resolve(__dirname, './node_modules/backbone'),
            'bootstrap': path.resolve(__dirname, './node_modules/bootstrap'),
            'underscore': path.resolve(__dirname, './node_modules/underscore')
        },
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src')
        ],
        extensions: [
            '.js',
            '.json',
            '.ejs',
            '.css'
        ],
    },
    optimization: {
        splitChunks: {
            minChunks: 3
        }
    },
    devServer: {
        proxy: {
            '/mall-portal': {
              target: "http://www.yibutong.com.cn", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
              //pathRewrite: { '': '' }, // 把 URL 中 path 部分的 `api` 移除掉
            }
        },
        open : true
    },
    plugins: [
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            '_': 'underscore',
            '$': 'jquery'
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            minify: { collapseWhitespace :true},
            template: path.resolve(__dirname, './src/index.html')
        }),
        new ExtractTextWebpackPlugin("style.[hash].css"),
    ]
}