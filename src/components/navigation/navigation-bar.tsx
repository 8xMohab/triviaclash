'use client'
import clsx from 'clsx'
import React from 'react'
import PublicNavigationBar from './public-nav'
import { usePathname } from 'next/navigation'
import Logo from '../logo'
import navigationLinks from './data'

const NavigationBar: React.FC<React.ComponentPropsWithoutRef<'div'>> = (
  props,
) => {
  const pathname = usePathname()
  const { className, ...restProps } = props
  let navBar = null

  // determine which navbar to display based on the pathname
  navigationLinks.public.map((link) => {
    if (link.href === pathname) navBar = <PublicNavigationBar />
  })
  navigationLinks.authentication.map((link) => {
    if (link.href === pathname)
      navBar = (
        <div className="w-full flex items-center justify-center pt-5">
          <Logo />
        </div>
      )
  })
  if (!navBar) navBar = <div></div>
  return (
    <div className={clsx('', className)} {...restProps}>
      <header>{navBar}</header>
    </div>
  )
}

export default NavigationBar
