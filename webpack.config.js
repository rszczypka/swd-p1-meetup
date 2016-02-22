const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const PROD = process.env.NODE_ENV === 'production';
const env = process.env.NODE_ENV || 'development';


module.exports = {
  devtool: PROD ? '' : 'source-map',
  entry: [
    'bootstrap-loader',
    path.resolve(ROOT_PATH, 'app/src')
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: PROD ? [] : ['eslint'],
        include: path.resolve(ROOT_PATH, './app')
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.css/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.less/,
        loaders: ['style', 'css', 'less']
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?mimetype=image/png'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: path.resolve(ROOT_PATH, 'app/src/components'),
      containers: path.resolve(ROOT_PATH, 'app/src/containers'),
      pages: path.resolve(ROOT_PATH, 'app/src/pages'),
      actions: path.resolve(ROOT_PATH, 'app/src/actions'),
      utils: path.resolve(ROOT_PATH, 'app/src/utils'),
      common: path.resolve(ROOT_PATH, 'common'),
      reducers: path.resolve(ROOT_PATH, 'app/src/reducers'),
      store: path.resolve(ROOT_PATH, 'app/src/stores'),
      config: path.join(ROOT_PATH, 'config', env),
    },
  },
  output: {
    path: PROD ? path.resolve(ROOT_PATH, 'dist') : path.resolve(ROOT_PATH, 'app/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'dist'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'React BoilerPlate',
      template: 'index.html'
    })
  ]
};