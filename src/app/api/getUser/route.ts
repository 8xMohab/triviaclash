import { connectDb } from '@/lib/dbConnect'
import User from '@/lib/models/user'
import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  const data = await request.json()
  const email = data.email
  const password = data.password
  const schema = await User()
  await connectDb()
  const user = await schema.findOne({ email })

  if (!user) return NextResponse.json({ message: 'Invalid user credntials.' })

  const { username, avatar, password: userPassword, _id } = user

  const passwordsMatch = await bcrypt.compare(password, userPassword)

  if (passwordsMatch) {
    return NextResponse.json({ username, avatar, id: _id.toString() })
  }

  return NextResponse.json({ message: 'Invalid user credntials.' })
}
