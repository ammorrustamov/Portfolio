// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './ThemeContext/ThemeContext.jsx'
import { initGA } from './analytics'
initGA()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      
    </ThemeProvider>
  </React.StrictMode>
)