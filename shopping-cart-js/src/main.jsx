import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import store from './redux/store.js'
import './style.css'
import Navbar from './components/navbar.jsx'
import Footer from './components/Footer.jsx';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Navbar />
        <Toaster richColors position="bottom-right" />
        <App />
      <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
