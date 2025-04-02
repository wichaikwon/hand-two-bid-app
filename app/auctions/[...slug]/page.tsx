"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, Clock, User, ArrowLeft } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

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
  seller: {
    name: string
    rating: number
    joinDate: string
  }
  bids: {
    id: string
    bidder: string
    amount: number
    time: Date
  }[]
}

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const pathname = usePathname()
  const id = pathname.split("/").pop()
  const [auctionItem, setAuctionItem] = useState<AuctionItem | null>(null)
  const [bidAmount, setBidAmount] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<string>("")

  // Fetch auction data
  useEffect(() => {
    const fetchAuctionItem = async () => {
      try {
        setIsLoading(true)
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/auctions/${params.id}`)
        // const data = await response.json()

        // Mock data for demonstration
        const mockData: AuctionItem = {
          id: params.id,
          title: "Antique Wooden Chair",
          description:
            "Vintage wooden chair from 1920s, excellent condition. This beautiful piece has been carefully restored and maintained. The wood shows its age with a beautiful patina that adds to its character. Perfect for collectors or those looking for a unique statement piece in their home.",
          currentBid: 120,
          startingPrice: 50,
          endTime: new Date(Date.now() + 86400000), // 1 day from now
          images: [
            "https://placehold.co/600x400/EEE/31343C",
            "https://placehold.co/600x400/DDD/31343C",
            "https://placehold.co/600x400/CCC/31343C",
          ],
          isLiked: false,
          bidsCount: 8,
          seller: {
            name: "AntiqueCollector42",
            rating: 4.8,
            joinDate: "2020-05-15",
          },
          bids: [
            { id: "1", bidder: "Collector1", amount: 50, time: new Date(Date.now() - 86400000) },
            { id: "2", bidder: "VintageLover", amount: 60, time: new Date(Date.now() - 43200000) },
            { id: "3", bidder: "FurnitureFan", amount: 75, time: new Date(Date.now() - 21600000) },
            { id: "4", bidder: "HistoryBuff", amount: 90, time: new Date(Date.now() - 10800000) },
            { id: "5", bidder: "Collector1", amount: 100, time: new Date(Date.now() - 3600000) },
            { id: "6", bidder: "VintageLover", amount: 110, time: new Date(Date.now() - 1800000) },
            { id: "7", bidder: "NewBidder", amount: 115, time: new Date(Date.now() - 900000) },
            { id: "8", bidder: "FurnitureFan", amount: 120, time: new Date(Date.now() - 300000) },
          ],
        }

        setAuctionItem(mockData)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch auction details")
        setIsLoading(false)
        console.error(err)
      }
    }

    fetchAuctionItem()
  }, [params.id])

  // Update time remaining
  useEffect(() => {
    if (!auctionItem) return

    const updateTime = () => {
      setTimeRemaining(formatTimeRemaining(auctionItem.endTime))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [auctionItem])

  const toggleLike = () => {
    if (auctionItem) {
      setAuctionItem({
        ...auctionItem,
        isLiked: !auctionItem.isLiked,
      })
    }
  }

  const formatTimeRemaining = (endTime: Date): string => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()

    if (diff <= 0) return "Auction ended"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h ${minutes}m left`
    if (hours > 0) return `${hours}h ${minutes}m left`
    return `${minutes}m left`
  }

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault()
    if (!auctionItem || !bidAmount) return

    const amount = parseFloat(bidAmount)
    if (isNaN(amount)) {
      alert("Please enter a valid bid amount")
      return
    }

    if (amount <= auctionItem.currentBid) {
      alert(`Your bid must be higher than the current bid of $${auctionItem.currentBid}`)
      return
    }

    // In a real app, you would submit to your API here
    console.log(`Placing bid of $${amount} on item ${auctionItem.id}`)

    // Mock update
    const newBid = {
      id: `${auctionItem.bids.length + 1}`,
      bidder: "You",
      amount: amount,
      time: new Date(),
    }

    setAuctionItem({
      ...auctionItem,
      currentBid: amount,
      bidsCount: auctionItem.bidsCount + 1,
      bids: [...auctionItem.bids, newBid],
    })

    setBidAmount("")
    alert(`Successfully placed bid of $${amount}`)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
        <button
          onClick={() => router.push("/auctions")}
          className="mt-4 flex items-center rounded-lg bg-gray-200 px-4 py-2"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Auctions
        </button>
      </div>
    )
  }

  if (!auctionItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
          Auction not found
        </div>
        <button
          onClick={() => router.push("/auctions")}
          className="mt-4 flex items-center rounded-lg bg-gray-200 px-4 py-2"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Auctions
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/auctions")}
        className="mb-6 flex items-center rounded-lg bg-gray-200 px-4 py-2"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Auctions
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Images */}
        <div>
          <div className="relative mb-4 h-96 w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={auctionItem.images[0]}
              alt={auctionItem.title}
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={toggleLike}
              className={`absolute top-4 right-4 rounded-full p-3 ${auctionItem.isLiked ? "bg-red-500 text-white" : "bg-white text-gray-700"}`}
            >
              <Heart size={24} fill={auctionItem.isLiked ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {auctionItem.images.slice(0, 3).map((image, index) => (
              <div key={index} className="relative h-32 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={image}
                  alt={`${auctionItem.title} - ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div>
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold">{auctionItem.title}</h1>
            <div className="mb-4 flex items-center text-gray-500">
              <span>Item #{auctionItem.id}</span>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Current Bid</p>
                <p className="text-3xl font-bold text-blue-600">
                  ${auctionItem.currentBid.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center text-red-500">
                <Clock size={20} className="mr-2" />
                <span className="font-medium">{timeRemaining}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">Description</h2>
              <p className="whitespace-pre-line text-gray-700">{auctionItem.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">Seller Information</h2>
              <div className="flex items-center rounded-lg bg-gray-50 p-4">
                <div className="mr-4 rounded-full bg-blue-100 p-3">
                  <User size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{auctionItem.seller.name}</p>
                  <p className="text-gray-600">
                    ⭐ {auctionItem.seller.rating} | Member since{" "}
                    {new Date(auctionItem.seller.joinDate).getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bid Form */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold">Place a Bid</h2>
            <form onSubmit={handlePlaceBid}>
              <div className="mb-4">
                <label htmlFor="bidAmount" className="mb-1 block text-sm font-medium text-gray-700">
                  Your Bid (Minimum: ${(auctionItem.currentBid + 1).toFixed(2)})
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  min={auctionItem.currentBid + 1}
                  step="1"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder={`Enter $${(auctionItem.currentBid + 1).toFixed(2)} or more`}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Place Bid
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bid History */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="mb-6 text-2xl font-bold">Bid History ({auctionItem.bidsCount})</h2>
          <button
            className="mb-6 text-2xl font-bold"
            onClick={() => router.push(`/auctions/${id}/history`)}
          >
            View All Bids
          </button>
        </div>
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Bidder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {auctionItem.bids.map((bid) => (
                <tr key={bid.id}>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                    {bid.bidder}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    ${bid.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {bid.time.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
