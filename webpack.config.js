const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.jsx',   // ← Entrada principal
    links: './src/links.jsx'    // ← Entrada para links.html
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', // ← Genera index.bundle.js y links.bundle.js
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'links.html',
      template: './public/links.html',
      chunks: ['links'],
    }),
    new CopyPlugin({
    patterns: [
      { from: path.resolve(__dirname, '_redirects'), to: '' },
    ],
  }),
  ],
};
