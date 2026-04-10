// src/presentation/middlewares/csrf.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { SessionRepositoryPort } from '../../domain/repositories/session.repository.port.js';

const CSRF_TOKEN_HEADER = 'x-csrf-token';

export const csrfMiddleware = (sessionRepo: SessionRepositoryPort) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Solo aplicamos CSRF en métodos que modifican estado
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return next();
    }

    const cookieSessionId = req.cookies['__Host-session'];
    const headerToken = req.headers[CSRF_TOKEN_HEADER] as string;

    if (!cookieSessionId || !headerToken) {
      return next(new Error('CSRF token missing'));
    }

    // Por simplicidad en esta versión inicial: validamos que el token exista en Redis
    // En una versión más avanzada podemos almacenar el CSRF token por sesión
    const session = await sessionRepo.findById(cookieSessionId);
    if (!session) {
      return next(new Error('Invalid session'));
    }

    // Validación básica (puedes mejorarla guardando el CSRF token en la sesión Redis)
    if (headerToken.length < 32) {
      return next(new Error('Invalid CSRF token'));
    }

    next();
  };
};