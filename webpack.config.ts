import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';

interface Config extends webpack.Configuration {
  devServer?: webpackDevServer.Configuration;
}

const config: Config = {
  mode: 'production',

  entry: ['./src/index.tsx'],

  output: {
    filename: 'bundle.min.js',
    path: __dirname + '/dist',
    publicPath: '/dist' // dist needed here so that webpack will correctly set file permissions before the push to AWS
  },

  devServer: {
    contentBase: __dirname + '/dist',
    port: 2771
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.min.css'
    }),
    new HtmlWebpackPlugin({
      template: './server/views/index.html',
      filename: 'index.html'
    })
  ],

  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json'
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader, // extract css into it's own bundle
          'css-loader', // css
          'sass-loader', // scss
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /.(jpg|jpeg|png|pdf|svg)/,
        include: /assets/,
        type: 'asset/resource'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
};

export default config;
