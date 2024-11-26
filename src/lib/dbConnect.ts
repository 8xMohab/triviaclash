// getting-started.js
import mongoose from 'mongoose'

if (typeof window !== 'undefined') {
  throw new Error('dbConnect can only be used in a Node.js environment.')
}

export const connectDb = async () => {
  const mongoUri =
    process.env.NODE_ENV === 'development'
      ? process.env.MONGO_LOCAL_URI
      : process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error('MongoDB URI is not defined in the environment variables')
  }

  try {
    if (mongoose.connection.readyState >= 1) {
      // Already connected
      return
    }
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    throw new Error('Failed to connect to the database')
  }
}
