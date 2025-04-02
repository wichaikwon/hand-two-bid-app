import { NAVBAR_LINKS } from "@/constants/navbar"
import { AlignJustify, Bell, Search, User } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import React, { useState } from "react"
import MenuItem from "./MenuItem"

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-slate-900 text-white">
      {isSearchOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setIsSearchOpen(false)} />
      )}
      <ul className="relative container mx-auto flex items-center justify-between">
        <div
          className={`absolute top-1/2 left-1/2 z-30 flex h-full w-full -translate-x-1/2 -translate-y-1/2 bg-slate-900 transition-all duration-300 ease-in-out ${
            isSearchOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="my-2 flex-1 rounded-md bg-white p-2 text-black"
            placeholder="Search..."
          />
        </div>
        <li className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`block rounded-md border border-yellow-600 p-2 text-yellow-600 transition-transform duration-300 ease-in-out hover:bg-yellow-600 hover:text-white md:hidden`}
          >
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
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-md border p-2 text-yellow-600 transition-transform duration-300 ease-in-out hover:border-yellow-600 hover:bg-yellow-600 hover:text-white md:hidden"
          >
            <Search />
          </button>
          <div className="hidden cursor-pointer rounded-r-md border-l-yellow-600 bg-yellow-600 fill-black p-2 transition-transform duration-300 ease-in-out md:absolute md:top-1/2 md:right-0 md:block md:-translate-y-1/2">
            <Search />
          </div>
          <input
            type="text"
            className="hidden rounded-md border border-yellow-600 bg-white p-2 text-black transition-opacity duration-300 ease-in-out md:block"
          />
        </li>
        <li className="hidden items-center space-x-2 md:flex">
          <button className="rounded-md border border-yellow-600 bg-yellow-600 p-2 transition-transform duration-300 ease-in-out">
            <Bell />
          </button>
          <button className="rounded-md border border-yellow-600 bg-yellow-600 p-2 transition-transform duration-300 ease-in-out">
            <User />
          </button>
        </li>
      </ul>
      <div className="hidden bg-yellow-50 text-black md:block">
        <div className="container mx-auto flex items-center justify-between">
          <ul className="flex w-full items-center justify-between space-x-4">
            {NAVBAR_LINKS.map((link) => (
              <li
                key={link.label}
                className={`transform cursor-pointer border-b-2 border-yellow-50 p-2 transition-transform duration-300 hover:border-yellow-500 ${isActive(link.path) ? "border-b-2 border-yellow-500 text-yellow-600" : "text-gray-600 hover:text-yellow-500"}`}
              >
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <hr className="text-gray-200" />
      </div>
      <MenuItem isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  )
}

export default Navbar
