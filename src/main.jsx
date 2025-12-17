import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Contextshare from './context/Contextshare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='126506715252-1t9emler5993abmbc6nubajo6dkdp48g.apps.googleusercontent.com'>
        <Contextshare>
          <App />
          </Contextshare>
        </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
