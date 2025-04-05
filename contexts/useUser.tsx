'use client'
import React, { createContext, useContext, useState } from "react"

interface UserContextType {
  user: string
  signIn: (username: string) => void
  register: (username: string) => void
  signOut: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const UserContext = createContext<UserContextType>({
  user: "",
  signIn: () => {},
  register: () => {},
  signOut: () => {},
  isOpen: false,
  setIsOpen: () => {},
})

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const signIn = (username: string) => {
    setUser(username)
    // Add your sign-in logic here
  }

  const register = (username: string) => {
    setUser(username)
    // Add your registration logic here
  }

  const signOut = () => {
    setUser("")
  }

  return (
    <UserContext.Provider value={{ user, signIn, register, signOut, isOpen, setIsOpen }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
