// src/domain/repositories/session.repository.port.ts
export interface SessionInfo {
  sessionId: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  expiresAt: Date;
  isCurrent?: boolean;
}

export interface SessionRepositoryPort {
  /**
   * Crea una nueva sesión y retorna el sessionId
   */
  create(
    userId: string, 
    ipAddress?: string, 
    userAgent?: string,
    rememberMe?: boolean
  ): Promise<string>;

  /**
   * Busca una sesión por su ID y retorna la información básica
   * (usado en el middleware de autenticación)
   */
  findById(sessionId: string): Promise<{
    userId: string;
    expiresAt: Date;
  } | null>;

  /**
   * Elimina una sesión específica (usado en logout)
   */
  delete(sessionId: string): Promise<void>;

  /**
   * Elimina TODAS las sesiones de un usuario
   * (protección contra Session Fixation + logout desde todos los dispositivos)
   */
  deleteAllForUser(userId: string, excludeSessionId?: string): Promise<void>;

  /**
   * Opcional: Limpia sesiones expiradas (puede llamarse desde un job)
   */
  cleanupExpiredSessions(): Promise<number>;

  /* 
  * Opcional: Retorna todas las sesiones activas de un usuario (para mostrar en el perfil)
  */
  getAllUserSessions(userId: string, currentSessionId?: string): Promise<SessionInfo[]>;
}