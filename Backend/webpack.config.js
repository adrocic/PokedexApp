"use strict";

const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LiveReloadPlugin = require('webpack-livereload-plugin');
const merge = require('webpack-merge');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');

const rpath = path.join.bind(path, __dirname);

const PATHS = {
  build: rpath("public", "build"),
  styles: rpath("resources", "assets"),
  vendorStyles: /node_modules/,
};

const modifyVars = lessToJs(fs.readFileSync(rpath('resources', 'assets', 'less', 'ant-theme.less'), 'ascii'));

// The public url prefix for webpack'd assets
const publicPath = '/';


const base = {
  entry: {
    app: './resources/assets/js/app.js',
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath
  },
  stats: {
    children: false
  },
  module: {
    noParse: [/moment.js/], // Avoid including all moment locales (moment is pulled in by antd)
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          },
        }]
      },
      {
        test: /\.less/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: "css-loader"},
          {loader: "less-loader", options: {modifyVars, javascriptEnabled: true}},
        ],
        include: [PATHS.vendorStyles, PATHS.styles]
      },
      {
        test: /\.css/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
        ],
        include: [PATHS.vendorStyles, PATHS.styles]
      },
      {test: /\.jpe?g$|\.gif$|\.png$|\.mp3$/, use: [{loader: "file-loader"}]},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: "file-loader"}]},
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, use: [{
          loader: "url-loader", options: {limit: 10000, mimetype: "application/font-woff"}
        }]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{
          loader: "url-loader", options: {limit: 10000, mimetype: "application/octet-stream"}
        }]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{loader: "url-loader", options: {limit: 10000, mimetype: "image/svg+xml"}}]
      }
    ]
  },
  resolve: {
    alias: {
      components: rpath('resources', 'assets', 'js', 'components'),
      screens: rpath('resources', 'assets', 'js', 'screens'),
      utils: rpath('resources', 'assets', 'js', 'utils'),
      less: rpath('resources', 'assets', 'less'),
      images: rpath('resources', 'assets', 'images'),
      "@ant-design/icons/lib/dist$": rpath('resources', 'assets', 'js', 'icons.js'), // See resources/assets/js/icons.js
    },
    extensions: ['.js', '.less']
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new ManifestPlugin({
      fileName: "mix-manifest.json",
      basePath: '/'
    }),
  ]
};

let config;

switch (process.env.NODE_ENV) {
  case "production":
    config = merge(
      base,
      {
        output: {
          path: PATHS.build,
          filename: "[name].[hash].js",
          publicPath
        },
        mode: "production",
        devtool: "source-map",
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true,
            })
          ],
        },
        plugins: [
          new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            allChunks: true
          })
        ]
      }
    );
    break;
  default:
    config = merge(
      base,
      {
        devtool: "eval-source-map",
        plugins: [
          new MiniCssExtractPlugin({
            filename: '[name].css',
            allChunks: true
          }),
          new CleanWebpackPlugin([PATHS.build], {root: process.cwd()}),
          new LiveReloadPlugin({appendScriptTag: true})
        ]
      }
    );
}

module.exports = config;
