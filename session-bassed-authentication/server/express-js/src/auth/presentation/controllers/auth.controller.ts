// src/presentation/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { RegisterUseCase } from '../../application/use-cases/register.uc.js';
import { LoginUseCase } from '../../application/use-cases/login.uc.js';
import { LogoutUseCase } from '../../application/use-cases/logout.uc.js';
import { RegisterDto } from '../../application/dtos/auth/register.dto.js';
import { LoginDto } from '../../application/dtos/auth/login.dto.js';
import { GetCurrentUserUseCase } from '../../application/use-cases/get-current-user.uc.js';
import { LogoutAllDevicesUseCase } from '../../application/use-cases/logout-all-devices-uc.js';
import { GetUserSessionsUseCase } from '../../application/use-cases/get-user-sessions.uc.js';
import { LogoutSingleDeviceUseCase } from '../../application/use-cases/logout-single-device.js';


export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase,
    private getCurrentUserUseCase: GetCurrentUserUseCase,
    private logoutAllDevicesUseCase: LogoutAllDevicesUseCase,
    private getUserSessionsUseCase: GetUserSessionsUseCase,
    private logoutSingleDeviceUseCase: LogoutSingleDeviceUseCase
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
      maxAge: dto.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 30 días si recordarme, 1 día si no
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

async getUserSessions(req: Request, res: Response) {
  const userId = (req as any).userId;
  const currentSessionId = (req as any).sessionId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const sessions = await this.getUserSessionsUseCase.execute(userId, currentSessionId);

  res.json({
    success: true,
    sessions: sessions.map(session => ({
      sessionId: session.sessionId,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      createdAt: session.createdAt,
      isCurrent: session.isCurrent,
      // Parseamos el user-agent para mostrar nombre amigable
      deviceInfo: this.parseUserAgent(session.userAgent)
    }))
  });
}

// Helper para mostrar un nombre más amigable del dispositivo y navegador
private parseUserAgent(userAgent?: string): string {
  if (!userAgent) return 'Dispositivo desconocido';

  // Detección de SO
  let os = 'Dispositivo';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Macintosh')) os = 'Mac';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';
  else if (userAgent.includes('Linux')) os = 'Linux';

  // Detección de Navegador
  let browser = 'Desconocido';
  // El orden es importante porque navegadores como Edge y Chrome incluyen "Safari"
  // y Edge incluye "Chrome" en la cadena de texto cruda.
  if (userAgent.includes('Edg/')) browser = 'Edge';
  else if (userAgent.includes('Firefox') || userAgent.includes('FxiOS')) browser = 'Firefox';
  else if (userAgent.includes('OPR/')) browser = 'Opera';
  else if (userAgent.includes('Chrome') || userAgent.includes('CriOS')) browser = 'Chrome';
  else if (userAgent.includes('Safari')) browser = 'Safari';

  return `${browser} en ${os}`;
}


// src/presentation/controllers/auth.controller.ts

async logoutSingleDevice(req: Request, res: Response) {
  const userId = (req as any).userId;
  const currentSessionId = (req as any).sessionId;
  const { sessionId } = req.params;   // sessionId a eliminar

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if(typeof sessionId !== 'string') {
    return res.status(400).json({ success: false, message: 'Session ID is required' });
  }

  try {
    await this.logoutSingleDeviceUseCase.execute(userId, sessionId, currentSessionId);

    res.status(200).json({
      success: true,
      message: 'Sesión cerrada correctamente'
    });
  } catch (error: any) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message || 'Error al cerrar sesión'
    });
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