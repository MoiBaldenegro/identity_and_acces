import type { UserEntity } from "../../domain/entities/user.entity";
import type { LoginData, RegisterData } from "../../domain/ports/auth.port";
import { useAuthDependenciesStore } from "../../infrastructure/store/useAuthStore";
import { useAuthStore } from "../store/useAuthStore";

interface UseAuthActions {
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  user: UserEntity | null;
  register: (userData: any) => Promise<void>;
}

export const useAuthActions = (): UseAuthActions => {
  const _login = useAuthDependenciesStore((state) => state.auth.login);
  const _logout = useAuthDependenciesStore((state) => state.auth.logout);
  const _register = useAuthDependenciesStore((state) => state.auth.register);

  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const user = useAuthStore((state) => state.user);

  const login = async ({ email, password }: LoginData) => {
    setLoading(true);
    try {
      const user = await _login.exec({ email, password });
      setAuth(user);
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await _logout.exec();
    clearAuth(); // Limpiamos el store de estado
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      await _register.exec(userData);
      const user = await _login.exec({ email: userData.email, password: userData.password });
      setAuth(user);
    } catch (error) {
      console.error('Error registering:', error);
    } finally {
      setLoading(false);
    }
  };

  return { login, logout, user, register };
};