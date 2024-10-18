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

export const challengeSettingsFormSchema = z.object({
  numberOfQuestions: z
    .number({ invalid_type_error: 'Number of questions must be a number' })
    .min(5, { message: 'Number of questions must be at least 5' })
    .max(50, { message: 'Number of questions cannot exceed 50' })
    .nonnegative({ message: 'Number of questions cannot be negative' }),

  category: z
    .string({ invalid_type_error: 'Category must be a string' })
    .min(1, { message: 'Category ID cannot be empty' })
    .default('any'),

  difficulty: z
    .enum(['easy', 'medium', 'hard', 'any'], {
      invalid_type_error: 'Difficulty must be one of: easy, normal, hard, any',
    })
    .default('any'),

  type: z
    .enum(['multiple', 'boolean', 'any'], {
      invalid_type_error: 'Type must be one of: multiple, boolean, any',
    })
    .default('any'),
})

// New Preset schema that includes the name field and settings
export const presetFormSchema = z.object({
  name: z
    .string({ invalid_type_error: 'Preset name must be a string' })
    .min(3, { message: 'Preset name must be at least 3 characters' })
    .max(100, { message: 'Preset name cannot exceed 100 characters' }),

  settings: challengeSettingsFormSchema,
})
// Type for the form based on the schema
export type PresetFormType = z.infer<typeof presetFormSchema>
