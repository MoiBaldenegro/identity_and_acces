// src/domain/value-objects/password.vo.ts
import { PasswordService } from '../services/password.service';

export class Password {
  private constructor(public readonly hash: string) {}

  static async create(plainPassword: string, passwordService: PasswordService): Promise<Password> {
    if (plainPassword.length < 12) {
      throw new Error('Password must be at least 12 characters');
    }
    const hash = await passwordService.hash(plainPassword);
    return new Password(hash);
  }

  async compare(plainPassword: string, passwordService: PasswordService): Promise<boolean> {
    return passwordService.compare(plainPassword, this.hash);
  }

  static fromHash(hash: string): Password {
    return new Password(hash);
  }
}