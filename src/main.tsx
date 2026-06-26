import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { RegisterPage } from '@/pages/RegisterPage';
import { LanguageProvider } from '@/hooks/useLang';
import './styles/index.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

createRoot(rootEl).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
);
