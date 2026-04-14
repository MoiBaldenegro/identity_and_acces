import { useEffect, useRef, useState } from 'react';
import { useAuthDependenciesStore } from '../../infrastructure/store/useAuthStore';
import { useAuthStore } from '../store/useAuthStore';
import type { SessionInfo } from '../../domain/ports/auth.port';

interface UseAuthCheckResult {
  sessions: { success: boolean, sessions: SessionInfo[] }[] | null;
  fetchSessions: () => Promise<void>;
}

export const useAuthCheck = (): UseAuthCheckResult => {
  const getCurrentUser = useAuthDependenciesStore((state) => state.auth.getCurrentUser);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initialized = useRef(false);
  const [sessions, setSessions] = useState<{ success: boolean, sessions: SessionInfo[] }[] | null>(null);

   const getUserSessions = useAuthDependenciesStore((state) => state.auth.getUserSessions);

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
        console.warn('Error checking authentication status:', err);
        //
        if (isAuthenticated) {
          clearAuth();
        }
      }
    };

    checkAuth();
  }, [getCurrentUser, setAuth, clearAuth, isAuthenticated]);

  const fetchSessions = async () => {
    try {
      const response = await getUserSessions.exec();
      setSessions(response);
    } catch (error) {
      console.error('Error fetching user sessions:', error);
    } 
  };

  return { sessions, fetchSessions };
}
