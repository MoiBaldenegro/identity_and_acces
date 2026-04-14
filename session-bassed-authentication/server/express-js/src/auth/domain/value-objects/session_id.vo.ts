// src/domain/value-objects/session_id.vo.ts
export class SessionId {
  private constructor(public readonly value: string) {}

  static create(id: string): SessionId {
    if (!id || typeof id !== 'string' || id.length < 10) {
      throw new Error('Invalid session id');
    }
    return new SessionId(id);
  }
}
