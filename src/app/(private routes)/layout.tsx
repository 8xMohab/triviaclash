import { auth } from '@/auth'
import Container from '@/components/container'
import NavContextProvider from '@/components/nav-context-provider'
import { SideNavigation, TopNavigation } from '@/components/navigation'
import { SessionProvider } from 'next-auth/react'
import { notFound } from 'next/navigation'
import React from 'react'

const PrivateLayout: React.FC<React.ComponentPropsWithoutRef<'div'>> = async (
  props
) => {
  const session = await auth()
  if (!session) notFound()
  return (
    <div className="flex">
      <SessionProvider session={session}>
        <NavContextProvider>
          <SideNavigation />
          <Container className="w-full">
            <TopNavigation />
            <div>{props.children}</div>
          </Container>
        </NavContextProvider>
      </SessionProvider>
    </div>
  )
}

export default PrivateLayout
