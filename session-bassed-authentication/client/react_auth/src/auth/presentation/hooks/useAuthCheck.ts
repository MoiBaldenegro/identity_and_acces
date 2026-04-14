import { useEffect, useRef } from 'react';
import { useAuthDependenciesStore } from '../../infrastructure/store/useAuthStore';
import { useAuthStore } from '../store/useAuthStore';

export const useAuthCheck = () => {
  const getCurrentUser = useAuthDependenciesStore((state) => state.auth.getCurrentUser);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const checkAuth = async () => {
      try {
        const response = await getCurrentUser.exec();
        //
        if (response) {
          setAuth(response);
        } else if (isAuthenticated) {
          clearAuth();
        }
      } catch (err) {
        //
        if (isAuthenticated) {
          clearAuth();
        }
      }
    };

    checkAuth();
  }, [getCurrentUser, setAuth, clearAuth, isAuthenticated]);
};
