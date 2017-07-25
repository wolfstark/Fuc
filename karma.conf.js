const alias = require('./build/alias');

module.exports = function (config) {
  config.set({
    files: ['./test/**/*.test.js'],

    exclude: ['**/node_modules/**/*.test.js'],

    frameworks: ['mocha', 'chai'],

    logLevel: config.LOG_INFO, // config.LOG_DISABLE, // config.LOG_INFO
    singleRun: true,

    preprocessors: {
      './test/**/*.test.js': ['webpack'],
    },

    // reporters: ['mocha'],

    webpack: {
      resolve: {
        alias,
      },
      module: {
        // devtool: 'inline-source-map',
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/,
          },
        ],
      },
    },
    webpackServer: {
      noInfo: true,
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
    ],
    browsers: ['Chrome'], // ['Chrome']
    concurrency: Infinity,
  });
};
