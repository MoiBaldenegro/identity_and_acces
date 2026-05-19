import { ValueObject } from 'src/modules/common/ValueObject';
import { AUTH_USER_ID_REGEX } from './constants/regex';

/**
 * Value Object que encapsula el identificador único de un usuario autenticado.
 *
 * - Formato: UUID v1-v8 (RFC 4122).
 * - Inmutable: una vez creado, el ID no puede cambiar.
 * - Generado por la capa de dominio al crear el usuario autenticado (randomUUID).
 */
export class UserId extends ValueObject<string> {
  constructor(value: string) {
    super(value, 'user id must be a valid UUID');
  }

  protected validate(value: string): boolean {
    return AUTH_USER_ID_REGEX.test(value);
  }

  static create(id: string): UserId {
    return new UserId(id);
  }

  static generate(): string {
    return crypto.randomUUID();
  }
}
