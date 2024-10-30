'use server'

import mongoose from 'mongoose'
import { connectDb } from './dbConnect'
import getUserModel from './models/user'

// local categories
const localCategories = [
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Entertainment: Books' },
  { id: 11, name: 'Entertainment: Film' },
  { id: 12, name: 'Entertainment: Music' },
  { id: 13, name: 'Entertainment: Musicals & Theatres' },
  { id: 14, name: 'Entertainment: Television' },
  { id: 15, name: 'Entertainment: Video Games' },
  { id: 16, name: 'Entertainment: Board Games' },
  { id: 17, name: 'Science & Nature' },
  { id: 18, name: 'Science: Computers' },
  { id: 19, name: 'Science: Mathematics' },
  { id: 20, name: 'Mythology' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' },
  { id: 24, name: 'Politics' },
  { id: 25, name: 'Art' },
  { id: 26, name: 'Celebrities' },
  { id: 27, name: 'Animals' },
  { id: 28, name: 'Vehicles' },
  { id: 29, name: 'Entertainment: Comics' },
  { id: 30, name: 'Science: Gadgets' },
  { id: 31, name: 'Entertainment: Japanese Anime & Manga' },
  { id: 32, name: 'Entertainment: Cartoon & Animations' },
]

// types
type categociwryRes = {
  trivia_categories: {
    id: number
    name: string
  }[]
}

export const getCategories = async () => {
  try {
    const res = await fetch('https://opentdb.com/api_category.php')
    if (!res.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data: categociwryRes = await res.json()
    return data.trivia_categories
  } catch (error) {
    console.log('Failed to fetch categories...', error)
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
