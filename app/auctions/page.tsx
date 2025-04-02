"use client"
import { useState } from "react"
import Image from "next/image"
import { Heart, Clock, Gavel } from "lucide-react"
import { useRouter } from "next/navigation"

type AuctionItem = {
  id: string
  title: string
  description: string
  currentBid: number
  startingPrice: number
  endTime: Date
  images: string[]
  isLiked: boolean
  bidsCount: number
}

const Auctions: React.FC = () => {
  const router = useRouter()
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([
    {
      id: "1",
      title: "Antique Wooden Chair",
      description: "Vintage wooden chair from 1920s, excellent condition",
      currentBid: 120,
      startingPrice: 50,
      endTime: new Date(Date.now() + 86400000), 
      images: ["https://placehold.co/400x300/EEE/31343C"],
      isLiked: false,
      bidsCount: 8,
    },
    {
      id: "2",
      title: "Rare Vintage Watch",
      description: "Limited edition 1960s wristwatch, working condition",
      currentBid: 450,
      startingPrice: 200,
      endTime: new Date(Date.now() + 172800000), 
      images: ["https://placehold.co/400x300/EEE/31343C"],
      isLiked: true,
      bidsCount: 12,
    },
    {
      id: "3",
      title: "Oil Painting Landscape",
      description: "Original oil painting by local artist, 24x36 inches",
      currentBid: 320,
      startingPrice: 150,
      endTime: new Date(Date.now() + 259200000), 
      images: ["https://placehold.co/400x300/EEE/31343C"],
      isLiked: false,
      bidsCount: 5,
    },
    {
      id: "4",
      title: "Collector Coin Set",
      description: "Complete set of rare coins from 1800s",
      currentBid: 780,
      startingPrice: 500,
      endTime: new Date(Date.now() + 432000000),
      images: ["https://placehold.co/400x300/EEE/31343C"],
      isLiked: false,
      bidsCount: 15,
    },
    {
      id: "5",
      title: "Mid-century Modern Lamp",
      description: "Designer table lamp from 1950s",
      currentBid: 210,
      startingPrice: 100,
      endTime: new Date(Date.now() + 604800000), 
      images: ["https://placehold.co/400x300/EEE/31343C"],
      isLiked: true,
      bidsCount: 7,
    },
    {
      id: "6",
      title: "Signed First Edition Book",
      description: "First edition novel signed by author",
      currentBid: 180,
      startingPrice: 80,
      endTime: new Date(Date.now() + 86400000), 
      images: ["https://placehold.co/400x300/EEE/31343C"],
      isLiked: false,
      bidsCount: 9,
    },
  ])

  const toggleLike = (id: string) => {
    setAuctionItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, isLiked: !item.isLiked } : item))
    )
  }

  const formatTimeRemaining = (endTime: Date): string => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()

    if (diff <= 0) return "Auction ended"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days}d ${hours}h left`
    if (hours > 0) return `${hours}h left`

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${minutes}m left`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Live Auctions</h1>
      <div className="mb-6 flex items-center flex-col md:flex-row gap-2 justify-between">
        <div className="flex space-x-2">
          <button className="rounded-lg bg-gray-200 px-4 py-2">All Items</button>
          <button className="rounded-lg bg-gray-200 px-4 py-2">Ending Soon</button>
          <button className="rounded-lg bg-gray-200 px-4 py-2">Highest Bids</button>
        </div>
        <select className="rounded-lg border px-4 py-2">
          <option>Sort by: Newest</option>
          <option>Sort by: Ending Soonest</option>
          <option>Sort by: Highest Bid</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3  bg-white">
        {auctionItems.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="relative">
              <Image
                src={item.images[0]}
                alt={item.title}
                width={400}
                height={300}
                className="h-48 w-full object-cover"
              />
              <button
                onClick={() => toggleLike(item.id)}
                className={`absolute top-2 right-2 rounded-full p-2 ${item.isLiked ? "bg-red-500 text-white" : "bg-white text-gray-700"}`}
              >
                <Heart size={20} fill={item.isLiked ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="line-clamp-1 text-lg font-semibold">{item.title}</h3>
                <span className="text-sm text-gray-500">#{item.id}</span>
              </div>

              <p className="mb-3 line-clamp-2 text-sm text-gray-600">{item.description}</p>

              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="text-xl font-bold">${item.currentBid.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Starting Price</p>
                  <p className="text-lg">${item.startingPrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <Gavel size={16} className="mr-1" />
                  <span>{item.bidsCount} bids</span>
                </div>
                <div className="flex items-center text-red-500">
                  <Clock size={16} className="mr-1" />
                  <span>{formatTimeRemaining(item.endTime)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push(`/auctions/${item.id}`)}
                className="w-full rounded-lg bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Place Bid
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          <button className="rounded-lg border px-4 py-2">Previous</button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">1</button>
          <button className="rounded-lg border px-4 py-2">2</button>
          <button className="rounded-lg border px-4 py-2">3</button>
          <button className="rounded-lg border px-4 py-2">Next</button>
        </div>
      </div>
    </div>
  )
}
export default Auctions
