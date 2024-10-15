import mongoose, { Schema } from 'mongoose'
import { PresetSchema } from './preset'

// Define a TypeScript interface for type safety
export type UserType = mongoose.InferSchemaType<typeof UserSchema>

// Create the user schema
export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: true,
    default: 'default-avatar.png',
  },
  experience: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    required: true,
    default: 'offline',
  },
  joiningDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  presets: {
    type: [PresetSchema],
    required: true,
    default: [],
  },
  challenges: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
      },
    ],
    required: true,
    default: [],
  },
  notifications: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
      },
    ],
    required: true,
    default: [],
  },
  friends: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    required: true,
    default: [],
  },
})
