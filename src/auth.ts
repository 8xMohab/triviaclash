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
  const { username, avatar, password, _id } = user
  return { username, avatar, email, password, id: _id }
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
        return {
          name: user.username,
          email,
          image: user.avatar,
          id: user.id.toString(),
        }

      return null
    },
  }),
]
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id as string // Explicitly casting to string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const onLandingPage = nextUrl.pathname === '/'
      let onAuthenticationPages = false
      let onPublicRoute = false
      navigationLinks.public.map((link) => {
        if (nextUrl.pathname === link.href) onPublicRoute = true
      })
      navigationLinks.authentication.map((link) => {
        if (nextUrl.pathname === link.href) {
          onPublicRoute = true
          onAuthenticationPages = true
        }
      })

      if (isLoggedIn) {
        if (onLandingPage || onAuthenticationPages) return Response.redirect(new URL('/home', nextUrl))
        return true
      }
      if (onPublicRoute) return true

      return false
    },
  },
})
