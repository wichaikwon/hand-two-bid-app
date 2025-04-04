"use client"
import React from "react"
import { t } from "i18next"

const ProductsSection: React.FC = () => {
  return (
    <div className="px-4 py-10 md:px-0">
      <div className="flex flex-col justify-center gap-2 md:flex-row">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col bg-teal-400 p-4">
            <div className="flex h-full flex-col gap-2 border border-teal-400 p-4 text-white transition-all duration-300 hover:border-white md:px-16 md:py-8">
              <span className="text-3xl font-bold text-white">{t(`productsSection.title`)} </span>
              <span className="">20 {t(`productsSection.subtitle`)}</span>
              <button className="mt-6 flex font-medium w-fit rounded-full border p-2 transition-colors duration-300 hover:border-white hover:bg-white hover:text-blue-500">
                {t(`productsSection.button`)}
              </button>
            </div>
          </div>
          <div className="flex h-[217px] w-full items-center justify-center bg-gray-200 text-2xl font-bold md:h-[434px] md:w-[768px]">
            test
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex h-[217px] w-full items-center justify-center bg-gray-200 text-2xl font-bold md:h-[434px] md:w-[768px]">
            test
          </div>
          <div className="flex h-[155px] w-full items-center justify-center bg-gray-200 text-2xl font-bold md:h-[310px] md:w-[768px]">
            test
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsSection
