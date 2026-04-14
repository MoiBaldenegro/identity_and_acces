// src/application/use-cases/get-current-user.use-case.ts

import { User } from "../../domain/entities/user.entity.js";
import { UserRepositoryPort } from "../../domain/repositories/user.repository.port.js";

export class GetCurrentUserUseCase {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async execute(userId: string): Promise<User | null> {
    if (!userId) return null;

    const user = await this.userRepo.findById(userId);
    if (!user) return null;

    return user;
  }
}
