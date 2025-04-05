"use client"
import React from "react"
import Link from "next/link"
import { useBreadcrumbs } from "@/contexts/useBreadcrumbs"

const Breadcrumbs: React.FC = () => {
  const { breadcrumbs } = useBreadcrumbs()

  return (
    <nav className="breadcrumbs">
      <ul className="flex space-x-2 p-4 text-sm text-gray-600">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            <Link href={breadcrumb.path} className="hover:underline">
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
