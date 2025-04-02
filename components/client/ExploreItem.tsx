"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const ExploreItem: React.FC = () => {
  const router = useRouter()
  const images = [
    {
      imageThumbnail: [
        "https://placehold.co/200x200/green/white",
        "https://placehold.co/200x200/blue/white",
      ],
      image: ["https://placehold.co/200x404/green/white"],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      price: 500,
    },
    {
      imageThumbnail: [
        "https://placehold.co/200x200/green/white",
        "https://placehold.co/200x200/blue/white",
      ],
      image: ["https://placehold.co/200x404/green/white"],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      price: 500,
    },
    {
      imageThumbnail: [
        "https://placehold.co/200x200/red/white",
        "https://placehold.co/200x200/green/white",
        "https://placehold.co/200x200/green/white",
        "https://placehold.co/200x200/green/white",
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      price: 500,
    },
    {
      imageThumbnail: [
        "https://placehold.co/200x200/green/white",
        "https://placehold.co/200x200/blue/white",
      ],
      image: ["https://placehold.co/200x404/green/white"],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      price: 500,
    },
    {
      imageThumbnail: [
        "https://placehold.co/200x200/red/white",
        "https://placehold.co/200x200/green/white",
        "https://placehold.co/200x200/green/white",
        "https://placehold.co/200x200/green/white",
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      price: Math.floor(Math.random() * 1000) + 1,
    },
    {
      image: ["https://placehold.co/200x404/orange/white"],
      imageThumbnail: [
        "https://placehold.co/200x200/orange/white",
        "https://placehold.co/200x200/purple/white",
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
      price: 500,
    },
  ]
  const [currIndex, setCurrIndex] = useState<number>(1)
  const imagesPerPage = 3
  const indexOfLastImage = currIndex * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const slicedImages = images.slice(indexOfFirstImage, indexOfLastImage)

  const handleNext = () => {
    if (currIndex < Math.ceil(images.length / imagesPerPage)) {
      setCurrIndex(currIndex + 1)
    }
  }
  const handlePrev = () => {
    if (currIndex > 1) {
      setCurrIndex(currIndex - 1)
    }
  }
  return (
    <div className="flex flex-col gap-2 py-10">
      <div className="flex items-center justify-between">
        <span className="text-yellow-500 uppercase">Explore Item </span>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="border transition-colors duration-300 hover:bg-slate-900 hover:text-white"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={handleNext}
            className="border transition-colors duration-300 hover:bg-slate-900 hover:text-white"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-nowrap items-center justify-between gap-2 overflow-x-auto md:flex-row">
        {slicedImages.map((item, index) => (
          <div key={index} className="flex flex-col border p-2">
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
                    style={{ width: "auto", height: "auto" }}
                  />
                ))}
              </div>
              {item.image ? (
                <div className="grid grid-cols-1">
                  {item.image?.map((img, imgIndex) => (
                    <Image
                      key={imgIndex}
                      src={img}
                      alt={`image-${index}-${imgIndex}`}
                      width={200}
                      height={404}
                      style={{ width: "auto", height: "auto" }}
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-1 flex-col">
                <span className="text-gray-500">{`Item ${index + 1}`}</span>
                <span>${item.price}</span>
              </div>
              <button
                onClick={() => {
                  router.push(`/auctions/${index + 1}`)
                }}
                className="border-yellow-404 hover:bg-yellow-404 flex-1 rounded-sm border-2 py-1 font-bold text-yellow-500 transition duration-300 hover:bg-yellow-500 hover:text-white"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExploreItem
