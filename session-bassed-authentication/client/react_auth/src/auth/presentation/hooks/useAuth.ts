import { useNavigate } from 'react-router-dom';
import type { UserEntity } from "../../domain/entities/user.entity";
import type { LoginData, RegisterData } from "../../domain/ports/auth.port";
import { useAuthDependenciesStore } from "../../infrastructure/store/useAuthStore";
import { useAuthStore } from "../store/useAuthStore";

interface UseAuthActions {
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  user: UserEntity | null;
  register: (userData: RegisterData) => Promise<void>;
}

export const useAuthActions = (): UseAuthActions => {
  const navigate = useNavigate();
  
  const _login = useAuthDependenciesStore((state) => state.auth.login);
  const _logout = useAuthDependenciesStore((state) => state.auth.logout);
  const _register = useAuthDependenciesStore((state) => state.auth.register);

  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  const login = async ({ email, password }: LoginData) => {
    try {
      const user = await _login.exec({ email, password });
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
      clearAuth();
      navigate('/login');
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

  return { login, logout, user, register };
};
