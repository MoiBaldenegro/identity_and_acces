// src/infrastructure/adapters/persistence/prisma/prisma.client.ts
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../../../../../generated/prisma/client.js';
import { config } from '../../../../config/env.js';


// Crear pool de conexiones con pg (mejor performance y control)
const connectionString = config.DATABASE_URL;   // o process.env.DATABASE_URL

const pool = new Pool({
  connectionString,
  max: 10,                    // máximo de conexiones en el pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,                    // ← Esto es lo que Prisma 7 requiere ahora
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
});

// Opcional: middleware de logging/auditoría
// prisma.$use(async (params, next) => {
//   const start = Date.now();
//   const result = await next(params);
//   const duration = Date.now() - start;

//   if (process.env.NODE_ENV === 'development' && params.model) {
//     console.log(`[Prisma Query] ${params.action} ${params.model} - ${duration}ms`);
//   }
//   return result;
// });

// Graceful shutdown (buena práctica)
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  await pool.end();
});

export default prisma;