// src/presentation/middlewares/security.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const securityMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    // Headers de seguridad adicionales
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

    next();
  };
};