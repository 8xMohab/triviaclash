import mongoose, { Schema } from 'mongoose'

// Define a TypeScript interface for type safety
export type ChallengeSettingsType = mongoose.InferSchemaType<
  typeof ChallengeSettingsSchema
>

// custom preset schema
export const ChallengeSettingsSchema = new Schema({
  numberOfQuestions: {
    type: Number,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'normal', 'hard', 'any'],
    default: 'any',
    required: true,
  },
  type: {
    type: String,
    enum: ['multiple', 'boolean', 'any'],
    default: 'any',
    required: true,
  },
})
