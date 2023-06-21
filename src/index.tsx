// eslint-disable-next-line spellcheck/spell-checker
import ReactDom from 'react-dom/client'
import React from 'react'

import App from './App'

// eslint-disable-next-line spellcheck/spell-checker
const root = ReactDom.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(<App />)
