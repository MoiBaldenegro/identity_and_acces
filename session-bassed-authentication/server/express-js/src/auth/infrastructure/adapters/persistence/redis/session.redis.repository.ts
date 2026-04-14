// src/infrastructure/adapters/persistence/redis/session.redis.repository.ts
import crypto from 'crypto';
import { SessionInfo, SessionRepositoryPort } from '../../../../domain/repositories/session.repository.port.js';
import { redis } from './redis.client.js';

const SESSION_PREFIX = 'sess:';
const SESSION_TTL = 24 * 60 * 60; // 24h en segundos (sincronizado con .env)

export class SessionRedisRepository implements SessionRepositoryPort {
  async create(userId: string, ip?: string, userAgent?: string, rememberMe?: boolean): Promise<string> {
    // Generación de session ID con alta entropía (protección contra fixation/predicción)
    const randomBytes = crypto.randomBytes(32).toString('hex');
    const sessionId = `${crypto.randomUUID()}.${randomBytes}`;

    const ttl = rememberMe ? 30 * 24 * 60 * 60 : SESSION_TTL; // 30 días o 1 día

    const sessionData = {
      userId,
      ipAddress: ip,
      userAgent,
      rememberMe: !!rememberMe,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + ttl * 1000).toISOString(),
    };

    const pipeline = redis.pipeline();

    await redis.setex(
      `${SESSION_PREFIX}${sessionId}`,
      ttl,
      JSON.stringify(sessionData)
    );

    // Guardamos el sessionId en el set del usuario
    pipeline.sadd(`user_sessions:${userId}`, sessionId);

    await pipeline.exec();

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
  // Calculamos la nueva fecha (ahora + 24h o 30d si es rememberMe)
  const ttl = parsed.rememberMe ? 30 * 24 * 60 * 60 : SESSION_TTL;
  const newExpirationDate = new Date(Date.now() + ttl * 1000);
  parsed.expiresAt = newExpirationDate.toISOString();
  
  // 3. ACTUALIZAR REDIS
  // Usamos setex para resetear el TTL de la llave y actualizar el JSON
  await redis.setex(
    key,
    ttl, 
    JSON.stringify(parsed)
  );

  return { userId: parsed.userId, expiresAt: newExpirationDate };
}
  async deleteAllForUser(userId: string, excludeSessionId?: string): Promise<void> {
    const userSessionsKey = `user_sessions:${userId}`;
    const sessionIds = await redis.smembers(userSessionsKey);
    if (sessionIds.length === 0) return;

    const pipeline = redis.pipeline();
    let deletedCount = 0;

    // Borramos cada sesión
    sessionIds.forEach((sessionId: string) => {
      if (sessionId === excludeSessionId) {
      return;
    }
      pipeline.del(`${SESSION_PREFIX}${sessionId}`);
    });

    // Borramos el set completo y lo reconstruimos solo con la sesión actual (si existe)
    pipeline.del(userSessionsKey);

    if (excludeSessionId) {
    pipeline.sadd(userSessionsKey, excludeSessionId);
  }

    await pipeline.exec();

    console.log(`[Session] Cerradas ${sessionIds.length} sesiones para el usuario ${userId}`);
  }

  async cleanupExpiredSessions(): Promise<number> {
    // Redis maneja expiración automáticamente, pero podríamos contar cuántas se eliminaron si queremos estadísticas.
    // Para simplicidad, retornamos 0 ya que no hacemos un conteo real.
    return 0;
  }


  async getAllUserSessions(userId: string, currentSessionId?: string): Promise<SessionInfo[]> {
    const useSessionsKey = `user_sessions:${userId}`;
    const sessionIds = await redis.smembers(useSessionsKey);
    if (sessionIds.length === 0) return [];

    const pipeline = redis.pipeline();
    sessionIds.forEach((sessionId: string) => {
      pipeline.get(`${SESSION_PREFIX}${sessionId}`);
    });

    const results = await pipeline.exec();
    const sessions: SessionInfo[] = [];
    results.forEach((result: [Error, string], index: number) => {
      if(result && typeof(result[1]) === 'string') {
        try {
          const data = JSON.parse(result[1]);
          sessions.push({
            sessionId: sessionIds[index],
            userId,
            ipAddress: data.ipAddress,
            userAgent: data.userAgent,
            createdAt: new Date(data.createdAt),
            expiresAt: new Date(data.expiresAt),
            isCurrent: sessionIds[index] === currentSessionId,
          });
        } catch (error) {
          // Si el JSON es inválido, simplemente lo ignoramos (podría ser una sesión corrupta)
          console.warn(`Sesión con ID ${sessionIds[index]} tiene datos corruptos y será ignorada.`);
        }
      }
    });

    return sessions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Ordenamos por fecha de creación (más reciente primero)
    
  }
    
}