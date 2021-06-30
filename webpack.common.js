const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
module.exports = {
  entry: {
    engrid: "./src/index.ts",
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Engaging Networks - Page Type Selection",
      template: "./src/index.html",
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "AIUSA - Engaging Networks Page - Donation 1 Column",
      filename: "page-donation-1col-aiusa.html",
      template: "./src/templates/page-donation-1col.html",
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: "AIUSA - Engaging Networks Page - Donation 2 Column",
      filename: "page-donation-2col-aiusa.html",
      template: "./src/templates/page-donation-2col.html",
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),    
    new HtmlWebpackPlugin({
      title: "AIUSA - Engaging Networks Page - Brand Guide",
      filename: "brand-guide-aiusa.html",
      template: "./src/templates/brand-guide.html",
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/preset-typescript"],
            plugins: [
              "@babel/proposal-class-properties",
              "@babel/proposal-object-rest-spread",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false,
              sources: false,
            },
          },
          {
            loader: "posthtml-loader",
            options: {
              ident: "posthtml",
              // skipParse: true,
              // parser: "PostHTML Parser",
              plugins: [require("posthtml-include")({ encoding: "utf8" })],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
