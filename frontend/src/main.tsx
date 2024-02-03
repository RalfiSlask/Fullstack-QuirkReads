import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginScreen from './components/pages/LoginScreen.tsx';
import './styles/index.scss';
import { LoginContextProvider } from './context/LoginContext.tsx';
import { LibraryContextProvider } from './context/LibraryContext.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginContextProvider>
      <LibraryContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
          </Routes>
        </BrowserRouter>
      </LibraryContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);
