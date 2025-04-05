"use client"
import { Navigation, Search, UserPlus } from "lucide-react"
import React from "react"
import { t } from "i18next"
const FeatureSection: React.FC = () => {
  return (
    <div className="py-10">
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-4">
        {[
          { Icon: UserPlus, key: "user" },
          { Icon: Navigation, key: "explore" },
          { Icon: Search, key: "search" },
        ].map(({ Icon, key }) => (
          <div
            key={key}
            className="z-10 flex items-center justify-center gap-4 rounded-lg bg-slate-50 p-4 md:bg-transparent"
          >
            <div className= "rounded-full bg-blue-500 p-4 text-white md:p-8">
              <Icon fill="white" size={28} />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center md:hidden">
              <span className="text-lg font-semibold">{t(`layout.feature_section.${key}`)}</span>
              <span className="text-xs">{t(`layout.feature_section.${key}_title`)}</span>
            </div>
          </div>
        ))}
        <div className="absolute inset-0 left-1/2 block border-l-6 border-dotted border-blue-500/50 md:hidden" />
        <hr className="absolute inset-0 top-1/2 mx-40 hidden border-2 border-dashed border-blue-500/50 text-gray-500 md:block lg:mx-52" />
      </div>
      <div className="hidden grid-cols-1 gap-4 md:grid md:grid-cols-3">
        {["user", "explore", "search"].map((key) => (
          <div key={key} className="flex flex-col items-center">
            <span className="text-lg font-semibold">{t(`layout.feature_section.${key}`)}</span>
            <span className="text-xs">{t(`layout.feature_section.${key}_title`)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureSection
