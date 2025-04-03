"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState, useCallback, useEffect } from "react"

const SpecialItem: React.FC = () => {
  const router = useRouter()
  const images = [
    {
      image: [
        "https://placehold.co/700x500/green/white",
        "https://placehold.co/600x350/blue/white",
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    },
    {
      image: ["https://placehold.co/700x500/red/white", "https://placehold.co/600x350/green/white"],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    },
    {
      image: [
        "https://placehold.co/700x500/orange/white",
        "https://placehold.co/600x350/purple/white",
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    },
  ]

  const [currIndex, setCurrIndex] = useState<number>(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrev()
    }
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const startX = event.clientX
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diffX = moveEvent.clientX - startX
      if (diffX > 50) {
        goToPrev()
        document.removeEventListener("mousemove", handleMouseMove)
      } else if (diffX < -50) {
        goToNext()
        document.removeEventListener("mousemove", handleMouseMove)
      }
    }
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const goToPrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrIndex((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrIndex((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="flex flex-col py-10">
      <div className="relative flex justify-between gap-20 overflow-hidden">
        <div
          className="absolute inset-0 z-20 cursor-grab"
          onMouseDown={handleMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />

        <div className="hidden md:flex md:gap-2">
          <div
            className={`transition-transform duration-500 ease-in-out ${isAnimating ? "opacity-70" : "opacity-100"}`}
          >
            <Image
              src={images[currIndex].image[0]}
              alt=""
              width={700}
              height={500}
              className={`${isAnimating ? "scale-95" : "scale-100"} transition-all duration-500`}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-2">
          <span className=" bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-2xl font-bold text-transparent">
            Special Item
          </span>
          <div className="flex w-full justify-center gap-2 md:hidden">
            <div
              className={`z-10 transition-transform duration-500 ease-in-out ${isAnimating ? "opacity-70" : "opacity-100"}`}
            >
              <Image
                src={images[currIndex].image[1]}
                alt=""
                width={600}
                height={350}
                className={`rounded-lg ${isAnimating ? "scale-95" : "scale-100"} transition-all duration-500`}
              />
            </div>
          </div>

          <span
            className={`transition-opacity duration-500 text-3xl font-bold  ${isAnimating ? "opacity-0" : "opacity-100"}`}
          >
            Speacial Auction
          </span>

          <span
            className={`transition-opacity duration-500 text-3xl font-bold ${isAnimating ? "opacity-0" : "opacity-100"}`}
          >
            New Phones Collection
          </span>
          <span
            className={`transition-opacity duration-500 text-sm text-gray-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
          >
            {images[currIndex].description}
          </span>
          <div className="z-20 flex gap-2">
            <button
              onClick={() => router.push(`/auctions/${currIndex + 1}`)}
              className="flex-1 bg-slate-900 py-4 font-bold text-yellow-500 shadow-lg transition duration-300 hover:bg-slate-800"
            >
              Bid Now
            </button>
            <button
              onClick={() => router.push(`/auctions`)}
              className="flex-1 border bg-white py-4 font-bold"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full items-center justify-center">
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index !== currIndex && !isAnimating) {
                  setIsAnimating(true)
                  setCurrIndex(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }
              }}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${currIndex === index ? "w-4 bg-black" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpecialItem
