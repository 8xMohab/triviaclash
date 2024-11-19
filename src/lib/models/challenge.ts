import mongoose from 'mongoose'
import { connectDb } from '../dbConnect'
import { ChallengeSchema } from './schemas/challenge' // Assuming the ChallengeSchema is in ./schemas/challenge

const getChallengeModel = async () => {
  await connectDb() // Ensure connection is established
  // Check if the model already exists and remove it
  if (mongoose.models.Challenge) {
    delete mongoose.models.Challenge
  }
  // Define the model or override the existing one
  return mongoose.model('Challenge', ChallengeSchema)
}

export default getChallengeModel
