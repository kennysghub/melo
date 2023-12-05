const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('dev'),
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    //enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,

    static: {
      // match the output path
      directory: path.resolve(__dirname, 'dist'),
      //match the output 'publicPath'
      publicPath: '/',
    },

    headers: { 'Access-Control-Allow-Origin': '*' },
    // proxy is required in order to make api calls to express server while using hot-reload webpack server
    // routes api fetch requests from localhost:8080/api/* (webpack dev server) to localhost:3000/api/* (where our Express server is running)
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
};
