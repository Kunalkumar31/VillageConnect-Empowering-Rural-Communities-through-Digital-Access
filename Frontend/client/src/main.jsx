
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import './index.css'
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HelmetProvider>
        <App />
        </HelmetProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
  </>
);
