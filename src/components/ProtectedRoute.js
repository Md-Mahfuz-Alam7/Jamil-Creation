import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return null; // or redirect to landing page
  }
  
  return children;
};

export default ProtectedRoute;