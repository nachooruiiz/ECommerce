import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// import { TokenProvider } from './context/TokenContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <TokenProvider> */}
      <App />
    {/* </TokenProvider> */}
  </StrictMode>,
)
