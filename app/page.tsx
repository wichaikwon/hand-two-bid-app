import EmblaCarousel from "@/components/client/Carousel/EmblaCarousel"
import React from "react"
import { EmblaOptionsType } from "embla-carousel"
import LatestAuctions from "@/components/client/LatestAuctions"

const Home: React.FC = () => {
  const OPTIONS: EmblaOptionsType = { loop: true }
  const IMAGES = [
    "/carousel/iPhone-wallpaper.jpg",
    "/carousel/mac.jpg",
    "/carousel/samsung-wallpaper.jpg",
    "/carousel/tablet.jpg",
    "/carousel/template.jpg",
  ]

  return (
    <>
      <EmblaCarousel images={IMAGES} options={OPTIONS} />
      <div className="container mx-auto">
        <LatestAuctions />
      </div>
    </>
  )
}
export default Home
