import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './redux/store'
import './style.css'
import Navbar from './components/navabar'
import Footer from './components/footer';
import { Toaster } from 'sonner';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
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
  );
}

