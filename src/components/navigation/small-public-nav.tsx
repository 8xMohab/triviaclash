import clsx from 'clsx'
import React from 'react'
import { publicLinks } from './data'
import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { ModeToggle } from '../theme-switcher'
import Logo from '../logo'

const SmallPublicNav: React.FC<React.ComponentPropsWithoutRef<'div'>> = (
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
      <div className="flex items-center space-x-4">
        <div>
          <ModeToggle />
        </div>
        <div className="space-x-4 hidden md:block">
          <Button variant="outline">
            <Link href="/signin">Login</Link>
          </Button>
          <Button variant="default">
            <Link href="/regiser">Sign up</Link>
          </Button>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {publicLinks.map((link) => (
                  <DropdownMenuItem key={`public-nav-dropdown:${link.text}`}>
                    <Link href={link.href}>{link.text}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuGroup className="md:hidden">
                <DropdownMenuItem>
                  <Link href="/signin">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/register">Sign up</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default SmallPublicNav
