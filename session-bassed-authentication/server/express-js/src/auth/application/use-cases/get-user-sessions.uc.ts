// src/application/use-cases/get-user-sessions.use-case.ts
import { SessionInfo, SessionRepositoryPort } from "../../domain/repositories/session.repository.port.js";

export class GetUserSessionsUseCase {
  constructor(private readonly sessionRepo: SessionRepositoryPort) {}

  async execute(userId: string, currentSessionId?: string): Promise<SessionInfo[]> {
    return this.sessionRepo.getAllUserSessions(userId, currentSessionId);
  }
}