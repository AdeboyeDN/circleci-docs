const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: './src-js/app.js',
    vendor: './src-js/vendor.js',
    styles: './src-js/styles/main.scss',
  },
  output: {
    path: path.join(__dirname, 'jekyll/assets/js'),
    publicPath: '',
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      CIRCLECI_ENVIRONMENT: `"${process.env.NODE_ENV}"`,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },

    ]
  }
};
