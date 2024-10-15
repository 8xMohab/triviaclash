import clsx from 'clsx'
import React, { useContext } from 'react'
import { Context } from '../nav-context-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Logo from '../logo'
import { auth, signIn } from '@/auth'
import ToggleNav from '../toggleNav'
import { redirect } from 'next/navigation'

const TopNavigation: React.FC<React.ComponentPropsWithoutRef<'div'>> = async (
  props
) => {
  const session = await auth()
  const { className } = props
  return (
    <div className={clsx('flex items-center justify-between pt-6', className)}>
      <div className="flex space-x-4 items-center justify-center xl:hidden">
        <ToggleNav />
        <Logo />
      </div>
      <div className="hidden xl:block"></div>
      <Avatar>
        <AvatarImage src={session?.user?.image || 'default-avatar.png'} />
        <AvatarFallback>{session?.user?.name}</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default TopNavigation
