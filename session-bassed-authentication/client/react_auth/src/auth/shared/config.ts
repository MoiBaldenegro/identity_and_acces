import { API_BASE_URL, SESSION_COOKIE_NAME } from "./constants";

interface AuthConfig {
  API_BASE_URL: string;
  COOKIE_NAME: string;
}

export const getAuthConfig = (): AuthConfig => {
  return {
    API_BASE_URL: API_BASE_URL,
    COOKIE_NAME: SESSION_COOKIE_NAME,
  };
}