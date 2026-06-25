import { Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ContactPage } from '@/pages/ContactPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
