import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "@/components/ui/sonner"
import { Provider } from 'react-redux'
import store from './redux/Store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'

const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="137821851452-onoi6d7kcmrsrf4a7ahviie5kmonsodk.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
      <Toaster />
    </GoogleOAuthProvider>
  </StrictMode>
)
