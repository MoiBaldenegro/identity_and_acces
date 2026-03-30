// src/application/ports/auth.service.port.ts
import { RegisterDtoType } from '../dtos/auth/register.dto';
import { LoginDtoType } from '../dtos/auth/login.dto';

export interface AuthServicePort {
  register(dto: RegisterDtoType): Promise<{ userId: string; sessionId: string }>;
  login(dto: LoginDtoType, ip?: string, userAgent?: string): Promise<{ sessionId: string; user: any }>;
  logout(sessionId: string): Promise<void>;
  getCurrentUser(sessionId: string): Promise<any | null>;
}