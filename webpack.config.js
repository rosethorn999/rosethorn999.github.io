const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    watchFiles: ['src/**/*'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
  output: {
    filename: '[name].js',
    // filename: "bundle.js",
    path: path.resolve(__dirname, 'dist'),
    // publicPath: "/",
    assetModuleFilename: 'asset/[name][ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/i,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, type: 'asset' },
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },
};
