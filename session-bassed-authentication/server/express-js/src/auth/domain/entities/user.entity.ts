// src/domain/entities/user.entity.ts
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';
import { SessionId } from '../value-objects/session_id.vo';

export class User {
  public readonly id: SessionId;
  public readonly email: Email;
  public readonly passwordHash: string;
  public readonly firstName?: string | undefined;
  public readonly lastName?: string | undefined;
  public readonly emailVerified: boolean;
  public readonly failedLoginAttempts: number;
  public readonly lockedUntil?: Date | undefined;
  public readonly lastLoginAt?: Date | undefined;
  public readonly passwordChangedAt: Date;

  constructor(params: {
    id: string,
    email: string,
    passwordHash: string,
    firstName?: string | undefined,
    lastName?: string | undefined,
    emailVerified?: boolean,
    failedLoginAttempts?: number,
    lockedUntil?: Date | undefined,
    lastLoginAt?: Date | undefined,
    passwordChangedAt?: Date
  }) {
    this.id = SessionId.create(params.id);
    this.email = Email.create(params.email);
    this.passwordHash = params.passwordHash;
    this.firstName = params.firstName ?? undefined;
    this.lastName = params.lastName ?? undefined;
    this.emailVerified = params.emailVerified ?? false;
    this.failedLoginAttempts = params.failedLoginAttempts ?? 0;
    this.lockedUntil = params.lockedUntil ?? undefined;
    this.lastLoginAt = params.lastLoginAt ?? undefined;
    this.passwordChangedAt = params.passwordChangedAt ?? new Date();
  }

  isAccountLocked(): boolean {
    return this.lockedUntil ? this.lockedUntil > new Date() : false;
  }

  incrementFailedAttempts(): User {
    const attempts = this.failedLoginAttempts + 1;
    let lockedUntil = this.lockedUntil;
    if (attempts >= 5) {
      lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
    }
    return new User({
      ...this.toPrimitives(),
      failedLoginAttempts: attempts,
      lockedUntil
    });
  }

  resetFailedAttempts(): User {
    return new User({
      ...this.toPrimitives(),
      failedLoginAttempts: 0,
      lockedUntil: undefined
    });
  }

  toPrimitives() {
    return {
      id: this.id.value,
      email: this.email.value,
      passwordHash: this.passwordHash,
      firstName: this.firstName ?? undefined,
      lastName: this.lastName ?? undefined,
      emailVerified: this.emailVerified,
      failedLoginAttempts: this.failedLoginAttempts,
      lockedUntil: this.lockedUntil ?? undefined,
      lastLoginAt: this.lastLoginAt ?? undefined,
      passwordChangedAt: this.passwordChangedAt
    };
  }
}