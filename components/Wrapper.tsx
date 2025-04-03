"use client"
import React from "react"
import Navbar from "./client/layout/Navbar"
import Footer from "./client/layout/Footer"

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col bg-slate-50">
        <Navbar />
        <div className="min-h-0 flex-1 ">
          <div className="container mx-auto">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Wrapper
