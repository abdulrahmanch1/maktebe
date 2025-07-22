import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
