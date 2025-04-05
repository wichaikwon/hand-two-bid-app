"use client"
import React from "react"
import Navbar from "./client/layout/Navbar"
import Footer from "./client/layout/Footer"
import { usePathname } from "next/navigation"
import Breadcrumbs from "./Breadcrumbs"

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col bg-slate-50">
        <Navbar />
        {pathname !== "/" && (
          <div className="container mx-auto p-4">
            <Breadcrumbs />
          </div>
        )}
        <div className="min-h-0 flex-1">
          <div className="">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Wrapper
