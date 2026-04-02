import type { LoginData } from "../../domain/ports/auth.port";
import { useAuthDependenciesStore } from "../../infrastructure/store/useAuthStore";
import { useAuthStore } from "../store/useAuthStore";

interface UseAuthActions {
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthActions = (): UseAuthActions => {
  const _login = useAuthDependenciesStore((state) => state.auth.login);
  const _logout = useAuthDependenciesStore((state) => state.auth.logout);

  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setLoading = useAuthStore((state) => state.setLoading);

  const login = async ({ email, password }: LoginData) => {
    setLoading(true);
    try {
      const user = await _login.exec({ email, password });
      setAuth(user); // Guardamos en el store de estado
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await _logout.exec();
    clearAuth(); // Limpiamos el store de estado
  };

  return { login, logout };
};