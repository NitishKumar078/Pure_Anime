const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const config = {
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  entry: {
    content: "./src/content_script/content.ts",
    background: "./src/Background/background.ts",
    react: "./src/react/index.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/icons", to: "icons" },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts|tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "> 0.25%, not dead",
                },
              ],
              ["@babel/preset-react", { runtime: "automatic" }],
              ["@babel/preset-typescript"],
            ],
          },
        },
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx"],
  },
};

module.exports = config;
