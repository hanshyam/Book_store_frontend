import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import { BookContextProvider } from './context/bookContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <BookContextProvider>
      <App/>
    </BookContextProvider>
  </AuthContextProvider>,
)
