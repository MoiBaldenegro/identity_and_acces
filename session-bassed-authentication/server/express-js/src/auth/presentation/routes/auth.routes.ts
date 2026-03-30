// src/presentation/routes/auth.routes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { SessionRepositoryPort } from '../../domain/repositories/session.repository.port';
import { rateLimitMiddleware } from '../middlewares/rate-limit.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

export default function createAuthRoutes(
  controller: AuthController,
  sessionRepo: SessionRepositoryPort
) {
  const router = Router();

  // Rutas públicas
  router.post('/register', 
    rateLimitMiddleware.login,
    (req: Request, res: Response, next: NextFunction) => 
      controller.register(req, res).catch(next)
  );

  router.post('/login', 
    rateLimitMiddleware.login,
    (req: Request, res: Response, next: NextFunction) => 
      controller.login(req, res).catch(next)
  );

  // Rutas protegidas
  router.post('/logout', 
    authMiddleware(sessionRepo),
    csrfMiddleware(sessionRepo),
    (req: Request, res: Response, next: NextFunction) => 
      controller.logout(req, res).catch(next)
  );

  // Ruta para obtener usuario actual (protegida)
  router.get('/me', 
    authMiddleware(sessionRepo),
    async (req: Request, res: Response) => {
      const userId = (req as any).userId;
      res.json({ success: true, userId });
    }
  );

  return router;
}