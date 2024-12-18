'use client'
import clsx from 'clsx'
import React, { useContext } from 'react'
import { Context } from '../nav-context-provider'
import navigationLinks from './links'
import Text from '../typography/text'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import Logo from '../logo'
import { Button } from '../ui/button'

const SideNavigation: React.FC<React.ComponentPropsWithoutRef<'div'>> = (
  props,
) => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('SideNavContext must be used within a NavContextProvider')
  }
  const [isSideNavVisible, setIsSideNavVisible] = context
  const { className } = props
  return (
    <div
      className={clsx(
        'fixed top-0 pb-6 h-screen min-w-fit flex flex-col transition-all duration-300 space-y-8 bg-background border-r overflow-y-scroll scrollbar-hide',

        isSideNavVisible ? 'left-0 w-fit pl-8 pr-4 pt-6' : '-left-full',
        className,
      )}
    >
      <div className="flex space-x-4 xl:space-x-0 items-center justify-center xl:pr-10">
        <Button
          variant={'ghost'}
          onClick={() => setIsSideNavVisible(false)}
          className={clsx('px-2 min-h-max')}
        >
          <MenuIcon className="w-6 h-6 lg:h-8 lg:w-8" />
        </Button>

        <Logo />
      </div>
      <div className='space-y-8'>
        {navigationLinks.private.map((section) => (
          <div key={`side-nav-section: ${section.title}`} className="space-y-4">
            <Text.TypographyP className="p-2 border-b text-lg font-bold">
              {section.title}
            </Text.TypographyP>
            <nav>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={`side-nav-link: ${link.text}`}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-start space-x-2"
                    >
                      <div className="w-6 h-6">{link.icon}</div>
                      <span>{link.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideNavigation
