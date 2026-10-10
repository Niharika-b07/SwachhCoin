import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-400" />
        <p className="text-xs uppercase tracking-widest font-bold mt-3 text-emerald-200">
          Verifying Security Credentials...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login page and preserve redirect path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
