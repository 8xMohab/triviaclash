import { z } from 'zod'
export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .max(25, { message: 'Password must be at most 25 characters' })
    .min(1, { message: 'Password is required' }),
})
export const registerFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, { message: 'Username must be at least 4 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    })
    .max(25, { message: 'Username must be at most 25 characters' })
    .min(1, { message: 'Username is required' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .max(25, { message: 'Password must be at most 25 characters' })
    .min(1, { message: 'Password is required' }),
})
