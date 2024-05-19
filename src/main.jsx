import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import SocketState from './Context/SocketState.jsx'
import AuthState from './Context/AuthState.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
  <AuthState>
  <SocketState>
    <App />
  </SocketState>
  </AuthState>
  </BrowserRouter>
  // </React.StrictMode>,
)
