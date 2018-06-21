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
    path: path.resolve(__dirname, "./public/js/")
  },

  watchOptions: {
    poll: true
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/js/',
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
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
          {
              loader: 'url-loader'
          },
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.jpg'],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  }

}
