var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['*', '.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.resolve('angular/tsconfig.json') }
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loaders: ['html-loader'],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]

            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                exclude: '/node_modules/',
                loader: 'null-loader',
            }
        ]
    }
}

