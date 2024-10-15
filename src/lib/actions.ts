'use server'

import { AuthError } from 'next-auth'
import { connectDb } from './dbConnect'
import { loginFormSchema, registerFormSchema } from './zodSchema'
import { z, ZodError } from 'zod'
import { signIn, signOut } from '@/auth'
import User from './models/user'
import bcrypt from 'bcryptjs'

export async function signInAction(
  prevState: undefined,
  formData: z.infer<typeof loginFormSchema>
) {
  try {
    const validatedData = loginFormSchema.parse(formData)
    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    })
    return { success: true }
  } catch (error) {
    if (error instanceof ZodError) {
      return { message: error.message }
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Inavlid Credentials.' }
        // if the error is a provider error we're gonna say
        // this account is not registered
        default:
          return { message: `${error}` }
      }
    }
    return { message: `${error}` }
  }
}
export async function register(
  prevState: { message: string } | undefined,
  formData: z.infer<typeof registerFormSchema>
) {
  try {
    const schema = await User()
    await connectDb()
    const validatedData = registerFormSchema.parse(formData)
    const { username, email, password } = validatedData
    const hasUsername = await schema.findOne({ username })
    if (hasUsername) throw new Error('Username already exists.')
    const hasEmail = await schema.findOne({ email })
    if (hasEmail) throw new Error('Email is arleady used.')

    const hashedPassword = await bcrypt.hash(password, 10)
    const res = await schema.create({
      username,
      email,
      password: hashedPassword,
    })
    if (!res) throw new Error('Failed to register a user.')
    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    })
    return {
      toast: {
        title: 'User Created Successfully.',
        description: `Username: ${res.username}, joined at: ${res.joiningDate}`,
      },
      message: '',
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return { message: error.message }
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Inavlid Credentials.' }
        // if the error is a provider error we're gonna say
        // this account is not registered
        default:
          return { message: 'Something went wrong.' }
      }
    }
    return { message: `${error}` }
  }
}

export const signOutAction = async () => {
  await signOut({ redirectTo: '/' })
}
