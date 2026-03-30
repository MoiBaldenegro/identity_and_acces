// src/infrastructure/adapters/persistence/redis/session.redis.repository.ts
import crypto from 'crypto';
import { SessionRepositoryPort } from '../../../../domain/repositories/session.repository.port.js';
import { redis } from './redis.client.js';

const SESSION_PREFIX = 'sess:';
const SESSION_TTL = 24 * 60 * 60; // 24h en segundos (sincronizado con .env)

export class SessionRedisRepository implements SessionRepositoryPort {
  async create(userId: string, ip?: string, userAgent?: string): Promise<string> {
    // Generación de session ID con alta entropía (protección contra fixation/predicción)
    const randomBytes = crypto.randomBytes(32).toString('hex');
    const sessionId = `${crypto.randomUUID()}.${randomBytes}`;

    const sessionData = {
      userId,
      ipAddress: ip,
      userAgent,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + SESSION_TTL * 1000).toISOString(),
    };

    await redis.setex(
      `${SESSION_PREFIX}${sessionId}`,
      SESSION_TTL,
      JSON.stringify(sessionData)
    );

    return sessionId;
  }


  async delete(sessionId: string): Promise<void> {
    await redis.del(`${SESSION_PREFIX}${sessionId}`);
  }



async findById(sessionId: string): Promise<{ userId: string; expiresAt: Date } | null> {
  const key = `${SESSION_PREFIX}${sessionId}`;
  const data = await redis.get(key);
  
  if (!data) return null;

  const parsed = JSON.parse(data);
  const expiresAt = new Date(parsed.expiresAt);

  // 1. Verificar si ya expiró (Seguridad de "Doble Capa")
  if (expiresAt < new Date()) {
    await this.delete(sessionId); // Aquí llamamos a TU método que usa redis.del()
    return null;
  }

  // 2. LOGICA DE ROLLING (EL RESET)
  // Calculamos la nueva fecha (ahora + 24h)
  const newExpirationDate = new Date(Date.now() + SESSION_TTL * 1000);
  parsed.expiresAt = newExpirationDate.toISOString();
  
  // 3. ACTUALIZAR REDIS
  // Usamos setex para resetear el TTL de la llave y actualizar el JSON
  await redis.setex(
    key,
    SESSION_TTL, 
    JSON.stringify(parsed)
  );

  return { userId: parsed.userId, expiresAt: newExpirationDate };
}
  async deleteAllForUser(userId: string): Promise<void> {
    // En Redis puro es costoso escanear. En producción usaríamos un índice secundario o RedisJSON.
    // Por ahora (para simplicidad y aprendizaje) lo dejamos como TODO con comentario:
    // TODO: Implementar con Redis Set por usuario o usar KeyDB/Dragonfly para mejor soporte.
    console.warn('deleteAllForUser not fully implemented in Redis adapter yet');
  }

  async cleanupExpiredSessions(): Promise<number> {
    // Redis maneja expiración automáticamente, pero podríamos contar cuántas se eliminaron si queremos estadísticas.
    // Para simplicidad, retornamos 0 ya que no hacemos un conteo real.
    return 0;
  }
}