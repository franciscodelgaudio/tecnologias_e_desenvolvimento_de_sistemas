import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// CSS base do Bootstrap e icones do projeto.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.jsx'

// Monta a arvore React e aplica o modo estrito.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
