// src/application/use-cases/logout-all-devices.use-case.ts

import { ApplicationException } from "../../../shared/exceptions/application.exception.js";
import { SessionRepositoryPort } from "../../domain/repositories/session.repository.port.js";

export class LogoutAllDevicesUseCase {
  constructor(private readonly sessionRepo: SessionRepositoryPort) {}

  async execute(userId: string, excludeSessionId?: string): Promise<void> {
    if (!userId) {
      throw new ApplicationException('User ID is required', 'BAD_REQUEST', 400);
    }

    await this.sessionRepo.deleteAllForUser(userId, excludeSessionId);
  }
}