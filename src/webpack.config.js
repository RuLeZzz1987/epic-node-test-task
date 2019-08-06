const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' );

const watchMode = false;

module.exports = {
  target: "node",
  entry: path.resolve(__dirname, './app.js'),
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  externals: [nodeExternals()],
  watch: watchMode,
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new NodemonPlugin()
  ]
};
