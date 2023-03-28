import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { EHRProvider } from './context/ehrContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <EHRProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </EHRProvider>,
)
