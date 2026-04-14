// src/application/use-cases/logout-single-device.use-case.ts

import { ApplicationException } from "../../../shared/exceptions/application.exception.js";
import { SessionRepositoryPort } from "../../domain/repositories/session.repository.port.js";


export class LogoutSingleDeviceUseCase {
  constructor(private readonly sessionRepo: SessionRepositoryPort) {}

  async execute(userId: string, sessionIdToDelete: string, currentSessionId: string): Promise<void> {
    if (!userId || !sessionIdToDelete) {
      throw new ApplicationException('User ID and Session ID are required', 'BAD_REQUEST', 400);
    }

    // No permitir cerrar la sesión actual desde esta ruta (por seguridad)
    if (sessionIdToDelete === currentSessionId) {
      throw new ApplicationException('Cannot logout current session this way', 'BAD_REQUEST', 400);
    }

    await this.sessionRepo.delete(sessionIdToDelete);
  }
}