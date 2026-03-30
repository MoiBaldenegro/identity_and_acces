// src/presentation/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { SessionRepositoryPort } from '../../domain/repositories/session.repository.port';
import { ApplicationException } from '../../../shared/exceptions/application.exception';

export const authMiddleware = (sessionRepo: SessionRepositoryPort) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.cookies[ '__Host-session' ];   // nombre de cookie

    if (!sessionId) {
      throw new ApplicationException('No session found', 'UNAUTHORIZED', 401);
    }

    const session = await sessionRepo.findById(sessionId);

    if (!session) {
      res.clearCookie('__Host-session');
      throw new ApplicationException('Invalid or expired session', 'UNAUTHORIZED', 401);
    }

    // Adjuntamos el userId al request para que los controladores lo usen
    (req as any).userId = session.userId;
    (req as any).sessionId = sessionId;

    next();
  };
};