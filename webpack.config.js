const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const cssFile = 'style.css';
const wwwFolder = path.join(__dirname, 'www');
const imgNames = 'img/[name].[ext]';

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/script', 'index.ts')
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: wwwFolder,
    port: 8000,
    hot: true,
    open: false,
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.htm|html$/,
        use: ['html-loader'],
        include: [path.join(__dirname, 'src')],
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss|css)$/,

        use: [
          {
            loader: MiniCss.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 16 * 1024
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.htm'),
      inject: true,
      filename: 'index.htm'
    }),
    new MiniCss({
      filename: cssFile
    })
  ]
};
