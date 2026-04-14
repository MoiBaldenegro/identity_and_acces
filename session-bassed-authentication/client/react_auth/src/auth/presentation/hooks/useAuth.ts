import { useNavigate } from 'react-router-dom';
import type { User } from "../../domain/entities/user.entity";
import type { LoginData, RegisterData } from "../../domain/ports/auth.port";
import { useAuthDependenciesStore } from "../../infrastructure/store/useAuthStore";
import { useAuthStore } from "../store/useAuthStore";

interface UseAuthActions {
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  register: (userData: RegisterData) => Promise<void>;
  logoutAll: () => Promise<void>;
  logoutSingleDevice: (sessionId: string) => Promise<void>;
}

export const useAuthActions = (): UseAuthActions => {
  const navigate = useNavigate();
  
  const _login = useAuthDependenciesStore((state) => state.auth.login);
  const _logout = useAuthDependenciesStore((state) => state.auth.logout);
  const _register = useAuthDependenciesStore((state) => state.auth.register);
  const _logoutAll = useAuthDependenciesStore((state) => state.auth.logoutAll);
  const _logoutSingleDevice = useAuthDependenciesStore((state) => state.auth.logoutSingleDevice);

  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  const login = async ({ email, password, rememberMe }: LoginData) => {
    try {
      const user = await _login.exec({ email, password, rememberMe });
      setAuth(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await _logout.exec();
      clearAuth();
      navigate('/login');
    } catch (error) {
      console.warn('Error logging out:', error);
      clearAuth();
      navigate('/login');
    }
  };

  const logoutAll = async () => {
    try {
      await _logoutAll.exec();
    } catch (error) {
      console.error('Error logging out from all sessions:', error);
      throw error;
    }
  };


  const register = async (userData: RegisterData) => {
    try {
      await _register.exec(userData);
      const user = await _login.exec({ email: userData.email, password: userData.password });
      setAuth(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  };

  const logoutSingleDevice = async (sessionId: string) => {
    try {
      await _logoutSingleDevice.exec(sessionId);
    } catch (error) {
      console.error('Error logging out session:', error);
      throw error;
    }
  };

  return { login, logout, user, register, logoutAll, logoutSingleDevice };  
};