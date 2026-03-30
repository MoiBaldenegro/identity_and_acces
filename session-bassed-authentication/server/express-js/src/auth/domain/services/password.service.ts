// src/domain/services/password.service.ts
export interface PasswordService {
  hash(password: string): Promise<string>;
  compare(plainPassword: string, hash: string): Promise<boolean>;
}