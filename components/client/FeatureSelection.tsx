// components/FeaturesSection.tsx
import React from "react"
import FeatureCard from "./FeatureCard"
import { FeatureItem } from "@/types/feature"
import { UserPlus, Search, Gavel } from "lucide-react"

const FeaturesSection: React.FC = () => {
  const features: FeatureItem[] = [
    {
      title: "Create Account",
      description: "Create Account On Web Or On App By Email Id Or Social Media.",
      icon: <UserPlus className="h-6 w-6" />,
    },
    {
      title: "Explore Items",
      description:
        "Explore Items From Variety Of Categories Like Jewelry, Sculptures, Collectibles Etc.",
      icon: <Search className="h-6 w-6" />,
    },
    {
      title: "Place Bid",
      description:
        "Place Bids On Auctions To Buy Items And If You Bid Highest You Will Win The Auction.",
      icon: <Gavel className="h-6 w-6" />,
    },
  ]

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">How It Works</h2>

        <div className="relative">
          <div className="absolute right-4 left-4 hidden h-0.5 -translate-y-1/2 transform border-t-2 border-dashed border-gray-300 md:top-1/5 md:block" />

          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.title} className="relative">
                {index < features.length - 1 && (
                  <>
                    <div className="absolute top-full left-1/9 h-8 w-0.5 -translate-x-1/2 transform border-l-2 border-dashed border-gray-300 sm:left-1/2 md:hidden" />
                    <div className="absolute top-full left-1/9 h-2 w-2 -translate-x-1/2 translate-y-8 transform rounded-full bg-gray-300 sm:left-1/2 md:hidden" />
                  </>
                )}
                <FeatureCard feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
