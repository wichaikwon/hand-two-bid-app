"use client"
import { usePathname } from "next/navigation"
import React from "react"
import Navbar from "./client/layout/Navbar"
import Footer from "./client/layout/Footer"

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <Navbar />
        <div className="min-h-0 flex-1 bg-yellow-50">
          <div className="container mx-auto">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Wrapper
