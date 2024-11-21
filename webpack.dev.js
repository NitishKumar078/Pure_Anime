const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");

module.exports = merge(config, {
  mode: "development",
  target: "web",
  devtool: "inline-source-map",
});
