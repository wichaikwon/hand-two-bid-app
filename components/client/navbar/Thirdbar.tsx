import { NAVBAR_LINKS } from "@/constants/navbar"
import Link from "next/link"
import React from "react"
import { t } from "i18next"
import { usePathname } from "next/navigation"
import { useUser } from "@/contexts/useUser"

const Thirdbar: React.FC = () => {
  const pathname = usePathname()
  const { isOpen, setIsOpen } = useUser()
  const isActive = (path: string) => {
    return pathname === path
  }
  return (
    <>
      <nav className="relative hidden items-center justify-between border-gray-200 md:flex">
        <div className="absolute inset-0 z-10 bg-blue-500" />
        <div className="z-20 container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            {NAVBAR_LINKS.map((link) => (
              <Link
                href={link.path}
                key={link.path}
                className={`p-2 text-white transition-all duration-300 hover:border-b-2 hover:border-white ${isActive(link.path) ? "border-b-2 border-white" : "border-b-2 border-b-blue-500"}`}
              >
                {t(`${link.label}`)}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="border-b-2 border-blue-500 p-2 text-white transition-all duration-300 hover:border-b-2 hover:border-white"
            >
              {t(`layout.navbar.navbar_item.sign_in`)}
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Thirdbar
