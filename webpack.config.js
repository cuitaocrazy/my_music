/**
 * Created by cuitao on 2016/12/27.
 */

const path = require('path')

module.exports = {
    context: path.join(__dirname, "src"),
    entry: ["babel-polyfill", "./comm.sass", "./client.js"],
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders:[
            {test: /\.js$/, loader: "babel", include: path.join(__dirname, 'src')},
            {test: /\.sass$/, loader: 'style!css!sass'}
        ]
    }
}