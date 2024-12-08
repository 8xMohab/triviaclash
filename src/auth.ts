import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { Provider } from 'next-auth/providers'
import { loginFormSchema } from './lib/zodSchema'
import navigationLinks from './components/navigation/data'

const providers: Provider[] = [
  Credentials({
    credentials: { email: {}, password: {} },
    async authorize(credentials) {
      let user = null
      const { email, password } = loginFormSchema.parse(credentials)
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) return null
      user = await res.json()

      if (user)
        return {
          name: user.username,
          email,
          image: user.avatar,
          id: user.id
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
        if (onLandingPage || onAuthenticationPages)
          return Response.redirect(new URL('/home', nextUrl))
        return true
      }
      if (onPublicRoute) return true

      return false
    },
  },
})
