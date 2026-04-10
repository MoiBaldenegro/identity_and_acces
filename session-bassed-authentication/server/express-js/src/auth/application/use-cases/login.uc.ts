// src/application/use-cases/login.use-case.ts

import { ApplicationException } from "../../../shared/exceptions/application.exception.js";
import { User } from "../../domain/entities/user.entity.js";
import { SessionRepositoryPort } from "../../domain/repositories/session.repository.port.js";
import { UserRepositoryPort } from "../../domain/repositories/user.repository.port.js";
import { PasswordService } from "../../domain/services/password.service.js";
import { Email } from "../../domain/value-objects/email.vo.js";
import { Password } from "../../domain/value-objects/password.vo.js";
import { LoginDtoType } from "../dtos/auth/login.dto.js";


export class LoginUseCase {
  private readonly MAX_FAILED_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION_MINUTES = 15;

  constructor(
    private readonly userRepo: UserRepositoryPort,
    private readonly sessionRepo: SessionRepositoryPort,
    private readonly passwordService: PasswordService
  ) {}

  async execute(dto: LoginDtoType, ip?: string, userAgent?: string): Promise<{ sessionId: string; user: any }> {
    const emailVO = Email.create(dto.email);
    let user = await this.userRepo.findByEmail(emailVO.value);

    if (!user) {
      // No revelar si el email existe (prevención de enumeration)
      throw new ApplicationException('Invalid credentials', 'INVALID_CREDENTIALS');
    }

    // === NUEVA LÓGICA: Verificar si ya pasó el tiempo de bloqueo ===
    if (user.lockedUntil && user.lockedUntil < new Date()) {
      console.log(`[Login] Liberando cuenta ${user.email} automáticamente`);
      await this.userRepo.resetFailedAttempts(user.id);   // Esto limpia lockedUntil
      user = await this.userRepo.findByEmail(emailVO.value); // Refrescamos el usuario
    }

   // Ahora sí verificamos si sigue bloqueada
    if (user.isAccountLocked()) {
      const remainingMinutes = Math.ceil(
        (user.lockedUntil!.getTime() - Date.now()) / 60000
      );

      throw new ApplicationException(
        `Account is locked. Try again in ${remainingMinutes} minutes.`,
        'ACCOUNT_LOCKED',
        429
      );
    }

    const passwordVO =Password.fromHash(user.passwordHash); // en realidad solo usamos el hash
    const isValidPassword = await passwordVO.compare(dto.password, this.passwordService);

    if (!isValidPassword) {
      await this.userRepo.incrementFailedAttempts(user.id.value);
      
      // Lógica de lockout (puedes moverla al entity)
      if (user.failedLoginAttempts + 1 >= this.MAX_FAILED_ATTEMPTS) {
        const lockUntil = new Date(Date.now() + this.LOCKOUT_DURATION_MINUTES * 60 * 1000);
        await this.userRepo.lockAccount(user.id.value, lockUntil);
      }

      throw new ApplicationException('Invalid credentials', 'INVALID_CREDENTIALS');
    }

    // Reset failed attempts on successful login
    await this.userRepo.resetFailedAttempts?.(user.id.value); // si implementas el método

    // Regenerar sesión (protección contra Session Fixation)
    // MOISES: Me parece que e4sta es lñ amanera de tener al usuario logueado solo en lugar a la vez, pero no se si es buena idea eliminar todas las sesiones anteriores. Quizás solo la actual?
    await this.sessionRepo.deleteAllForUser(user.id.value); // opcional: invalidar sesiones anteriores

    const sessionId = await this.sessionRepo.create(user.id.value, ip, userAgent);

    // Actualizar lastLoginAt (inmutable)
    const updatedUser = new User({
      ...user.toPrimitives(),
      lastLoginAt: new Date()
    });
    await this.userRepo.update(updatedUser);

    return { sessionId, user: { id: user.id.value, email: user.email, firstName: user.firstName } };
  }
}