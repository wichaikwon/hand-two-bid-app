"use client"
import { NAVBAR_LINKS } from "@/constants/navbar"
import { X } from "lucide-react"
import React from "react"

interface MenuItemProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const MenuItem: React.FC<MenuItemProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-50/95 shadow-md transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-full opacity-0"
      }`}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 transition-colors duration-200"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center justify-center space-y-8">
          {NAVBAR_LINKS.map((link) => (
            <div key={link.label} className="flex items-center">
              <a
                href={link.path}
                className="transform text-2xl transition-colors duration-300 hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuItem
