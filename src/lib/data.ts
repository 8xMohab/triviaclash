'use server'

import mongoose from 'mongoose'
import { connectDb } from './dbConnect'
import getUserModel from './models/user'
import { ChallengeSubsetType } from './models/schemas/challenge'
import getChallengeModel from './models/challenge'
import { shuffleArray } from './utils'

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

export const getActiveChallenge = async (
  userId: string | undefined,
  challengeId: string | undefined
): Promise<{ challenge?: ChallengeSubsetType; error?: string }> => {
  try {
    if (!userId) throw new Error('No user id provided.')
    if (!challengeId) throw new Error('No challenge id provided.')
    await connectDb()

    const challengeModel = await getChallengeModel()
    const activeChallenge = await challengeModel
      .findOne({
        user: userId,
        _id: challengeId,
        status: 'active',
      })
      .lean()
    if (!activeChallenge) throw new Error('Challenge was not found.')

    // delete the correct answer and add it to the list of incorrect answers
    // and randomize the array
    activeChallenge.questions.map((question) => {
      if (question.correct_answer)
        question.incorrect_answers.push(question.correct_answer)

      delete question.correct_answer

      question.incorrect_answers = shuffleArray(question.incorrect_answers)
    })

    return {
      challenge: {
        questions: activeChallenge.questions,
        settings: activeChallenge.settings,
        status: activeChallenge.status,
        tries: activeChallenge.tries,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: 'Something went wrong.' }
  }
}

export const getChallenge = async (
  userId: string | undefined,
  challengeId: string | undefined
): Promise<{ challenge?: ChallengeSubsetType; error?: string }> => {
  try {
    if (!userId) throw new Error('No user id provided.')
    if (!challengeId) throw new Error('No challenge id provided.')
    await connectDb()

    const challengeModel = await getChallengeModel()
    const challenge = await challengeModel
      .findOne({
        user: userId,
        _id: challengeId,
      })
      .lean()
    if (!challenge) throw new Error('Challenge was not found.')
    challenge.questions.map((question) => {
      if (question.correct_answer)
        question.incorrect_answers.push(question.correct_answer)
      question.incorrect_answers = shuffleArray(question.incorrect_answers)
    })
    return {
      challenge: {
        questions: challenge.questions,
        settings: challenge.settings,
        status: challenge.status,
        tries: challenge.tries,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: 'Something went wrong.' }
  }
}
