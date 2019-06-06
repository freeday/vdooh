const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let conf = {
  entry: {
    app: "./index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/"
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: "./index.html",
      filename: "./index.html"
    })
  ]
};

module.exports = (env, options) => {
  conf.devtool = options.mode === "production" ? false : "eval-sourcemap";
  return conf;
};
