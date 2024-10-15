import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { Provider } from 'next-auth/providers'
import { loginFormSchema } from './lib/zodSchema'
import bcrypt from 'bcryptjs'
import User from './lib/models/user'
import { connectDb } from './lib/dbConnect'
import navigationLinks from './components/navigation/data'

const getUser = async (email: string) => {
  const schema = await User()
  await connectDb()
  const user = await schema.findOne({ email })

  if (!user) return null
  const { username, avatar, password } = user
  return { username, avatar, email, password }
}

const providers: Provider[] = [
  Credentials({
    credentials: { email: {}, password: {} },
    async authorize(credentials) {
      let user = null
      const { email, password } = loginFormSchema.parse(credentials)
      user = await getUser(email)
      if (!user) return null

      const passwordsMatch = await bcrypt.compare(password, user.password)

      if (passwordsMatch)
        return { name: user.username, email, image: user.avatar }

      return null
    },
  }),
]
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt', // Optional: Using JWT for session management.
    maxAge: 60 * 60 * 24 * 30, // 30 days, or adjust as necessary
    updateAge: 60 * 60 * 24, // 1 day
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user

      const onLandingPage = nextUrl.pathname === '/'
      let onPublicRoute = false
      navigationLinks.public.map((link) => {
        if (nextUrl.pathname === link.href) onPublicRoute = true
      })
      navigationLinks.authentication.map((link) => {
        if (nextUrl.pathname === link.href) onPublicRoute = true
      })
      console.log('The user is logged?: ', isLoggedIn)

      if (isLoggedIn) {
        if (onLandingPage) return Response.redirect(new URL('/home', nextUrl))
        console.log('REturn TUREOIFJEOIWHFOIHWEIFHO')
        return true
      } else {
        if (onPublicRoute) return true

        console.log('REturn FAAAAAAAAAAAALSE')
        return false
      }
    },
  },
})
