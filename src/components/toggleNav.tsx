'use client'
import React, { useContext } from 'react'
import { Context } from './nav-context-provider'
import { MenuIcon } from 'lucide-react'

const ToggleNav = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('SideNavContext must be used within a NavContextProvider')
  }
  const [, setIsSideNavVisible] = context
  return (
    <MenuIcon className="w-6 h-6" onClick={() => setIsSideNavVisible(true)} />
  )
}

export default ToggleNav
