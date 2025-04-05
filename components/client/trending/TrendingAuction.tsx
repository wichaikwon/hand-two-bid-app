"use client"
import React from "react"
import { t } from "i18next"
import Image from "next/image"

const TrendingAuction: React.FC = () => {
  const auctions = [
    {
      title: "GoPro MAX",
      category: "Cameras",
      image: "/gopro.png",
      ended: true,
    },
    {
      title: "Unique Watch",
      category: "Watches",
      image: "/watch.png",
      ended: true,
    },
    {
      title: "Black Premium Collection",
      category: "Antiques",
      image: "/black-collection.png",
      ended: true,
    },
    {
      title: "White Sony PS-4 Joystick",
      category: "Gaming",
      image: "/ps4.png",
      ended: false,
      timer: {
        days: 522,
        hours: 4,
        minutes: 43,
        seconds: 14,
      },
      startingBid: 350,
    },
    {
      title: "Macbook Air m1",
      category: "Laptops",
      image: "/macbook.png",
      ended: true,
      sale: true,
    },
  ]

  return (
    <div className="flex flex-col py-10">
      <div className="flex flex-1 flex-col">
        <span className="text-xl font-bold">{t(`layout.trending_auction.header`)}</span>
        <span className="text-sm text-gray-500">{t(`layout.trending_auction.title`)}</span>
        <div className="mt-4 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-1 flex-col items-center justify-center">
            <Image
              src={"https://placehold.co/600x400"}
              alt="Trending Auction"
              width={600}
              height={200}
              className="rounded-lg"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div className="grid flex-1 grid-cols-2 gap-10">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <Image
                  src={"https://placehold.co/400x200"}
                  alt={`Trending Auction ${index + 1}`}
                  width={400}
                  height={200}
                  className="rounded-lg"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingAuction
