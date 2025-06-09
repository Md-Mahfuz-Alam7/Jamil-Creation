import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';

// Import page components
import HomePage from './pages/Home';
import CreateNewInvoicePage from './pages/CreateNewInvoice';
import SignupPage from './pages/Signup';

const AppRoutes = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-invoice" element={<CreateNewInvoicePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/download" element={<HomePage />} /> {/* Placeholder for now */}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;