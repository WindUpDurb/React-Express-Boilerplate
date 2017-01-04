"use strict";

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from "extract-text-webpack-plugin";

//the following sets environment variables
const GLOBALS = {
    "process.env.NODE_ENV": JSON.stringify("production")
};

export default {
    debug: true,
    devtool: 'source-map',
    //set to false means it will display a list of all files it is bundling
    //typically, turn it on for production
    noInfo: false,
    entry: './src/index',
    //can be set to node
    // setting it should be bundled so the web can understand
    target: 'web',
    //But webpack won't generate any actual physical file;
    //it will be served from memory
    output: {
        //but path and name need to be inputted
        //no files will be written
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    //tell webpack's dev server where the code is
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin("style.css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    //this section tells webpack what file types it should handle
    module: {
        loaders: [
            //saying we want it to handle javascript and use babel to transpile
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
            {test: /(\.css)$/, loaders: ['style', 'css']},
            //{test: /(\.css)$/, loader: ExtractTextPlugin.extract("css?sourceMap")},
            //below is necessary for bootstrap
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
