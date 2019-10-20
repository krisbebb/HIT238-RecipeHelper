
var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path')

module.exports = {

    entry: {
        index: ["@babel/polyfill", './src/index.js'],
        edit: ["@babel/polyfill", './src/edit.js']
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, 
            {
                test: /\.(scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [ 
                        'css-loader',
                        'sass-loader'
                    ]
                })
        //         use: [
        //             {
        //                 // Adds CSS to the DOM by injecting a `<style>` tag
        //                 loader: 'style-loader'
        //             },
        //             {
        //                 // Interprets `@import` and `url()` like `import/require()` and will resolve them
        //                 loader: 'css-loader'
        //             },
        //             {
        //                 // Loader for webpack to process CSS with PostCSS
        //                 loader: 'postcss-loader',
        //                 options: {
        //                 plugins: function () {
        //                     return [
        //                     require('autoprefixer')
        //                     ];
        //                 }
        //                 }
        //             },
        //             {
        //                 // Loads a SASS/SCSS file and compiles it to CSS
        //                 loader: 'sass-loader'
        //             }
        //         ]
            },
        ]
    },
    plugins: [
        new ServiceWorkerWebpackPlugin({
          entry: path.join(__dirname, 'src/sw.js'),
        }),
        // new ExtractTextPlugin('[name].[chunkhash].css')
        new ExtractTextPlugin('../css/[name].css')
      ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/js/'
    },
    devtool: 'source-map'
}