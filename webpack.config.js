const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        popup: './src/popup.js',
        background: './src/background.js',
        content: './src/scripts/content.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'extension'),
    },
    devtool: 'source-map',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './src/manifest.json' },
                { from: './src/popup.html' },
            ],

        }),
    ],
};