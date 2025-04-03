import ExploreItem from "@/components/client/ExploreItem"
import FeaturesSection from "@/components/client/FeatureSelection"
import LiveAuctions from "@/components/client/LiveAuctions"
import SpecialItem from "@/components/client/SpecialItem"
import React from "react"

const Home: React.FC = () => {
  return (
    <>
      <ExploreItem />
      <SpecialItem />
      <LiveAuctions />
      <FeaturesSection />
    </>
  )
}
export default Home
