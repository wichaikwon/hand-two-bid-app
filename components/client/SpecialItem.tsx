"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const SpecialItem: React.FC = () => {
  const router = useRouter()
  const images = [
    {
      image1: "https://placehold.co/700x500/green/white",
      image2: "https://placehold.co/600x350/blue/white",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    },
    {
      image1: "https://placehold.co/700x500/red/white",
      image2: "https://placehold.co/600x350/green/white",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    },
    {
      image1: "https://placehold.co/700x500/orange/white",
      image2: "https://placehold.co/600x350/purple/white",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    },
  ]

  const [currIndex, setCurrIndex] = useState<number>(0)

  const handleClick = (index: number) => {
    setCurrIndex(index)
  }
  return (
    <div className="relative flex flex-col items-center justify-between gap-20 py-10 md:flex-row">
      <div className="hidden md:block">
        <Image
          src={images[currIndex].image1}
          alt="carousel-image1"
          width={300}
          height={300}
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4 md:gap-8">
        <span className="text-yellow-500 uppercase">Special Item</span>

        <div className="flex md:hidden">
          <Image
            src={images[currIndex].image2}
            alt="carousel-image2"
            width={300}
            height={300}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <span className="text-3xl font-bold">
          Special Item <br />
          New Brands Offer
        </span>
        <span className="text-gray-500">{images[currIndex].description}</span>
        <div className="flex w-full justify-between gap-8 md:w-1/2">
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
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2">
        {images.map((_, index) => (
          <button
            onClick={() => handleClick(index)}
            key={index}
            className={`h-3 w-3 rounded-full ${currIndex === index ? "bg-yellow-600" : "bg-gray-400"}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default SpecialItem
