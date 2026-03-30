// src/presentation/server.ts  (versión final)
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.middleware';
import { securityMiddleware } from './middlewares/security.middleware';

export const createServer = () => {
  const app = express();

  // Security headers
  app.use(securityMiddleware());
  app.use(helmet({
    contentSecurityPolicy: true,
    hsts: true,
    noSniff: true,
    xssFilter: true,
    frameguard: { action: 'deny' },
  }));

  app.use(cors({
    origin: true, // Cambiar en producción
    credentials: true,
  }));

  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(cookieParser());

  // Health check
  app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

  app.use(errorMiddleware);

  return app;
};