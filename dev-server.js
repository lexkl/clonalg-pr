let WebpackDevServer = require('webpack-dev-server');
let webpack = require('webpack');
let config = require('./webpack.config.js');
let path = require('path');

let compiler = webpack(config);
let server = new WebpackDevServer(compiler, {
    hot: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
});
server.listen(8080, 'localhost', function() {});
