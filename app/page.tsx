import EmblaCarousel from "@/components/client/carousel/EmblaCarousel"
import React from "react"
import { EmblaOptionsType } from "embla-carousel"
import LatestAuctions from "@/components/client/LatestAuctions"
import FeatureSection from "@/components/client/FeatureSection"
import TrendingAuction from "@/components/client/trending/TrendingAuction"

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
        <TrendingAuction />
        <LatestAuctions />
        <FeatureSection />
      </div>
    </>
  )
}
export default Home
