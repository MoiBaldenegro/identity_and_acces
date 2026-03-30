import { LoginUseCase } from "./auth/application/use-cases/login.uc";
import { LogoutUseCase } from "./auth/application/use-cases/logout.uc";
import { RegisterUseCase } from "./auth/application/use-cases/register.uc";
import { UserPrismaRepository } from "./auth/infrastructure/adapters/persistence/prisma/user.prisma.repository";
import { SessionRedisRepository } from "./auth/infrastructure/adapters/persistence/redis/session.redis.repository";
import { Argon2PasswordAdapter } from "./auth/infrastructure/adapters/security/argon2.password.adapter";
import { AuthController } from "./auth/presentation/controllers/auth.controller";
import createAuthRoutes from "./auth/presentation/routes/auth.routes";
import { config } from "./auth/config";
import { createServer } from "./auth/presentation/server";


async function bootstrap() {
  try {
    console.log('🚀 Iniciando servidor de autenticación...');

    // ==================== INFRASTRUCTURE ADAPTERS ====================
    const userRepository = new UserPrismaRepository();
    const sessionRepository = new SessionRedisRepository();
    const passwordService = new Argon2PasswordAdapter();

    // ==================== APPLICATION USE CASES ====================
    const registerUseCase = new RegisterUseCase(
      userRepository,
      sessionRepository,
      passwordService
    );

    const loginUseCase = new LoginUseCase(
      userRepository,
      sessionRepository,
      passwordService
    );

    const logoutUseCase = new LogoutUseCase(sessionRepository);

    // ==================== CONTROLLER ====================
    const authController = new AuthController(
      registerUseCase,
      loginUseCase,
      logoutUseCase
    );

    // ==================== EXPRESS SERVER ====================
    const app = createServer();

    // Inyectar dependencias en las rutas (como no usamos decorators ni Inversify)
    // Reemplazamos las rutas dinámicamente o pasamos el controller

    // Mejor enfoque: Crear un router con controller inyectado
    const authRouter = createAuthRoutes(authController, sessionRepository);

    // Montar rutas
    app.use('/api/auth', authRouter);

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📊 Environment: ${config.app.env}`);
      console.log(`🔐 Session store: Redis`);
      console.log(`🛡️  Password hashing: Argon2id`);
    });

  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
    process.exit(1);
  }
}

bootstrap();