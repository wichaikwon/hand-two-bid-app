import { ChevronDown, Heart, Menu, Search, ShoppingBasket, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import MenuItem from "../layout/MenuItem"
import { t } from "i18next"
import { useUser } from "@/contexts/useUser"

const Secondbar: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const [isCategory, setIsCategory] = useState<string>(t(`layout.navbar.category`))
  const { isOpen, setIsOpen } = useUser()
  return (
    <nav className="container mx-auto flex items-center justify-between border-gray-200 px-4 py-2">
      <Link href="/" className="flex-1 cursor-pointer">
        <Image
          src={"/logo/apple-bangkok-group.png"}
          alt="Logo"
          width={100}
          height={100}
          className="h-16 w-auto object-contain"
        />
      </Link>
      <div className="hidden flex-1 items-center justify-center rounded-full bg-white shadow-lg md:flex">
        <div
          className="relative flex cursor-pointer items-center gap-1 rounded-l-full border border-r-0 border-slate-100 p-2 text-nowrap"
          onClick={() => setIsOpenCategory(!isOpenCategory)}
        >
          <span>{isCategory}</span>
          <div>
            <ChevronDown size={12} />
          </div>
          {isOpenCategory && (
            <div className="absolute top-full left-0 z-30 mt-1 w-fit rounded-md bg-white shadow-lg">
              <ul className="flex flex-col">
                {[1, 2, 3].map((item) => (
                  <li
                    key={item}
                    onClick={() => setIsCategory(t(`layout.navbar.category${item}`))}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    {t(`layout.navbar.category${item}`)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative flex w-full items-center">
          <input
            placeholder={t(`layout.navbar.search`) || "Search..."}
            className="flex-1 rounded-r-full border border-slate-100 border-l-slate-400 p-2 pr-20"
          />
          <button className="absolute right-0 rounded-full border bg-slate-900 p-2 text-white transition-colors duration-300 hover:bg-blue-500">
            <Search />
          </button>
        </div>
      </div>
      <div className="hidden flex-1 cursor-pointer items-center justify-end gap-4 hover:text-blue-500 md:flex">
        <div className="flex flex-col text-xs">
          <span className="flex justify-end font-bold">{t(`layout.navbar.cart`)}</span>
          <span className="text-gray-500">
            0 {t(`layout.navbar.item`)}{" "}
            {(0).toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            })}
          </span>
        </div>
        <div className="text-blue-500">
          <ShoppingBasket />
        </div>
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <User size={16} />
        </button>
        <button>
          <Heart size={16} />
        </button>
        <button>
          <ShoppingBasket size={16} />
        </button>
        <button onClick={() => setIsOpenSearch(!isOpenSearch)}>
          <Search size={16} />
        </button>
        <button className="text-blue-500" onClick={() => setIsOpenMenu(!isOpenMenu)}>
          <Menu size={20} />
        </button>
      </div>
      <div
        onClick={() => setIsOpenSearch(!isOpenSearch)}
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/95 px-4 transition-opacity duration-300 ${
          isOpenSearch ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
          <span className="text-2xl">{t(`layout.navbar.modal_search_text`)} </span>
          <div className="flex items-center justify-center rounded-full bg-white shadow-lg">
            <div
              className="relative flex cursor-pointer items-center gap-1 rounded-l-full border border-r-0 border-slate-100 p-2 text-nowrap"
              onClick={() => setIsOpenCategory(!isOpenCategory)}
            >
              <span>{isCategory}</span>
              <div>
                <ChevronDown size={12} />
              </div>
              {isOpenCategory && (
                <div className="absolute top-full left-0 z-30 mt-1 w-fit rounded-md bg-white shadow-lg">
                  <ul className="flex flex-col">
                    {[1, 2, 3].map((item) => (
                      <li
                        key={item}
                        onClick={() => setIsCategory(t(`layout.navbar.category${item}`))}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                      >
                        {t(`layout.navbar.category${item}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative flex w-full items-center">
              <input
                placeholder={t(`layout.navbar.search`) || "Search..."}
                className="flex-1 rounded-r-full border border-slate-100 border-l-slate-400 p-2 pr-20"
              />
              <button className="absolute right-0 rounded-full border bg-slate-900 p-2 text-white transition-colors duration-300 hover:bg-blue-500">
                <Search />
              </button>
            </div>
          </div>
        </div>
      </div>
      <MenuItem isOpen={isOpenMenu} setIsOpen={setIsOpenMenu} />
    </nav>
  )
}

export default Secondbar
