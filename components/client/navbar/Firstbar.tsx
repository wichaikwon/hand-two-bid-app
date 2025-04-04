'use client'
import { ChevronDown, Heart, Mail, Phone, Truck } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Firstbar: React.FC = () => {
      const {
        t,
        i18n: { language, changeLanguage },
      } = useTranslation()
      const [isOpen, setIsOpen] = useState(false)
      
    return (
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
    );
};

export default Firstbar;