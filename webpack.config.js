// @ts-check
const webpack = require('webpack');
const path = require('path');
// const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;

// const configuration = { prepack: { sourceMaps: true } };
const NODE_ENV = process.env.NODE_ENV;

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new PrepackWebpackPlugin(configuration),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ],
};

if (NODE_ENV === 'development') {
  config.watch = true;
  config.output.filename = 'fuc.js';
} else if (NODE_ENV === 'production') {
  config.output.filename = 'fuc.min.js';
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      },
    }),
  );
}

module.exports = config;
