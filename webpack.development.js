/* eslint-disable spellcheck/spell-checker */
import { merge } from 'webpack-merge'
import common from './webpack.common.js'

const development = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    client: {
      logging: 'info',
      overlay: true
    },
    compress: true,
    open: true,
    static: './build'
  },
  stats: {
    errorDetails: true
  }
})

export default development
