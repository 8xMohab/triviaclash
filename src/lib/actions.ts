'use server'

import { AuthError } from 'next-auth'
import { connectDb } from './dbConnect'
import {
  challengeSettingsFormSchema,
  loginFormSchema,
  presetFormSchema,
  PresetFormType,
  registerFormSchema,
} from './zodSchema'
import { z } from 'zod'
import { signIn, signOut } from '@/auth'
import User from './models/user'
import bcrypt from 'bcryptjs'
import { PresetType } from './models/schemas/preset'
import getUserModel from './models/user'
import mongoose from 'mongoose'
import { challengeSettings } from '@/app/(private routes)/challenge/challenge-settings-form'
import getChallengeModel from './models/challenge'
import { constructApiUrl } from './constructApiUrl'
import { QuestionType } from './models/schemas/question'

export type api_response = {
  response_code: number
  results: QuestionType[]
}
// custom error classs for invalidating fields in the response
export type registerFields = keyof z.infer<typeof registerFormSchema>
type FieldError = {
  name: registerFields | 'name'
  message: string
}

class CustomError extends Error {
  field: FieldError

  constructor(message: string, field: FieldError) {
    super(message)
    this.field = field
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}
class ActiveChallengeError extends Error {
  challengeId: string

  constructor(message: string, challengeId: string) {
    super(message)
    this.challengeId = challengeId
    Object.setPrototypeOf(this, ActiveChallengeError.prototype)
  }
}

export type State = {
  success?: string
  error?: string
  fields?: FieldError[]
  challengeId?: string
}

export async function authenticateUser(
  formData: z.infer<typeof loginFormSchema>
): Promise<State> {
  try {
    const validatedData = loginFormSchema.parse(formData)
    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    })
    return { success: 'User has been authenticated!' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials.' }
        // if the error is a provider error we're gonna say
        // this account is not registered
        default:
          return { error: 'Failed to authenticate.' }
      }
    }
    return { error: `Something went wrong. ${error}` }
  }
}
export async function createUser(
  formData: z.infer<typeof registerFormSchema>
): Promise<State> {
  try {
    const validatedData = registerFormSchema.parse(formData)
    const { username, email, password } = validatedData

    const userModel = await User()
    await connectDb()

    const usernameExists = await userModel.findOne({ username }).lean()
    if (usernameExists)
      throw new CustomError('Inavlid input fields.', {
        message: 'Username is already used.',
        name: 'username',
      })

    const emailExists = await userModel.findOne({ email })
    if (emailExists)
      throw new CustomError('Inavlid input fields.', {
        message: 'Email is already used.',
        name: 'email',
      })

    const hashedPassword = await bcrypt.hash(password, 10)

    const res = await userModel.create({
      username,
      email,
      password: hashedPassword,
    })
    if (!res) throw new Error('Failed to create a user.')
    return {
      success: `User: ${res.username} was created successfuly at: ${res.joiningDate}`,
    }
  } catch (error) {
    if (error instanceof CustomError) {
      return {
        error: error.message,
        fields: [error.field],
      }
    }
    return {
      error: 'Failed to create a user.',
    }
  }
}

export const signOutAction = async () => {
  await signOut({ redirectTo: '/' })
}

export const addPreset = async (
  presetData: PresetFormType,
  userId: string | undefined
): Promise<State> => {
  try {
    const validatedPreset = presetFormSchema.parse(presetData)
    if (!userId) throw new Error('No user id provided.')

    const userModel = await getUserModel()
    await connectDb()

    const objectId = new mongoose.Types.ObjectId(userId)
    const user = await userModel.findById(objectId)
    if (!user) throw new Error('Failed to find the user')

    const presetExists = user.presets.some(
      (preset: PresetType) => preset.name === presetData.name
    )
    if (presetExists)
      throw new CustomError('Failed to create a preset.', {
        name: 'name',
        message: 'Preset name is already used.',
      })

    user.presets.push(validatedPreset)
    await user.save()
    return { success: 'Preset has been created successfuly.' }
  } catch (error) {
    if (error instanceof CustomError)
      return {
        error: error.message,
        fields: [error.field],
      }
    return {
      error: 'Failed to create a preset.',
    }
  }
}

export const createChallenge = async (
  challengeSettings: challengeSettings,
  userId: string | undefined
): Promise<State> => {
  try {
    const baseUrl = 'https://opentdb.com/api.php'
    const validatedSettings =
      challengeSettingsFormSchema.parse(challengeSettings)
    if (!userId) throw new Error('No user id provided.')

    const challengeModel = await getChallengeModel()
    await connectDb()
    const challengeActive = await challengeModel
      .findOne({ status: 'active' })
      .lean()
    if (challengeActive)
      throw new ActiveChallengeError(
        "There's an already active challenge.",
        challengeActive._id.toString()
      )

    const apiUrl = constructApiUrl(baseUrl, validatedSettings)
    const res = await fetch(apiUrl)
    if (!res.ok)
      throw new Error('Failed to get the questions, Please try again.')
    const { results: questions }: api_response = await res.json()

    const challenge = await challengeModel.create({
      user: userId,
      questions,
      settings: validatedSettings,
    })
    return { success: `${challenge._id}` }
  } catch (error) {
    if (error instanceof ActiveChallengeError)
      return { error: `${error.message}`, challengeId: error.challengeId }
    if (error instanceof Error) return { error: `${error.message}` }
    return {
      error: 'Failed to create challenge.',
    }
  }
}

export const addAnswer = async (
  challengeId: string | undefined,
  answers: Array<string>
): Promise<State> => {
  try {
    if (!challengeId) throw new Error('No challenge id provided.')
    const challengeModel = await getChallengeModel()
    await connectDb()

    const objectId = new mongoose.Types.ObjectId(challengeId)
    const challenge = await challengeModel.findById(objectId)
    if (!challenge) throw new Error('Failed to find challenge')

    challenge.tries.push(answers)
    challenge.status = 'finished'
    await challenge.save()
    return { success: `${challenge.tries.length}` }
  } catch (error) {
    if (error instanceof Error) return { error: `${error.message}` }
    return {
      error: 'Failed to create challenge.',
    }
  }
}
