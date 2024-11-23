import mongoose, { Schema } from 'mongoose'

export type QuestionType = mongoose.InferSchemaType<typeof QuestionSchema>
export const QuestionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['multiple', 'boolean'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    correct_answer: {
      type: String,
    },
    incorrect_answers: {
      type: [String],
      required: true,
      validate: [
        (array: [string]) => array.length > 0,
        'Must have at least one incorrect answer',
      ],
    },
  },
  { _id: false }
)
