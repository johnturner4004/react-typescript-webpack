/* eslint-disable spellcheck/spell-checker */
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { fileURLToPath } from 'url'
// const CopyPlugin = require('copy-webpack-plugin');

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const common = {
  entry: './src/index.tsx',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
    // new CopyPlugin({
    //   patterns: [{ from: 'src/icons' }],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  }
}

export default common
