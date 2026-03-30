// src/domain/value-objects/email.vo.ts
export class Email {
  private constructor(public readonly value: string) {}

  static create(email: string): Email {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format');
    }
    return new Email(email.toLowerCase().trim());
  }
}