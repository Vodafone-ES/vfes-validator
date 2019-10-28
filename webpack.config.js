const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './src',
        overlay: true,
        disableHostCheck: true,
    },
    stats: {
        colors: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'NEW SEED',
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
