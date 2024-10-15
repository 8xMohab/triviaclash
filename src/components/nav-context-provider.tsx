'use client'
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

// Define the type for the context
type NavContextType = [boolean, Dispatch<SetStateAction<boolean>>]

// Create the context with the default value
export const Context = createContext<NavContextType | undefined>(undefined)

const NavContextProvider = (props: { children: ReactNode }) => {
  const [isSideNavVisible, setIsSideNavVisible] = useState(false)
  return (
    <Context.Provider value={[isSideNavVisible, setIsSideNavVisible]}>
      {props.children}
    </Context.Provider>
  )
}

export default NavContextProvider
