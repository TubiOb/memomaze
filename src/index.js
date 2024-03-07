import React from 'react';
import ReactDOM from 'react-dom/client';
import { ColorModeScript } from '@chakra-ui/react'
import './index.css';
import App from './App';
import theme from './theme'
import { UserProvider } from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
