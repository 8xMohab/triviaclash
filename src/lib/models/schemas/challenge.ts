import mongoose, { Schema } from 'mongoose'
import { ChallengeSettingsSchema } from './challengeSettings'
import { QuestionSchema } from './question'

export type ChallengeType = mongoose.InferSchemaType<typeof ChallengeSchema>
export type ChallengeSubsetType = Pick<
  ChallengeType,
  'questions' | 'settings' | 'status' | 'tries'
>;
export const ChallengeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'finished'],
    required: true,
    default: 'active',
  },
  settings: {
    type: ChallengeSettingsSchema,
    required: true,
  },
  questions: {
    type: [QuestionSchema],
    required: true,
    validate: [
      (array: Array<typeof QuestionSchema>) => array.length > 0,
      'A challenge must have at least one question',
    ],
  },
  tries: {
    type: [[String]], // List of lists of answers (strings)
    required: true,
    default: [], // Starts as an empty array
  },
})
