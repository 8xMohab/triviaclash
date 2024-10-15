import mongoose from 'mongoose'
import { connectDb } from '../dbConnect'
import { UserSchema, UserType } from './schemas/user'

const getUserModel = async () => {
  await connectDb() // Ensure connection is established
  // Check if the model already exists and remove it
  if (mongoose.models.User) {
    delete mongoose.models.User
  }
  // Define the model or override the existing one
  return mongoose.model<UserType>('User', UserSchema)
}

export default getUserModel
