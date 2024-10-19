'use server'

import mongoose from 'mongoose'
import { connectDb } from './dbConnect'
import getUserModel from './models/user'
import { PresetType } from './models/schemas/preset'
import { localCategories } from './localCategories'

// types
type categociwryRes = {
  trivia_categories: {
    id: number
    name: string
  }[]
}

export const getCategories = async () => {
  try {
    const res = await fetch('https://opentdb.com/api_category.php', {
      cache: 'no-cache',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data: categociwryRes = await res.json()
    return data.trivia_categories
  } catch (error) {
    console.log('Failed to fetch categories... Error: ', error)
    return localCategories
  }
}

export const getPresets = async (userId: string | undefined) => {
  try {
    if (!userId) throw new Error('No user id provided.')
    await connectDb()
    const userModel = await getUserModel()
    const objectId = new mongoose.Types.ObjectId(userId)
    const user = await userModel.findById(objectId).lean()

    if (!user) throw new Error('Failed to find a user')

    return user.presets
  } catch (error) {
    console.log('Failed to get the Presets... Error: ', error)
    return []
  }
}
