const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        main: './src/main/js/handler.js'
    },
    target: 'node',
    externals: [nodeExternals()], // modules to be excluded from bundled file
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [
            'node_modules'
        ]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: 'handler.js'
    },
    node: {
        __dirname: true
    },
    mode: 'production',
    module: {
        rules: [
        ]
    },
    devtool: 'nosources-source-map',
    plugins: [
    ]
};