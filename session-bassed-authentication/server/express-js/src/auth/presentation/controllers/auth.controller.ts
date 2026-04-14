// src/presentation/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { RegisterUseCase } from '../../application/use-cases/register.uc.js';
import { LoginUseCase } from '../../application/use-cases/login.uc.js';
import { LogoutUseCase } from '../../application/use-cases/logout.uc.js';
import { RegisterDto } from '../../application/dtos/auth/register.dto.js';
import { LoginDto } from '../../application/dtos/auth/login.dto.js';
import { GetCurrentUserUseCase } from '../../application/use-cases/get-current-user.uc.js';
import { LogoutAllDevicesUseCase } from '../../application/use-cases/logout-all-devices-uc.js';


export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase,
    private getCurrentUserUseCase: GetCurrentUserUseCase,
    private logoutAllDevicesUseCase: LogoutAllDevicesUseCase
  ) {}

  async register(req: Request, res: Response) {
    const dto = RegisterDto.parse(req.body);
    const { sessionId } = await this.registerUseCase.execute(
      dto, 
      req.ip, 
      req.headers['user-agent'] || undefined
    );

    res.cookie('__Host-session', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,   // 24 horas
      path: '/',
    });

    res.status(201).json({ success: true, message: 'User registered successfully' });
  }

  async login(req: Request, res: Response) {
    const dto = LoginDto.parse(req.body);
    const result = await this.loginUseCase.execute(
      dto,
      req.ip,
      req.headers['user-agent'] || undefined
    );

    res.cookie('__Host-session', result.sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.json({ 
      success: true, 
      user: result.user 
    });
  }

  async logout(req: Request, res: Response) {
    const sessionId = (req as any).sessionId;
    await this.logoutUseCase.execute(sessionId);

    res.clearCookie('__Host-session');
    res.json({ success: true, message: 'Logged out successfully' });
  }


  // src/presentation/controllers/auth.controller.ts
async getCurrentUser(req: Request, res: Response) {
  const userId = (req as any).userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const user = await this.getCurrentUserUseCase.execute(userId);   // inyecta el use case

  if (!user) {
    return res.status(401).json({ success: false, message: 'User not found' });
  }

  // Devolvemos solo datos NO sensibles
  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }
  });
}

// src/presentation/controllers/auth.controller.ts

async logoutAllDevices(req: Request, res: Response) {
  const userId = (req as any).userId;
  const currentSessionId = (req as any).sessionId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    await this.logoutAllDevicesUseCase.execute(userId, currentSessionId);

  // Opcional: Cerrar también la sesión actual
  // const currentSessionId = (req as any).sessionId;
  // if (currentSessionId) {
  //   await this.sessionRepo.delete(currentSessionId);   // borramos la actual también
  // }

  res.clearCookie('__Host-session');
  res.clearCookie('__Host-csrf-token');

  res.json({
    success: true,
    message: 'Se ha cerrado sesión en todos los dispositivos'
  });
   } catch (err) {
    console.error('Error en logoutAllDevices:', err);
    res.status(500).json({ success: false, message: 'Error al cerrar sesiones' });
   }
}

// private setCsrfToken(res: Response) {
//   const csrfToken = crypto.randomBytes(32).toString('hex');

//   res.cookie(CSRF_COOKIE_NAME, csrfToken, {
//     httpOnly: false,           // ← Importante: frontend debe poder leerlo
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     maxAge: 24 * 60 * 60 * 1000,
//     path: '/'
//   });
// }
}