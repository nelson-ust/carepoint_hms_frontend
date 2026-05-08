import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { TenantProvider } from './context/TenantContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TenantProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </TenantProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
