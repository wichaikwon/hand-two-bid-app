import { NAVBAR_LINKS } from "@/constants/navbar"
import { AlignJustify, Bell, Search, User } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import React from "react"

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-slate-900 text-white">
      <ul className="container mx-auto flex items-center justify-between">
        <li className="flex items-center">
          <button className="border-dark-gold text-dark-gold block rounded-md border p-2 md:hidden">
            <AlignJustify />
          </button>
          <div className="hidden md:block">
            <Image
              src={"/logo/apple-bangkok-group.png"}
              alt="apple-bangkok-group"
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </div>
        </li>
        <li className="md:hidden">
          <Image
            src={"/logo/apple-bangkok-group.png"}
            alt="apple-bangkok-group"
            width={100}
            height={100}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </li>
        <li className="relative">
          <div className="text-dark-gold cursor-pointer rounded-r-md border p-2 md:hidden">
            <Search />
          </div>
          <div className="bg-dark-gold border-l-dark-gold hidden rounded-r-md fill-black p-2 md:absolute md:top-1/2 md:right-0 md:block md:-translate-y-1/2">
            <Search />
          </div>
          <input
            type="text"
            className="border-dark-gold hidden rounded-md border bg-white p-2 text-black md:block"
          />
        </li>
        <li className="hidden items-center space-x-2 md:flex">
          <button className="border-dark-gold bg-dark-gold rounded-md border p-2">
            <Bell />
          </button>
          <button className="border-dark-gold bg-dark-gold rounded-md border p-2">
            <User />
          </button>
        </li>
      </ul>
      <div className="bg-gold-50 hidden text-black md:block">
        <div className="container mx-auto flex items-center justify-between">
          <ul className="flex w-full items-center justify-between space-x-4">
            {NAVBAR_LINKS.map((link) => (
              <li
                key={link.label}
                className={`border-gold-50 transform cursor-pointer border-b-2 p-2 transition-colors duration-300 hover:border-yellow-500 ${isActive(link.path) ? "border-gold-500 text-gold-700 border-b-2" : "text-gray-700 hover:text-yellow-500"}`}
              >
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <hr className="text-gray-200" />
      </div>
    </nav>
  )
}

export default Navbar
