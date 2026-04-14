import { LoginUseCase } from "./auth/application/use-cases/login.uc.js";
import { LogoutUseCase } from "./auth/application/use-cases/logout.uc.js";
import { RegisterUseCase } from "./auth/application/use-cases/register.uc.js";
import { UserPrismaRepository } from "./auth/infrastructure/adapters/persistence/prisma/user.prisma.repository.js";
import { SessionRedisRepository } from "./auth/infrastructure/adapters/persistence/redis/session.redis.repository.js";
import { Argon2PasswordAdapter } from "./auth/infrastructure/adapters/security/argon2.password.adapter.js";
import { AuthController } from "./auth/presentation/controllers/auth.controller.js";
import createAuthRoutes from "./auth/presentation/routes/auth.routes.js";
import { config } from "./auth/config/index.js";
import { createServer } from "./auth/presentation/server.js";
import { GetCurrentUserUseCase } from "./auth/application/use-cases/get-current-user.uc.js";
import { LogoutAllDevicesUseCase } from "./auth/application/use-cases/logout-all-devices-uc.js";



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

    const getCurrentUserUseCase = new GetCurrentUserUseCase(userRepository);

    const logoutAllDevicesUseCase = new LogoutAllDevicesUseCase(sessionRepository);

    // ==================== CONTROLLER ====================
    const authController = new AuthController(
      registerUseCase,
      loginUseCase,
      logoutUseCase,
      getCurrentUserUseCase,
      logoutAllDevicesUseCase

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