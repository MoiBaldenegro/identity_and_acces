import { ApplicationException } from "../../../shared/exceptions/application.exception.js";
import { User } from "../../domain/entities/user.entity.js";
import { SessionRepositoryPort } from "../../domain/repositories/session.repository.port.js";
import { UserRepositoryPort } from "../../domain/repositories/user.repository.port.js";
import { PasswordService } from "../../domain/services/password.service.js";
import { Email } from "../../domain/value-objects/email.vo.js";
import { Password } from "../../domain/value-objects/password.vo.js";
import { RegisterDtoType } from "../dtos/auth/register.dto.js";

export class RegisterUseCase {
  constructor(
    private readonly userRepo: UserRepositoryPort,
    private readonly sessionRepo: SessionRepositoryPort,
    private readonly passwordService: PasswordService
  ) {}

  async execute(dto: RegisterDtoType, ip?: string, userAgent?: string): Promise<{ userId: string; sessionId: string }> {
    const emailVO = Email.create(dto.email);

    // Check if user already exists
    const existingUser = await this.userRepo.findByEmail(emailVO.value);
    if (existingUser) {
      throw new ApplicationException('User with this email already exists', 'USER_ALREADY_EXISTS');
    }

    // Create secure password
    const passwordVO = await Password.create(dto.password, this.passwordService);

    // Solo incluir firstName y lastName si existen
    const userData: { email: string; passwordHash: string; firstName?: string; lastName?: string } = {
      email: emailVO.value,
      passwordHash: passwordVO.hash,
      ...(dto.firstName ? { firstName: dto.firstName } : {}),
      ...(dto.lastName ? { lastName: dto.lastName } : {}),
    };

    const createdUser = await this.userRepo.create(userData);

    // Crear sesión inmediatamente después del registro (buena UX)
    const sessionId = await this.sessionRepo.create(createdUser.id.value, ip, userAgent);

    return { userId: createdUser.toPrimitives().id.value, sessionId };
  }
}