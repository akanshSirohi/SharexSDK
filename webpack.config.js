const path = require('path');

module.exports = {
  entry: './src/SharexSDK.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sharex-sdk.min.js',
    library: 'sharex-sdk',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
