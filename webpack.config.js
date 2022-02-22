const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
    mode,
    entry: './client/src/index.js', 
    devtool: 'source-map',

    output: {
        path: path.resolve(__dirname, 'dist'), 
        clean: true,
        filename: "js/[name].[contenthash:8].js",
        publicPath: "/"
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env'],
                cacheDirectory: true,
                cacheCompression: false,
                envName: mode,
              }
            }
          },
          {
            test: /\.css$/,
            use: [
              mode === 'production' ? MiniCssExtractPlugin.loader : "style-loader",
              "css-loader",
            ]
          },
          {
            test: /\.(png|jpg|gif)$/i,
            use: {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "public/[name].[hash:8].[ext]"
              }
            }
          },
        ]
      },
      resolve: {
        extensions: [".js", ".jsx"]
      },
      plugins: [
        mode === 'production' &&
          new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
            chunkFilename: "[name].[contenthash:8].chunk.css"
          }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "./client/public/index.html"),
          inject: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify(mode)
        })
      ].filter(Boolean),
    
    devServer: {
        hot: true,
        compress: true,
        historyApiFallback: true,
        open: true,
        overlay: true
    },

}