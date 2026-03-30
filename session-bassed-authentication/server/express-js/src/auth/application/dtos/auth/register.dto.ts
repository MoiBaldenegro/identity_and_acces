// src/application/dtos/auth/register.dto.ts
import { z } from 'zod';

export const RegisterDto = z.object({
  email: z.string().email('Invalid email format').transform(e => e.toLowerCase().trim()),
  password: z.string().min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^A-Za-z0-9]/, 'Must contain special character'),
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
});

export type RegisterDtoType = z.infer<typeof RegisterDto>;

