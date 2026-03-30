// src/infrastructure/adapters/security/argon2.password.adapter.ts
import argon2 from 'argon2';
import { PasswordService } from '../../../domain/services/password.service';

export class Argon2PasswordAdapter implements PasswordService {
  private readonly options: argon2.Options = {
    type: argon2.argon2id,
    memoryCost: 65536,     // 64 MiB - OWASP 2026 recommendation
    timeCost: 3,           // iteraciones
    parallelism: 4,        // threads
    hashLength: 32,
  };

  async hash(password: string): Promise<string> {
    try {
      return await argon2.hash(password, this.options);
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }

  async compare(plainPassword: string, hash: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plainPassword);
    } catch {
      return false; 
    }
  }
}