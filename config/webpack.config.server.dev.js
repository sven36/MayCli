'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

module.exports = {
    //针对 Node.js，使用 require 语句加载 Chunk 代码
    target: 'node',
    watch: true,
    entry: ['webpack/hot/poll?300', paths.appServerIndexJs],
    devtool: 'cheap-module-source-map',
    alias: paths.aliasConfig,
    output: {
        path: paths.appBuild,
        filename: 'server.js',
        publicPath: ''//本地host
    },
    //通过 externals 可以告诉 Webpack JavaScript 运行环境已经内置了那些全局变量，
    //针对这些全局变量不用打包进代码中而是直接使用全局变量。
    externals: ['webpack/hot/poll?300'],
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: eslintFormatter,
                            eslintPath: require.resolve('eslint'),
                            // @remove-on-eject-begin
                            baseConfig: {
                                extends: [require.resolve('eslint-config-react-app')],
                            },
                            ignore: false,
                            useEslintrc: false,
                            // @remove-on-eject-end
                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: paths.appSrc,
            },
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                    // "url" loader works like "file" loader except that it embeds assets
                    // smaller than specified limit in bytes as data URLs to avoid requests.
                    // A missing `test` is equivalent to a match.
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    // Process JS with Babel.
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            // @remove-on-eject-begin
                            // babelrc: false,
                            // presets: [require.resolve('babel-preset-react-app')],
                            // @remove-on-eject-end
                            // This is a feature of `babel-loader` for webpack (not Babel itself).
                            // It enables caching results in ./node_modules/.cache/babel-loader/
                            // directory for faster rebuilds.
                            cacheDirectory: true,
                        },
                    },
                    // "postcss" loader applies autoprefixer to our CSS.
                    // "css" loader resolves paths in CSS and adds assets as dependencies.
                    // "style" loader turns CSS into JS modules that inject <style> tags.
                    // In production, we use a plugin to extract that CSS to a file, but
                    // in development "style" loader enables hot editing of CSS.
                    {
                        test: /\.css$/,
                        exclude: [paths.appBuild, /\.module\.css$/],
                        //style-loader在node环境下是不起作用的
                        //不过我们只需要css-loader就够了
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                },
                            }
                        ],
                    },
                    {
                        test: /\.module\.css$/,
                        exclude: [paths.appBuild],
                        use: [
                            {
                                loader: require.resolve('css-loader/locals'),
                                options: {
                                    modules: true,
                                    importLoaders: 1,
                                    localIdentName: '[path]__[name]___[local]',
                                },
                            }
                        ],
                    },
                    {
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.(less)$/, /\.(re)$/, /\.(s?css|sass)$/,],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        //把替换了的模块的名称输出出来
        new webpack.NamedModulesPlugin(),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
        new webpack.DefinePlugin(env.stringified),
        // Prevent creating multiple chunks for the server
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        // Add hot module replacement
        new webpack.HotModuleReplacementPlugin(),
        // Ignore assets.json to avoid infinite recompile bug
        new webpack.WatchIgnorePlugin([paths.appManifest]),
    ]
}