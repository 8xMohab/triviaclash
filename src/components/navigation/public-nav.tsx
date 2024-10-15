import React from 'react'
import SmallPublicNav from './small-public-nav'
import LargePublicNav from './large-public-nav'

const PublicNavigationBar: React.FC<
  React.ComponentPropsWithoutRef<'nav'>
> = () => {
  return (
    <nav className="pt-5">
      <SmallPublicNav className="lg:hidden" />
      <LargePublicNav className="hidden lg:flex" />
    </nav>
  )
}

export default PublicNavigationBar
