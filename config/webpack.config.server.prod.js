'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = {
    // Don't attempt to continue if there are any errors.
    bail: true,
    //针对 Node.js，使用 require 语句加载 Chunk 代码
    target: 'node',
    entry: [paths.appServerIndexJs],
    devtool: 'source-map',
    resolve: {
        modules: ['node_modules', paths.appNodeModules].concat(
            // It is guaranteed to exist because we tweak it in `env.js`
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
        alias: Object.assign(paths.aliasConfig, { 'webpack/hot/poll': require.resolve('webpack/hot/poll') }),
    },
    output: {
        path: paths.appBuild,
        filename: 'server.js',
        publicPath: ''//本地host
    },
    //通过 externals 可以告诉 Webpack JavaScript 运行环境已经内置了那些全局变量，
    //针对这些全局变量不用打包进代码中而是直接使用全局变量。
    externals: [
        nodeExternals({
            whitelist: [
                /\.(eot|woff|woff2|ttf|otf)$/,
                /\.(svg|png|jpg|jpeg|gif|ico)$/,
                /\.(mp4|mp3|ogg|swf|webp)$/,
                /\.(css|scss|sass|sss|less)$/,
            ].filter(x => x),
        }),
    ],
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
                        //服务端下的jsx也需要babel转换
                        include: [paths.appSrc, paths.appServerIndexJs],
                        loader: require.resolve('babel-loader'),
                        options: {
                            presets: [
                                ["env", {
                                    "targets": {
                                        "node": "current"
                                    }
                                }]
                            ]
                        },
                    },
                    // "postcss" loader applies autoprefixer to our CSS.
                    // "css" loader resolves paths in CSS and adds assets as dependencies.
                    // "style" loader turns CSS into JS modules that inject <style> tags.
                    // In production, we use a plugin to extract that CSS to a file, but
                    // in development "style" loader enables hot editing of CSS.
                    /*{
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
                    },*/
                    // sass-loader
                    {
                        test: /\.scss$/,
                        use: [
                            // style-loader cannot be used in a non-browser environment
                            // require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 2,
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    // Necessary for external CSS imports to work
                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 0 versions',
                                                'Firefox ESR',
                                                'not ie < 9', // React doesn't support IE8 anyway
                                            ]
                                        }),
                                    ],
                                },
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    includePaths: ["src/"]
                                }
                            }
                        ]
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
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         // Disabled because of an issue with Uglify breaking seemingly valid code:
        //         // https://github.com/facebookincubator/create-react-app/issues/2376
        //         // Pending further investigation:
        //         // https://github.com/mishoo/UglifyJS2/issues/2011
        //         comparisons: false,
        //     },
        //     mangle: {
        //         safari10: true,
        //     },
        //     output: {
        //         comments: false,
        //         // Turned on because emoji and regex is not minified properly using default
        //         // https://github.com/facebookincubator/create-react-app/issues/2488
        //         ascii_only: true,
        //     },
        //     sourceMap: shouldUseSourceMap,
        // }),
        // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
        // new ExtractTextPlugin({
        //     filename: cssFilename,
        // }),
        //把替换了的模块的名称输出出来
        new webpack.NamedModulesPlugin(),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
        new webpack.DefinePlugin(env.stringified),
        // Prevent creating multiple chunks for the server
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ]
}