/* eslint-disable spellcheck/spell-checker */
import { merge } from 'webpack-merge'
import common from './webpack.common.js'

const production = merge(common, {
  mode: 'production'
})

export default production
