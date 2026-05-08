import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const passwordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type AdminLogin = z.infer<typeof adminLoginSchema>;
export type PasswordReset = z.infer<typeof passwordResetSchema>;
