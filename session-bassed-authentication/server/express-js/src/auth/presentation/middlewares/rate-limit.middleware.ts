// src/presentation/middlewares/rate-limit.middleware.ts
import rateLimit from 'express-rate-limit';
import { config } from '../../config';

const createRateLimiter = (windowMs: number, max: number, message: string) => 
  rateLimit({
    windowMs,
    max,
    message: { success: false, message },
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false },
  });

export const rateLimitMiddleware = {
  login: createRateLimiter(
    config.security.rateLimit.login.windowMs,
    config.security.rateLimit.login.max,
    'Too many login attempts. Please try again later RT.'
  ),
  general: () => rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: 'Too many requests',
  }),
};