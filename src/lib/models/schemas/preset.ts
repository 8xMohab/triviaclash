import mongoose, { Schema } from 'mongoose'
import { ChallengeSettingsSchema } from './challengeSettings'

// Define a TypeScript interface for type safety
export type PresetType = mongoose.InferSchemaType<typeof PresetSchema>

// custom preset schema
export const PresetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    settings: {
      type: ChallengeSettingsSchema,
      required: true,
    },
  },
  { _id: false }
)
