const fs = require('fs');
const path = require('path');
//const ManifestPlugin = require('webpack-manifest-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const safePostCssParser = require('postcss-safe-parser');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const postcssNormalize = require('postcss-normalize');

//const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const { argv } = require('process');

//220525
if (!process.env.BACKEND_ENV) {
    process.env.BACKEND_ENV = {};
}


const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const cssBootstrapRegex = /\.bootstrap\.css$/;
const sassBootstrapRegex = /\.bootstrap\.scss$/;
const cssAnyRegex = /\.(css|.module\.css$)$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const backEndPath = fs.realpathSync(process.cwd());
const razorRootPath = path.resolve(__dirname, '../');
const frontEndPath = path.resolve(razorRootPath, './FrontEnd');
//220512
const frontEndSrc = path.resolve(frontEndPath, './src');
var isDebug = true;
//230217 VERY IMPORTANT: APPEND SLASH TO PUBLIC_PATH
var publicPath = 'appdist/';
var idxMode = process.argv.indexOf('--mode');
var webPackMode = (idxMode !== undefined && idxMode >= 0) ? process.argv[idxMode + 1] : 'undefined';
var isWebpackProduction = (webPackMode && webPackMode === 'production') ? true : false;

if (isWebpackProduction === true) {
    //publicPath = 'build';
}

const hasJsxRuntime = (() => {
    if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
        return false;
    }

    try {
        require.resolve('react/jsx-runtime');
        return true;
    } catch (e) {
        return false;
    }
})();
//var webPackMode = (argv && argv.mode) ? argv.mode : "undefined";

console.log('CADBauWeb BackEnd webpack mode is', webPackMode, 'idxMode', idxMode, "\n", 'process.env.BACKEND_ENV', process.env.BACKEND_ENV, 'process.argv', process.argv, "\n");
console.log('backEndPath is', backEndPath, "\n",
    'razorRootPath', razorRootPath, "\n",
    'frontEndPath', frontEndPath, "\n",
    'frontEndSrc', frontEndSrc);
//require('./../razor.index.js');
//require('./postcss.config.js');

if (!process.env.NODE_ENV && !process.env.BABEL_ENV) { //=== 'production' ? 'production' : 'development',)
    process.env.BABEL_ENV = (isWebpackProduction) ? 'production' : 'development';
}
/*
const getStyleLoaders = (cssOptions, preProcessor) => {
    var isEnvDevelopment = false;
    var isEnvProduction = true;
    const loaders = [
        isEnvDevelopment && require.resolve('style-loader'),
        isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            // css is located in `static/css`, use '../../' to locate index.html folder
            // in production `paths.publicUrlOrPath` can be a relative path
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009',
                        },
                        stage: 3,
                    }),
                    // Adds PostCSS Normalize as the reset css with default options,
                    // so that it honors browserslist config in package.json
                    // which in turn let's users customize the target behavior as per their needs.
                    postcssNormalize(),
                ],
                sourceMap: isWebpackProduction ? false : true,//isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
            },
        },
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push(
            {
                loader: require.resolve('resolve-url-loader'),
                options: {
                    sourceMap: isWebpackProduction ? false : true,//isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
                    root: frontEndPath,//paths.appSrc,
                },
            },
            {
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: isWebpackProduction ? false : true,
                },
            }
        );
    }
    console.log('getStyleLoaders for cssOptions', cssOptions, ',preProcessor ', preProcessor, ' returns loaders', loaders);
    return loaders;
};
*/
function getSplitChunks(isDevelopment) {
    if (typeof (isDevelopment) === undefined) {
        isDevelopment = true;
    }
    return {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'vendor',
                chunks: 'all',
            },
        },
        name: isDevelopment,//false,
    };

    if (isDevelopment) {
        return {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
            name: isDevelopment,//false,
        };
    }
    return {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'vendor',
                chunks: 'all',
            },
        },
        chunks: 'all',
        name: isDevelopment,//false,//isEnvDevelopment,
    };
}

module.exports = {

    //entry: './Content/components/expose-components.js',
    //entry: './Content/react-index.js',
    //entry: './FrontEnd/react-index.js',
    //entry: './../razor.index.js',
    //entry: path.resolve(__dirname , "./razor.index.js"),
    //entry: './../FrontEnd/react-index.js',
    //before 220512
    //entry: path.resolve(frontEndPath, './react-index.js'),
    entry: path.resolve(frontEndSrc, './backend-index.js'),


    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, './'),
            'node_modules'
        ],
        /*roots: [ path.resolve(__dirname, './') ],*/
        extensions: [".js", ".jsx"]
    },

    output: {
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js',
        globalObject: 'this',
        path: path.resolve(razorRootPath, './wwwroot/appdist'),
        publicPath: publicPath,
        // Prevents conflicts when multiple webpack runtimes (from different apps)
        // are used on the same page.
        //jsonpFunction: `webpackJsonp${appPackageJson.name}`,
        jsonpFunction: 'webpackJsonpRondostreamdotnet',

    },
    //230218
    devtool: "source-map",
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    optimization: {
        minimize: true,//(webPackMode==='production)?true:false,//isEnvProduction,
        minimizer: [
            // This is only used in production mode

            new TerserPlugin({
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minification steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending further investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    // Added for profiling in devtools
                    keep_classnames: true,//isEnvProductionProfile,
                    keep_fnames: true,//isEnvProductionProfile,
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true,
                    },
                },
                sourceMap: isWebpackProduction ? false : true,//true,//shouldUseSourceMap,
            }),

            // This is only used in production mode
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: (isWebpackProduction ? false : true)//true //shouldUseSourceMap
                        ? {
                            // `inline: false` forces the sourcemap to be output into a
                            // separate file
                            inline: false,
                            // `annotation: true` appends the sourceMappingURL to the end of
                            // the css file, helping the browser find the sourcemap
                            annotation: true,
                        }
                        : false,
                },
                cssProcessorPluginOptions: {
                    preset: ['default', { minifyFontValues: { removeQuotes: false } }],
                },
            }),
        ],

        /*
        runtimeChunk: {
            name: 'runtime', // necessary when using multiple entrypoints on the same page
        },
        */
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`,
        },
        splitChunks: getSplitChunks(isWebpackProduction ? false : true),
        /*
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
        */
    },
    module: {
        strictExportPresence: true,
        rules: [
            //230226
            {
                test: /\.worker\.js$/,
                use: { loader: "worker-loader" },
            },
            {
                test: /\.(js|jsx)$/,
                //test: /\.(nonejs|nonejsx)$/,
                exclude: [
                    /node_modules/,
                    /trialcode/,
                    /developsrc/,
                    /reactbuild/,
                    (path.resolve(frontEndPath, './legacy') + '/'),
                    (path.resolve(frontEndPath, './src/importers/developsrc') + '/'),
                    (path.resolve(frontEndPath, './src/importers/ImportOBJ.prod.js') + '/'),
                    (path.resolve(frontEndPath, './src/cadclient/developsrc') + '/'),
                ],
                //include: path.resolve(frontEndPath, './src'),
                //include: frontEndPath,
                include: frontEndSrc,
                loader: 'babel-loader',
                //230218
                //use: ['source-map-loader'],
                //230218
                enforce: 'pre',
                options: {
                    sourceMap: isWebpackProduction ? false : true,
                    configFile: path.resolve(__dirname, "./babel.config.json")
                },
            },


            // Process any JS outside of the app with Babel.
            // Unlike the application JS, we only compile the standard ES features.
            {
                //test: /\.(scss|css)$/,
                test: cssAnyRegex,
                exclude: cssBootstrapRegex,
                //exclude: cssModuleRegex,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                //test: /\.(scss|css)$/,
                test: cssBootstrapRegex,
                //exclude: cssModuleRegex,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                //test: /\.(scss|css)$/,
                test: sassRegex,
                //220917
                exclude: sassBootstrapRegex,
                //exclude: cssModuleRegex,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },

            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use MiniCSSExtractPlugin to extract that CSS
            // to a file, but in development "style" loader enables hot editing
            // of CSS.
            // By default we support CSS Modules with the extension .module.css
            /*
            {
                test: cssRegex,
                exclude: cssModuleRegex,
                use: getStyleLoaders({
                    importLoaders: 1,
                    sourceMap: true,
                    //sourceMap: isEnvProduction?shouldUseSourceMap: isEnvDevelopment,
                }),
                // Don't consider CSS imports dead code even if the
                // containing package claims to have no side effects.
                // Remove this when webpack adds a warning or an error for this.
                // See https://github.com/webpack/webpack/issues/6571
                sideEffects: true,
            },
            */
            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
            // using the extension .module.css
            /*
            {
                test: cssModuleRegex,
                use: getStyleLoaders({
                    importLoaders: 1,
                    sourceMap: true,
                    sourceMap: isEnvProduction? shouldUseSourceMap: isEnvDevelopment,
                    modules: {
                        getLocalIdent: getCSSModuleLocalIdent,
                    },
                }),
            },
            */
            // Opt-in support for SASS (using .scss or .sass extensions).
            // By default we support SASS Modules with the
            // extensions .module.scss or .module.sass
            /*
            {
                test: sassRegex,
                exclude: sassModuleRegex,
                use: getStyleLoaders(
                    {
                        importLoaders: 3,
                        sourceMap: isWebpackProduction ? false : true,
                        //sourceMap: isEnvProduction?shouldUseSourceMap:isEnvDevelopment,
                    	
                    },
                    'sass-loader'
                ),
                // Don't consider CSS imports dead code even if the
                // containing package claims to have no side effects.
                // Remove this when webpack adds a warning or an error for this.
                // See https://github.com/webpack/webpack/issues/6571
                sideEffects: true,
            },
            // Adds support for CSS Modules, but using SASS
            // using the extension .module.scss or .module.sass
            {
                test: sassModuleRegex,
                use: getStyleLoaders(
                    {
                        importLoaders: 3,
                        sourceMap: isWebpackProduction?false: true,
            	
                        modules: {
                            getLocalIdent: getCSSModuleLocalIdent,
                        },
                    },
                    'sass-loader'
                ),
            },*/
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "./images",
                        publicPath: "/appdist/images"
                    }
                }]
            },
        ],
    },
    plugins: [
        new WebpackManifestPlugin({
            fileName: 'asset-manifest.json',
            //publicPath: publicPath,

            generate: (seed, files) => {
                const manifestFiles = files.reduce((manifest, file) => {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);

                const entrypointFiles = files.filter(x => x.isInitial && !x.name.endsWith('.map')).map(x => x.path);

                return {
                    files: manifestFiles,
                    entrypoints: entrypointFiles,
                };
            },

        }),
        new MiniCssExtractPlugin({
            //filename: "../../dist/css/[name].css",
            //filename: path.resolve(backEndPath, "wwwroot/dist/css/[name].css"),
            //filename: path.resolve(backEndPath, "./wwwroot/dist/css/[name].css"),
            filename: "css/[name].[contenthash:8].css",
            // chunkFilename: 'css/minicss.[name].chunk.css',
        }),
        new CleanWebpackPlugin({
            dry: false,
            dangerouslyAllowCleanPatternsOutsideProject: true
        }),
        new CopyWebpackPlugin([
            {
                //220516
                from: path.resolve(frontEndPath, "./public/shapes/*.*"),
                to: path.resolve(razorRootPath, "./wwwroot/shapes") + "/[name].[ext]",
                //			noErrorOnMissing: true
            },
            {
                from: path.resolve(razorRootPath, "./wwwroot/src/*.png"),
                to: path.resolve(razorRootPath, "./wwwroot/appdist/images") + "/[name].[ext]",
                //			noErrorOnMissing: true
            },
            {
                from: path.resolve(razorRootPath, "./wwwroot/src/*.jpg"),
                to: path.resolve(razorRootPath, "./wwwroot/appdist/images") + "/[name].[ext]",
                //			noErrorOnMissing: true
            },
            {
                from: path.resolve(razorRootPath, "./wwwroot/src/*.jpeg"),
                to: path.resolve(razorRootPath, "./wwwroot/appdist/images") + "/[name].[ext]",
                //			noErrorOnMissing: true
            },
            {
                from: path.resolve(razorRootPath, "./wwwroot/src/*.gif"),
                to: path.resolve(razorRootPath, "./wwwroot/appdist/images") + "/[name].[ext]",
                //			noErrorOnMissing: true
            },
            {
                from: path.resolve(frontEndPath, "./src/images/*.png"),
                to: path.resolve(razorRootPath, "./wwwroot/appdist/images") + "/[name].[ext]",
                //			noErrorOnMissing: true
            },
            {
                from: path.resolve(frontEndPath, "./src/images/*.jpg"),
                to: path.resolve(razorRootPath, "./wwwroot/appdist/images") + "/[name].[ext]",
                //			noErrorOnMissing: true
            },
            {
                from: path.resolve(frontEndPath, "./src/images/*.jpeg"),
                to: path.resolve(razorRootPath, "./wwwroot/appdist/images") + "/[name].[ext]",
                //			noErrorOnMissing: true
            },
            {
                from: path.resolve(frontEndPath, "./src/images/*.gif"),
                to: path.resolve(razorRootPath, "./wwwroot/appdist/images") + "/[name].[ext]",
                //			noErrorOnMissing: true
            },
        ]

        ),
        /* older version
    new CopyWebpackPlugin([{
        from: path.resolve(razorRootPath, "./wwwroot/src/*.png"),
        to: path.resolve(razorRootPath, "./wwwroot/dist/images") + "/[name].[ext]"
    }]),
    */

    ],


};
