'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_MODULES = /node_modules/;

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.less', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: NODE_MODULES,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": ["@babel/preset-env", "@babel/preset-react"],
                            "plugins": [
                                [
                                    "@babel/plugin-proposal-decorators",
                                    {
                                        "legacy": true
                                    }
                                ],
                                [
                                    "@babel/plugin-proposal-class-properties",
                                    {
                                        "loose": true
                                    }
                                ],
                                [
                                    "babel-plugin-import",
                                    {
                                        "libraryName": "antd",
                                        "libraryDirectory": "lib",   // default: lib
                                        "style": true
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(c|le)ss$/,
                include: NODE_MODULES,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(c|le)ss$/,
                exclude: NODE_MODULES,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/, //图片文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
        ]
    },

    plugins: [

        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/public/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),

        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css",
        }),

        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: require('./webpack.proxy'),
    devtool: 'sourcemap',
    mode: 'development'   //production, development
}