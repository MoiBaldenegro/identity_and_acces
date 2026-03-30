// src/config/index.ts
import { config as envConfig } from './env';

export const config = {
  app: {
    port: envConfig.PORT,
    env: envConfig.NODE_ENV,
    isProduction: envConfig.NODE_ENV === 'production',
  },
  database: {
    url: envConfig.DATABASE_URL,
  },
  redis: {
    url: envConfig.REDIS_URL,
  },
  session: {
    secret: envConfig.SESSION_SECRET,
    cookieName: '__Host-session',           // Prefijo __Host- para mayor seguridad
    ttl: 24 * 60 * 60,                      // 24 horas en segundos
  },
  security: {
    rateLimit: {
      login: {
        windowMs: 15 * 60 * 1000,           // 15 minutos
        max: 5,                             // 5 intentos
      },
    },
  },
} as const;