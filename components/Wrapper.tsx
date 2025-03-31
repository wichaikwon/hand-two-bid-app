'use client'
import { usePathname } from "next/navigation"
import React from "react"
import Navbar from "./client/Navbar"
import Footer from "./client/Footer"

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <Navbar />
        <div className="min-h-0 flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default Wrapper
