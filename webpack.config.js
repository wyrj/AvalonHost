/* eslint-env node */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    demo: './index.js',
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'window',
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.(js|ts)$/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          envName: 'browser',
        }
      }, {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        }
      }]
    }],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  performance: false,
  plugins: [new ForkTsCheckerWebpackPlugin()],
  devtool: 'cheap-module-source-map',
};
