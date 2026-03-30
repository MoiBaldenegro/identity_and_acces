// src/config/env.ts
import "dotenv/config"; // <--- AGREGA ESTA LÍNEA AQUÍ
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters'),
});

export const config = envSchema.parse(process.env);
export type Config = typeof config;