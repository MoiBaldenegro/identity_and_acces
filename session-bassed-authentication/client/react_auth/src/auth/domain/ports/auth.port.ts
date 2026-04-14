// Puerto para autenticación
// src/domain/ports/auth.port.ts
import type { UserEntity } from "../entities/user.entity";


export interface AuthPort {
  register(data: RegisterData): Promise<{ userId: string; sessionId?: string }>;
  login(data: LoginData): Promise<UserEntity>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<UserEntity | null>;
  logoutAll(): Promise<void>;
  getUserSessions(): Promise<{ success: boolean, sessions: SessionInfo[] }[]>;
  logoutSingleDevice(sessionId: string): Promise<void>;
}

export type RegisterData = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type LoginData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export interface SessionInfo {
  sessionId: string;
  createdAt: string;
  lastAccessedAt: string;
  userAgent: string;
  ipAddress: string;
}

