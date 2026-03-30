// src/presentation/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { RegisterUseCase } from '../../application/use-cases/register.uc.js';
import { LoginUseCase } from '../../application/use-cases/login.uc.js';
import { LogoutUseCase } from '../../application/use-cases/logout.uc.js';
import { RegisterDto } from '../../application/dtos/auth/register.dto.js';
import { LoginDto } from '../../application/dtos/auth/login.dto.js';


export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase
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
}