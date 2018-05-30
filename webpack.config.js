const path = require("path");
const webpack = require("webpack");
const autoprefixer = require('autoprefixer');
const flexfixes = require('postcss-flexbugs-fixes');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {

  entry: ["babel-polyfill", "./src/index.jsx", "./src/scss/main.scss"],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./public/")
  },

  watchOptions: {
    poll: true
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/',
    historyApiFallback: true
  },

  node: {
   fs: "empty"
  },

  module: {
    rules: [
      {
        enforce: 'pre', // lint files before they are transformed, config in .eslintrc.json
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader' // config in .babelrc
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s?[ac]ss$/,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000' // will insert a data URI if filesize < 10kb otherwise uses file-loader
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  }

}
