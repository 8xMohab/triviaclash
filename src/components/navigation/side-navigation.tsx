'use client'
import clsx from 'clsx'
import React, { useContext, useEffect, useRef } from 'react'
import { Context } from '../nav-context-provider'
import navigationLinks from './data'
import Text from '../typography/text'
import Link from 'next/link'
import { ChevronRightIcon, MenuIcon } from 'lucide-react'
import Logo from '../logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOutAction } from '@/lib/actions'
import { Button } from '../ui/button'
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@radix-ui/react-dropdown-menu'
import { useTheme } from 'next-themes'

const SideNavigation: React.FC<React.ComponentPropsWithoutRef<'div'>> = (
  props
) => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('SideNavContext must be used within a NavContextProvider')
  }
  const [isSideNavVisible, setIsSideNavVisible] = context
  const { className } = props
  const { setTheme } = useTheme()

  useEffect(() => {
    // Define media query for Tailwind's md breakpoint (768px and above)
    const mediaQuery = window.matchMedia('(min-width: 1440px)')
    // Function to check screen size and update the state
    const handleResize = () => {
      setIsSideNavVisible(mediaQuery.matches)
    }
    // Add event listener for screen resizing
    mediaQuery.addEventListener('change', handleResize)
    // Run on initial load
    handleResize()
    // Clean up event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleResize)
    }
  }, [setIsSideNavVisible])
  const formRef = useRef<HTMLFormElement>(null)
  return (
    <div
      className={clsx(
        'fixed top-0 pb-6 h-screen min-w-fit flex flex-col xl:sticky transition-all duration-300 space-y-8 bg-background border-r overflow-y-scroll scrollbar-hide',

        isSideNavVisible ? 'left-0 w-fit pl-8 pr-4 pt-6' : '-left-full',
        className
      )}
    >
      <div className="flex space-x-4 xl:space-x-0 items-center justify-center xl:pr-10">
        <MenuIcon
          className="w-6 h-6 xl:hidden"
          onClick={() => setIsSideNavVisible(false)}
        />
        <Logo />
      </div>
      {navigationLinks.private.map((section) => (
        <div key={`side-nav-section: ${section.title}`} className="space-y-4">
          <Text.TypographyP className="p-2 border-b text-lg">
            {section.title}
          </Text.TypographyP>
          <nav>
            <ul className="space-y-4">
              {section.links.map((link) =>
                link.text === 'Settings' ? (
                  <div key={`side-nav-settings: ${link.text}`}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center justify-start space-x-2">
                        <div className="w-6 h-6">{link.icon}</div>
                        <span>{link.text}</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center justify-between">
                            <span className="pl-2">Theme</span>
                            <ChevronRightIcon className="w-4 h-4" />
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="bg-background border p-2 rounded-lg">
                            <DropdownMenuItem onClick={() => setTheme('light')}>
                              Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>
                              Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setTheme('system')}
                            >
                              System
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-background">
                          <form
                            action={signOutAction}
                            className="w-full flex"
                            ref={formRef}
                          >
                            <Button
                              type="submit"
                              variant="link"
                              className="p-0 w-full text-left items-center justify-start"
                            >
                              Sign Out
                            </Button>
                          </form>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <li key={`side-nav-link: ${link.text}`}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-start space-x-2"
                    >
                      <div className="w-6 h-6">{link.icon}</div>
                      <span>{link.text}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      ))}
    </div>
  )
}

export default SideNavigation
