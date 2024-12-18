import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import * as React from 'react'

export async function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return <SessionProvider session={session}>{children}</SessionProvider>
}
