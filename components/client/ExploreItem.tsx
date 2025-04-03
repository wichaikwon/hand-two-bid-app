"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { images } from "@/types/exploreItem"
const ExploreItem: React.FC = () => {
  const router = useRouter()

  const [currIndex, setCurrIndex] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(3)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1)
      } else {
        setItemsPerPage(3)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalPages = Math.ceil(images.length / itemsPerPage)

  const getVisibleItems = () => {
    const startIndex = currIndex * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return images.slice(startIndex, endIndex)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrIndex((prev) => (prev + 1) % totalPages)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrIndex((prev) => (prev - 1 + totalPages) % totalPages)
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="flex flex-col gap-2 py-10">
      <div className="flex items-center justify-between">
        <span className="text-yellow-500 uppercase">Explore Item</span>
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
            disabled={currIndex === totalPages - 1}
            className="border transition-colors duration-300 hover:bg-slate-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col justify-between gap-2 transition-opacity duration-300 md:flex-row ${isAnimating ? "opacity-70" : "opacity-100"}`}
      >
        {getVisibleItems().map((item, index) => (
          <div
            key={`${currIndex}-${index}`}
            className="flex flex-col border p-2 transition-transform duration-300"
          >
            <div
              className={`flex items-center justify-center ${item.imageThumbnail.length === 4 ? "" : "gap-1"}`}
            >
              <div
                className={`grid ${item.imageThumbnail.length === 4 ? "grid-cols-2" : "grid-cols-1"} gap-1`}
              >
                {item.imageThumbnail.map((img, imgIndex) => (
                  <Image
                    key={imgIndex}
                    src={img}
                    alt={`image-${index}-${imgIndex}`}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                ))}
              </div>
              {item.image && (
                <div className="grid grid-cols-1">
                  {item.image.map((img, imgIndex) => (
                    <Image
                      key={imgIndex}
                      src={img}
                      alt={`image-${index}-${imgIndex}`}
                      width={200}
                      height={404}
                      className="object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex flex-1 flex-col">
                <span className="text-gray-500">{`Item ${images.indexOf(item) + 1}`}</span>
                <span>${item.price}</span>
              </div>
              <button
                onClick={() => router.push(`/auctions/${images.indexOf(item) + 1}`)}
                className="border-yellow-404 hover:bg-yellow-404 flex-1 rounded-sm border-2 py-1 font-bold text-yellow-500 transition duration-300 hover:bg-yellow-500 hover:text-white"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${currIndex === index ? "w-6 bg-yellow-500" : "bg-gray-300"}`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ExploreItem
