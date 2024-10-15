import Container from '@/components/container'
import NavContextProvider from '@/components/nav-context-provider'
import { SideNavigation, TopNavigation } from '@/components/navigation'
import React from 'react'

const PrivateLayout: React.FC<React.ComponentPropsWithoutRef<'div'>> = (
  props
) => {
  return (
    <div className="flex">
      <NavContextProvider>
        <SideNavigation />
        <Container className='w-full'>
          <TopNavigation />
          <div>{props.children}</div>
        </Container>
      </NavContextProvider>
    </div>
  )
}

export default PrivateLayout
