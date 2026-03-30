// src/infrastructure/adapters/persistence/prisma/user.prisma.repository.ts

import { User } from "../../../../domain/entities/user.entity.js";
import { UserRepositoryPort } from "../../../../domain/repositories/user.repository.port.js";
import prisma from "./prisma.client.js";


export class UserPrismaRepository implements UserRepositoryPort {

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return this.mapToEntity(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    return this.mapToEntity(user);
  }

  async create(user: { email: string; passwordHash: string; firstName?: string; lastName?: string }): Promise<User> {
    const created = await prisma.user.create({
      data: {
        email: user.email,
        passwordHash: user.passwordHash,
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
      },
    });
    return this.mapToEntity(created);
  }

  async update(user: User): Promise<User> {
    const updated = await prisma.user.update({
      where: { id: user.id.value },
      data: {
        failedLoginAttempts: user.failedLoginAttempts,
        lockedUntil: user.lockedUntil ?? null,
        lastLoginAt: user.lastLoginAt ?? null,
        passwordChangedAt: user.passwordChangedAt,
      },
    });

    return this.mapToEntity(updated);
  }

  async incrementFailedAttempts(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { failedLoginAttempts: { increment: 1 } },
    });
  }

  async resetFailedAttempts(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { 
        failedLoginAttempts: 0,
        lockedUntil: null 
      },
    });
  }

  async lockAccount(userId: string, until: Date): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { lockedUntil: until },
    });
  }

  async updatePassword(userId: string, newPasswordHash: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { 
        passwordHash: newPasswordHash,
        passwordChangedAt: new Date()
      },
    });
  }

  async markEmailAsVerified(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: new Date() },
    });
  }

  // Helper privado para mapear Prisma → Entity (evita duplicación de código)
  private mapToEntity(prismaUser: any): User {
    return new User({
      id: prismaUser.id,
      email: prismaUser.email,
      passwordHash: prismaUser.passwordHash,
      firstName: prismaUser.firstName ?? undefined,
      lastName: prismaUser.lastName ?? undefined,
      emailVerified: prismaUser.emailVerified,
      failedLoginAttempts: prismaUser.failedLoginAttempts,
      lockedUntil: prismaUser.lockedUntil ?? undefined,
      lastLoginAt: prismaUser.lastLoginAt ?? undefined,
      passwordChangedAt: prismaUser.passwordChangedAt ?? undefined,
    });
  }
}