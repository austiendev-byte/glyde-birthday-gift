import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { content } from './config/content'
import './styles/global.css'

document.title = content.siteTitle

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
