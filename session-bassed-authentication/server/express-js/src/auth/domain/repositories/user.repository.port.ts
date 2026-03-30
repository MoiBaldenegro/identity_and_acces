// src/domain/repositories/user.repository.port.ts
import { User } from '../entities/user.entity';

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  create(user: { email: string; passwordHash: string; firstName?: string; lastName?: string }): Promise<User>;
  update(user: User): Promise<User>;

  // Métodos de seguridad (importantes para ingeniería en ciberseguridad)
  incrementFailedAttempts(userId: string): Promise<void>;
  resetFailedAttempts(userId: string): Promise<void>;
  lockAccount(userId: string, until: Date): Promise<void>;
  
  // Opcionales pero recomendados
  findById(id: string): Promise<User | null>;
  updatePassword(userId: string, newPasswordHash: string): Promise<void>;
  markEmailAsVerified(userId: string): Promise<void>;
}