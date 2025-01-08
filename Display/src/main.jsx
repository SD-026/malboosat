import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import store,{ persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
     <ToastContainer/>

    <App />
     </PersistGate>
     </Provider>

  </StrictMode>,
)
