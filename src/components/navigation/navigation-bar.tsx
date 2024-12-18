'use client'
import clsx from 'clsx'
import React, { useContext } from 'react'
import Logo from '../logo'
import { MenuIcon } from 'lucide-react'
import { authLinks, publicLinks } from './links'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Link from 'next/link'
import { ModeToggle } from '../theme-switcher'
import { Button } from '../ui/button'
import { signOut, useSession } from 'next-auth/react'
import SideNavigation from './side-nav'
import { Context } from '../nav-context-provider'
import { usePathname } from 'next/navigation'

const NavigationBar: React.FC<React.ComponentPropsWithoutRef<'div'>> = (
  props,
) => {
  const { className, ...restProps } = props
  const { data: session } = useSession()
  const context = useContext(Context)

  if (!context) {
    throw new Error('SideNavContext must be used within a NavContextProvider')
  }
  const [, setIsSideNavVisible] = context
  const pathname = usePathname()
  let onAuthPages = false

  authLinks.map((link) => {
    if (pathname === link.href) onAuthPages = true
  })

  if (onAuthPages) {
    return (
      <div className="mt-4 flex items-center justify-center">
        <Logo />
      </div>
    )
  } else
    return (
      <div className={clsx('', className)} {...restProps}>
        <header className="mt-4">
          <SideNavigation />
          <nav>
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant={'ghost'}
                  onClick={() => setIsSideNavVisible(true)}
                  className={clsx(
                    'px-2 min-h-max',
                    session?.user ? 'block' : 'hidden',
                  )}
                >
                  <MenuIcon className="w-6 h-6 lg:h-8 lg:w-8" />
                </Button>
                <Logo />
              </div>
              <div className="hidden lg:block">
                <NavigationMenu>
                  <NavigationMenuList>
                    {publicLinks.map((link) => (
                      <NavigationMenuItem key={`public-link--${link.text}`}>
                        <Link href={`${link.href}`} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={clsx(navigationMenuTriggerStyle(), '')}
                          >
                            {link.text}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              <div
                className={clsx(
                  'flex items-center space-x-4',
                  session?.user ? 'hidden' : 'block',
                )}
              >
                <ModeToggle />
                {authLinks.map((link) =>
                  link.text === 'Sign in' ? (
                    <Link
                      href={`${link.href}`}
                      key={`auth-link-${link.text}`}
                      className="hidden lg:block"
                    >
                      <Button variant={'outline'}>{link.text}</Button>
                    </Link>
                  ) : (
                    ''
                  ),
                ) || ''}
                <div className="lg:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={'outline'} className="px-2 min-h-max">
                        <MenuIcon className="w-6 h-6 lg:h-8 lg:w-8" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {publicLinks.map((link) => (
                        <DropdownMenuItem key={`public-link-${link.text}`}>
                          <Link href={`${link.href}`}>{link.text}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {session?.user ? (
                <div className='flex items-center justify-center space-x-4'>
                <ModeToggle />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => signOut()}>
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                ''
              )}
            </div>
          </nav>
        </header>
      </div>
    )
}

export default NavigationBar
