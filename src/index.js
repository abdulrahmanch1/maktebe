import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from './contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <AppRoutes />
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
