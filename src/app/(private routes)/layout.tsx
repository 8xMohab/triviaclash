import { auth } from '@/auth'
import Container from '@/components/container'
import NavContextProvider from '@/components/nav-context-provider'
import { SideNavigation, TopNavigation } from '@/components/navigation'
import { SessionProvider } from 'next-auth/react'
import { notFound } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session) notFound()
  return (
    <div className="flex">
      <SessionProvider session={session}>
        <NavContextProvider>
          <SideNavigation />
          <Container className="w-full">
            <TopNavigation />
            <div>{children}</div>
          </Container>
        </NavContextProvider>
      </SessionProvider>
    </div>
  )
}
