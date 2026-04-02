// src/infrastructure/adapters/auth/auth.api.adapter.ts
import { createUser, type UserEntity } from "../../../domain/entities/user.entity";
import type { AuthPort, LoginData, RegisterData } from "../../../domain/ports/auth.port";
import type { HttpClientPort } from "../../../domain/ports/http-client.port";
import { getAuthConfig } from "../../../shared/config";


export function authApiAdapter(httpClient: HttpClientPort): AuthPort {

    const {API_BASE_URL} = getAuthConfig();

  const register = async (data: RegisterData): Promise<{ userId: string }> => {
    const response = await httpClient.post<{ success: boolean; userId?: string }>(
      `${API_BASE_URL}/auth/register`,
      data
    );
    return { userId: response.userId || '' };
  }

  const login = async (data: LoginData): Promise<UserEntity> => {
    const response = await httpClient.post<{
      success: boolean;
      user: { id: string; email: string; firstName?: string; lastName?: string };
    }>(`${API_BASE_URL}/auth/login`, data);

    return createUser(response.user.id, response.user.email, response.user.firstName, response.user.lastName);
  }

  const logout = async (): Promise<void> => {
    await httpClient.post(`${API_BASE_URL}/auth/logout`, {});
  }

  const getCurrentUser = async (): Promise<UserEntity | null> => {
    try {
      const response = await httpClient.get<{
        success: boolean;
        userId: string;
      }>(`${API_BASE_URL}/auth/me`);

      return createUser(response.userId, ''); 
    } catch (error) {
        console.error('Error fetching current user:', error);
      return null;
    }
  }

  return {
    register,
    login,
    logout,
    getCurrentUser
  }
}