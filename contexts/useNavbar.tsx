"use client"
import { usePathname } from "next/navigation"
import React, { createContext, useContext, useState, ReactNode } from "react"
import "@/i18n"

interface Breadcrumb {
  label: string
  path: string
}

interface NavbarContextType {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
  addBreadcrumb: (label: string, path: string) => void
  removeBreadcrumb: (path: string) => void
  updateBreadcrumbs: (newBreadcrumbs: Breadcrumb[]) => void
  clearBreadcrumbs: () => void
}

const NavbarContext = createContext<NavbarContextType>({
  breadcrumbs: [],
  setBreadcrumbs: () => {},
  addBreadcrumb: () => {},
  removeBreadcrumb: () => {},
  updateBreadcrumbs: () => {},
  clearBreadcrumbs: () => {},
})

export const NavbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])
  const pathname = usePathname()
  const updateBreadcrumbs = (newBreadcrumbs: Breadcrumb[]) => {
    setBreadcrumbs(newBreadcrumbs)
  }

  const addBreadcrumb = (label: string, path: string) => {
    setBreadcrumbs((prev) => [...prev, { label, path }])
  }

  const removeBreadcrumb = (path: string) => {
    setBreadcrumbs((prev) => prev.filter((breadcrumb) => breadcrumb.path !== path))
  }

  const clearBreadcrumbs = () => {
    setBreadcrumbs([])
  }

  return (
    <NavbarContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
        addBreadcrumb,
        removeBreadcrumb,
        updateBreadcrumbs,
        clearBreadcrumbs,
      }}
    >
      {children}
    </NavbarContext.Provider>
  )
}

export const useNavbar = (): NavbarContextType => {
  const context = useContext(NavbarContext)
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider")
  }
  return context
}
