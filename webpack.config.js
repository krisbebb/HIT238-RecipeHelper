
var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
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
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    plugins: [
        new ServiceWorkerWebpackPlugin({
          entry: path.join(__dirname, 'src/sw.js'),
        }),
      ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/js/'
    },
    devtool: 'source-map'
}