// src/application/dtos/auth/login.dto.ts
import { z } from 'zod';

export const LoginDto = z.object({
  email: z.string().email().transform(e => e.toLowerCase().trim()),
  password: z.string().min(1),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginDtoType = z.infer<typeof LoginDto>;