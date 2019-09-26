const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = devMode => {
  const mode = devMode ? "development" : "production"
  console.log("Generating Webpack config, mode:", mode)

  return {
    mode,

    entry: [
      "core-js/modules/es.promise",
      "core-js/modules/es.array.iterator",
      "./src/index.js"
    ],

    devtool: devMode ? "source-map" : false,

    output: {
      filename: "bundle.min.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/dist"
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: "styles.min.css"
      }),
      new HtmlWebpackPlugin({
        template: "./server/views/index.html",
        filename: "index.html"
      })
    ],

    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader, // extract css into it's own bundle
            "css-loader", // css
            "sass-loader", // scss
            "postcss-loader",
            {
              loader: "postcss-loader",
              options: {
                plugins: [require("autoprefixer")]
              }
            }
          ]
        },
        {
          test: /.(jpg|jpeg|png|pdf|svg)/,
          include: /assets/,
          loader: "file-loader"
        }
      ]
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          cache: true,
          sourceMap: devMode,
          exclude: /node_modules/,
          terserOptions: {
            compress: true,
            mangle: true,
            toplevel: true
          }
        }), // JS Minification
        new OptimizeCSSAssetsPlugin() // CSS Minification
      ]
    },

    resolve: {
      extensions: [".js", ".jsx"]
    }
  }
}
