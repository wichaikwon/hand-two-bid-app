"use client"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { images } from "@/types/liveAuctions"
const LiveAuctions: React.FC = () => {
  const router = useRouter()
  const [currIndex, setCurrIndex] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(4)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1)
      } else {
        setItemsPerPage(4)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrIndex((prev) => prev + 1)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrIndex((prev) => prev - 1)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const getVisibleItems = () => {
    const startIndex = currIndex * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return images.slice(startIndex, endIndex)
  }
  return (
    <div className="flex flex-col gap-2 py-10">
      <div className="flex items-center justify-between">
        <span className="text-yellow-500 uppercase">Live Auctions</span>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currIndex === 0}
            className="border transition-colors duration-300 hover:bg-slate-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={handleNext}
            disabled={currIndex === images.length}
            className="border transition-colors duration-300 hover:bg-slate-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 transition-opacity duration-300 md:flex-row">
        {getVisibleItems().map((item, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-center justify-center gap-2 md:w-1/3" // กำหนดความกว้างเท่ากัน
          >
            <div className="relative flex w-full items-center justify-center">
              {" "}
              {/* ใช้ w-full */}
              <Image
                width={400}
                height={400}
                className="h-auto w-full" // ใช้ w-full และ object-cover
                src={item.image[0]}
                alt={`Image ${index + 1}`}
              />
              <div className="absolute top-2 left-2 flex gap-1 bg-red-500 p-1 text-white">
                <Eye />
                {item.View}
              </div>
            </div>
            <div className="flex w-full flex-col">
              {" "}
              {/* ใช้ w-full */}
              <span className="font-bold">{item.name}</span>
              <div className="flex w-full items-center justify-between gap-2">
                {" "}
                {/* ใช้ w-full */}
                <div className="flex flex-1 flex-col">
                  {" "}
                  {/* ใช้ flex-1 */}
                  <span className="line-clamp-2 text-sm text-gray-500">
                    {" "}
                    {/* จำกัดบรรทัด */}
                    {item.description}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.price)}
                  </span>
                </div>
                <button
                  onClick={() => router.push(`/auctions/${currIndex + 1}`)}
                  className="bg-slate-900 px-4 py-2 text-sm font-bold text-yellow-500 shadow-lg transition duration-300 hover:bg-slate-800"
                >
                  Bid Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveAuctions
