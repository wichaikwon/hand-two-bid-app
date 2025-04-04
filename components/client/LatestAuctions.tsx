"use client"

import { Eye, Gavel, Heart, Search } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const LatestAuctions: React.FC = () => {
  const { t } = useTranslation()
  const [price, setPrice] = useState("")
  const [hoverStates, setHoverStates] = useState<{
    [key: number]: {
      eye: boolean
      heart: boolean
      search: boolean
    }
  }>({
    1: { eye: false, heart: false, search: false },
    2: { eye: false, heart: false, search: false },
    3: { eye: false, heart: false, search: false },
    4: { eye: false, heart: false, search: false },
  })

  const handleHover = (
    itemIndex: number,
    buttonType: "eye" | "heart" | "search",
    isHovering: boolean
  ) => {
    setHoverStates((prev) => ({
      ...prev,
      [itemIndex]: {
        ...prev[itemIndex],
        [buttonType]: isHovering,
      },
    }))
  }
  const countdownToEndAuction = (endTime: Date, elementId: string) => {
    const updateCountdown = () => {
      const now = new Date()
      const distance = endTime.getTime() - now.getTime()

      if (distance < 0) {
        const element = document.getElementById(elementId)
        if (element) {
          element.innerHTML = `
            <div class="text-center">
              <div class="text-xl font-bold text-red-500">Auction ended</div>
            </div>
          `
        }
        clearInterval(intervalId)
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      const element = document.getElementById(elementId)
      if (element) {
        element.innerHTML = `
          <div class="grid grid-cols-4 gap-1 text-center">
            <div class="flex flex-col items-center">
              <span class="text-2xl font-bold">${days}</span>
              <span class="text-xs text-gray-500">Days</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-2xl font-bold">${hours}</span>
              <span class="text-xs text-gray-500">Hours</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-2xl font-bold">${minutes}</span>
              <span class="text-xs text-gray-500">Minutes</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-2xl font-bold">${seconds}</span>
              <span class="text-xs text-gray-500">Seconds</span>
            </div>
          </div>
        `
      }
    }

    updateCountdown()
    const intervalId = setInterval(updateCountdown, 1000)
  }

  useEffect(() => {
    const auctionEndTimes = [
      new Date(Date.now() + 86400000), // 1 วัน
      new Date(Date.now() + 172800000), // 2 วัน
      new Date(Date.now() + 259200000), // 3 วัน
      new Date(Date.now() + 345600000), // 4 วัน
    ]
    setPrice(
      (Math.random() * 1000).toLocaleString("th-TH", {
        style: "currency",
        currency: "THB",
      })
    )
    auctionEndTimes.forEach((endTime, index) => {
      countdownToEndAuction(endTime, `countdown-${index + 1}`)
    })
  }, [])

  return (
    <div className="flex flex-col py-10">
      <div className="flex flex-col gap-6">
        <span className="z-30 flex w-full justify-center text-4xl font-bold">
          {t("layout.latest_auctions.title")}
        </span>
        <div className="relative z-10 border-t border-slate-200">
          <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50 p-4 text-blue-500">
            <Gavel size={32} />
          </div>
        </div>
        <div className="z-10 mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="relative z-20 flex flex-1 cursor-pointer flex-col items-center justify-center border border-slate-100 bg-white shadow-md"
            >
              <div className="z-40 opacity-100 transition-opacity duration-700 ease-in-out hover:opacity-0">
                <Image
                  src={`/phones/iPhone_16_Pro_Max_Desert_Titanium_1-square_medium.webp`}
                  alt="iPhone_16_Pro_Max_Desert_Titanium_1-square_medium"
                  width={320}
                  height={320}
                />
              </div>
              <div className="absolute top-0 z-30 opacity-100 transition-opacity duration-700 ease-in-out">
                <Image
                  src={`/phones/iPhone_16_Pro_Max_Desert_Titanium_2-square_medium.webp`}
                  alt="iPhone_16_Pro_Max_Desert_Titanium_1-square_medium"
                  width={320}
                  height={320}
                />
              </div>
              <div className="absolute top-0 left-0 z-50 flex flex-col gap-4 p-4">
                <div className="relative flex items-center rounded-full bg-blue-500 p-2">
                  <Eye
                    size={16}
                    className="fill-white stroke-blue-500"
                    onMouseEnter={() => handleHover(item, 'eye', true)}
                    onMouseLeave={() => handleHover(item, 'eye', false)}
                  />
                  <span
                    className={`absolute text-sm left-10 rounded-md bg-black/70 px-2 py-0.5 text-white transition-opacity duration-300 ease-in-out ${
                      hoverStates[item]?.eye ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {t("layout.latest_auctions.view_auction")}
                  </span>
                </div>
                <div className="relative flex items-center rounded-full bg-blue-500 p-2">
                  <Heart
                    size={16}
                    className="fill-white stroke-blue-500"
                    onMouseEnter={() => handleHover(item, 'heart', true)}
                    onMouseLeave={() => handleHover(item, 'heart', false)}
                  />
                  <span
                    className={`absolute left-10 text-sm rounded-md bg-black/70 px-2 py-0.5 text-white transition-opacity duration-300 ease-in-out ${
                      hoverStates[item]?.heart ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {t("layout.latest_auctions.add_to_wishlist")}
                  </span>
                </div>
                <div className="relative flex items-center rounded-full bg-blue-500 p-2 text-white">
                  <Search
                    size={16}
                    className="fill-white stroke-white"
                    onMouseEnter={() => handleHover(item, 'search', true)}
                    onMouseLeave={() => handleHover(item, 'search', false)}
                  />
                  <span
                    className={`absolute text-sm left-10 rounded-md bg-black/70 px-2 py-0.5 text-white transition-opacity duration-300 ease-in-out ${
                      hoverStates[item]?.search ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {t("layout.latest_auctions.search_auction")}
                  </span>
                </div>
              </div>
              <hr className="w-full text-gray-200" />
              <span className="font-bold">{t(`layout.latest_auctions.item_name`)}</span>
              <span className="text-xs">
                {t("layout.latest_auctions.current_bid")} : {price}
              </span>
              <div className="flex w-full flex-col items-center p-2">
                <span className="mb-1 text-xs text-gray-500">
                  {t("layout.latest_auctions.auction_ends")}
                </span>
                <div id={`countdown-${item}`} className="w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LatestAuctions
