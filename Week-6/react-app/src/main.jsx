import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Navbar moved into App.jsx so import removed
import Demo from './components/Demo.jsx'
import FormDemo from './components/Form.jsx'

createRoot(document.getElementById('root')).render(
  // <FormDemo></FormDemo>

  <StrictMode>
   <FormDemo/>
  </StrictMode>
)
