import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../theme-switcher'
import { Button } from '../ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { publicLinks } from './data'
import Logo from '../logo'

const LargePublicNav: React.FC<React.ComponentPropsWithoutRef<'div'>> = (
  props
) => {
  const { className, ...restProps } = props
  return (
    <div
      className={clsx('flex items-center justify-between', className)}
      {...restProps}
    >
      <div>
       <Logo />
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            {publicLinks.map((link) => (
              <NavigationMenuItem key={`desktop-public-nav:${link.text}`}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.text}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <ModeToggle />
        </div>
        <div className="space-x-4 hidden md:block">
          <Button variant="outline">
            <Link href="/signin">Login</Link>
          </Button>
          <Button variant="default">
            <Link href="/register">Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LargePublicNav
