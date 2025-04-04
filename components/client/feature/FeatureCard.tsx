import React from "react"
import { FeatureItem } from "@/types/feature"

interface FeatureCardProps {
  feature: FeatureItem
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="flex flex-row items-center gap-4 md:flex-col">
      {feature.icon && <div className="bg-slate-900 p-8 text-yellow-600">{feature.icon}</div>}
      <div>
        <h3 className="py-2 text-center text-xl font-semibold text-gray-800">{feature.title}</h3>
        <div className="text-center text-gray-600">{feature.description}</div>
      </div>
    </div>
  )
}

export default FeatureCard
