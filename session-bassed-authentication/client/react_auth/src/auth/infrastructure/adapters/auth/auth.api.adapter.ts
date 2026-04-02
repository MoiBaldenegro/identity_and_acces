// src/infrastructure/adapters/auth/auth.api.adapter.ts
import { createUser, type UserEntity } from "../../../domain/entities/user.entity";
import type { AuthPort, LoginData, RegisterData } from "../../../domain/ports/auth.port";
import type { HttpClientPort } from "../../../domain/ports/http-client.port";
import { getAuthConfig } from "../../../shared/config";

interface UserApiResponse {
    id: string;
    email: {
        value: string;
    };
    firstName: string;
}


export function authApiAdapter(httpClient: HttpClientPort): AuthPort {

    const {API_BASE_URL} = getAuthConfig();

  const register = async (data: RegisterData): Promise<{ userId: string }> => {
    const api_url = new URL("api/auth/register", API_BASE_URL).href;
    if(!api_url ) throw new Error("Invalid API URL");

    const response = await httpClient.post<{ success: boolean; userId?: string }>(
      api_url,
      data
    );
    return { userId: response.userId || '' };
  }

  const login = async (data: LoginData): Promise<UserEntity> => {
    const api_url = new URL("api/auth/login", API_BASE_URL).href;
    if(!api_url ) throw new Error("Invalid API URL");

    const response  = await httpClient.post<{
      success: boolean;
      user: UserApiResponse;
    }>(api_url, data);

    return createUser(response.user.id, response.user.email.value, response.user.firstName, "APIMODIFY_LASTNAME");
  }

  const logout = async (): Promise<void> => {
    const api_url = new URL("api/auth/logout", API_BASE_URL).href;
    if(!api_url ) throw new Error("Invalid API URL");
    await httpClient.post(api_url, {});
  }

  const getCurrentUser = async (): Promise<UserEntity | null> => {
    const api_url = new URL("api/auth/me", API_BASE_URL).href;
    if(!api_url ) throw new Error("Invalid API URL");
    try {
      const response = await httpClient.get<{
        success: boolean;
        userId: string;
      }>(api_url);

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