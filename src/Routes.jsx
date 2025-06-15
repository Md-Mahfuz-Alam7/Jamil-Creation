// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/common/Header';

// // Import page components
// import HomePage from './pages/Home';
// import CreateNewInvoicePage from './pages/CreateNewInvoice';
// import SignupPage from './pages/Signup';

// const AppRoutes = () => {
//   return (
//     <Router>
//       <div className="min-h-screen">
//         <Header />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/create-invoice" element={<CreateNewInvoicePage />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/download" element={<HomePage />} /> {/* Placeholder for now */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default AppRoutes;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// Import page components
import HomePage from './pages/Home';
import CreateNewInvoicePage from './pages/CreateNewInvoice';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DownloadPage from './pages/Download';

const AppLayout = ({ children }) => {
  const location = useLocation();
  // Hide footer on auth-related and dashboard pages
  const hideFooter = ['/dashboard', '/create-invoice', '/signup', '/login'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        {children}
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/create-invoice"
            element={
              <ProtectedRoute>
                <CreateNewInvoicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/download"
            element={<DownloadPage />}
          />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default AppRoutes;