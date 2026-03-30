// src/application/use-cases/logout.use-case.ts
import { ApplicationException } from '../../../shared/exceptions/application.exception';
import { SessionRepositoryPort } from '../../domain/repositories/session.repository.port';

export class LogoutUseCase {
  constructor(private readonly sessionRepo: SessionRepositoryPort) {}

  async execute(sessionId: string): Promise<void> {
    if (!sessionId) {
      throw new ApplicationException('No session ID provided', 'BAD_REQUEST', 400);
    }

    await this.sessionRepo.delete(sessionId);
  }
}