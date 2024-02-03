import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginScreen from './components/pages/login/LoginScreen.tsx';
import './styles/index.scss';
import { LoginContextProvider } from './context/LoginContext.tsx';
import { LibraryContextProvider } from './context/LibraryContext.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateAccountScreen from './components/pages/createaccount/CreateAccountScreen.tsx';
import LibraryScreen from './components/pages/library/LibraryScreen.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginContextProvider>
      <LibraryContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/create" element={<CreateAccountScreen />} />
            <Route path="/library" element={<LibraryScreen />} />
          </Routes>
        </BrowserRouter>
      </LibraryContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);
