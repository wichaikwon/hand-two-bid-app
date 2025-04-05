"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"
import "@/i18n"

interface Breadcrumbs {
  label: string
  path: string
}

interface BreadcrumbContextType {
  breadcrumbs: Breadcrumbs[]
  setBreadcrumbs: (breadcrumbs: Breadcrumbs[]) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextType>({
  breadcrumbs: [],
  setBreadcrumbs: () => {},
})

export const BreadcrumbsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs[]>([])
  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  )
}

export const useBreadcrumbs = (): BreadcrumbContextType => {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider")
  }
  return context
}
