import Image from "next/image"
import { usePathname } from "next/navigation"
import React, { useState } from "react"
import MenuItem from "./MenuItem"
import {
  ChevronDown,
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingBasket,
  Truck,
  User,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import { NAVBAR_LINKS } from "@/constants/navbar"
import SignIn from "./SignIn"

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [isOpenSignIn, setIsOpenSignIn] = useState(false)
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const [isCategory, setIsCategory] = useState<string>(t(`layout.navbar.category`))
  const isActive = (path: string) => {
    return pathname === path
  }
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="relative">
          <div className="flex cursor-pointer items-center gap-4">
            <div
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className="flex items-center gap-1 hover:opacity-75"
            >
              <span className="text-base font-bold">{t(`layout.lang`)}</span>
              <div className="text-gray-500">
                <ChevronDown size={16} />
              </div>
            </div>
            <div className="hidden items-center gap-1 hover:opacity-75 md:flex">
              <span className="text-gray-500">{t(`layout.navbar.call`)} :</span>
              <button className="font-bold hover:text-gray-500" onClick={() => "tel:081-234-5678"}>
                081-234-5678
              </button>
            </div>
            <div className="hidden items-center gap-1 hover:opacity-75 md:flex">
              <span className="text-gray-500">{t(`layout.navbar.email`)} :</span>
              <button
                className="font-bold hover:text-gray-500"
                onClick={() => "mailto:admin@auction.com"}
              >
                admin@auction.com
              </button>
            </div>
          </div>
          <button
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={`absolute top-6 left-0 z-10 flex w-32 bg-white p-2 shadow-lg transition-opacity duration-500 ease-in-out ${
              isOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            {language === "th" ? (
              <span
                className="flex w-full hover:text-gray-500"
                onClick={() => {
                  changeLanguage("en")
                  setIsOpen(false)
                }}
              >
                EN
              </span>
            ) : (
              <span
                className="flex w-full hover:text-gray-500"
                onClick={() => {
                  changeLanguage("th")
                  setIsOpen(false)
                }}
              >
                TH
              </span>
            )}
          </button>
        </div>
        <div className="flex gap-4 md:hidden">
          <button
            className="font-bold hover:text-gray-500"
            onClick={() => "mailto:admin@auction.com"}
          >
            <Mail size={16} />
          </button>
          <button className="font-bold hover:text-gray-500" onClick={() => "tel:081-234-5678"}>
            <Phone size={16} />
          </button>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-2 hover:opacity-75">
            <Truck fill="black" size={16} />
            <button>
              <span className="">{t(`layout.navbar.delivery`)}</span>
            </button>
          </div>
          <div className="flex items-center gap-2 hover:opacity-75">
            <Heart size={16} />
            <button>
              <span className="">{t(`layout.navbar.wishlist`)}</span>
            </button>
          </div>
        </div>
      </nav>
      <hr className="text-gray-200" />
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
          <button onClick={() => setIsOpenSignIn(!isOpenSignIn)}>
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
                  <div className="absolute top-full left-0 z-10 mt-1 w-48 scale-100 transform rounded-md bg-white shadow-lg transition-transform duration-300 ease-in-out">
                    <ul className="flex flex-col gap-2 p-2">
                      {[1, 2, 3].map((item) => (
                        <li
                          key={item}
                          onClick={() => setIsCategory(t(`layout.navbar.category${item}`))}
                          className="cursor-pointer p-1 hover:bg-gray-100"
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
      <hr className="text-gray-200" />
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
              onClick={() => setIsOpenSignIn(!isOpenSignIn)}
              className="border-b-2 border-blue-500 p-2 text-white transition-all duration-300 hover:border-b-2 hover:border-white"
            >
              {t(`layout.navbar.navbar_item.sign_in`)}
            </button>
          </div>
          <SignIn isOpen={isOpenSignIn} setIsOpen={setIsOpenSignIn} />
        </div>
      </nav>
    </>
  )
}

export default Navbar
