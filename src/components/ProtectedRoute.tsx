import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  console.log('🔧 ProtectedRoute render:', {
    isAuthenticated,
    isLoading,
    pathname: location.pathname
  });

  if (isLoading) {
    console.log('🔧 ProtectedRoute: showing loading');
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    console.log('🔧 ProtectedRoute: redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('🔧 ProtectedRoute: rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;