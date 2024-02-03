import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.scss';
import { LoginContextProvider } from './context/LoginContext.tsx';
import { LibraryContextProvider } from './context/LibraryContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginContextProvider>
      <LibraryContextProvider>
        <App />
      </LibraryContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);
