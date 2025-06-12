import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthModals from './components/AuthModals';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage'; // Your existing landing page
import InvoiceDashboard from './components/InvoiceDashboard'; // Your existing invoice page

function AppContent() {
  const { user } = useAuth();
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    if (!user) {
      // Show signup popup after 2 seconds for non-authenticated users
      const timer = setTimeout(() => {
        setShowSignupModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <InvoiceDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/invoice/*" 
          element={
            <ProtectedRoute>
              <InvoicePages />
            </ProtectedRoute>
          } 
        />
      </Routes>
      
      <AuthModals 
        showSignup={showSignupModal && !user}
        onCloseSignup={() => setShowSignupModal(false)}
      />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;