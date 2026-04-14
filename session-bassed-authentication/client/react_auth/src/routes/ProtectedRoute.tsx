// src/presentation/router/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../auth/presentation/store/useAuthStore';
import { use, useEffect, type ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, clearAuth } = useAuthStore();
  //

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!isAuthenticated) {
    //
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};