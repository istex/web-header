const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/header.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devServer: {
     contentBase: './public',
     hot: true
    },
  plugins: [
    new CopyWebpackPlugin([{ from: 'src/img', to: 'img' }]),
    new CopyWebpackPlugin([{ from: 'src/index.html', to: './' }]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.html$/,use:['html-loader']}
       ]
    }
};