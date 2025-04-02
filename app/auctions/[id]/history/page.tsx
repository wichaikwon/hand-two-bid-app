"use client"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Gavel } from "lucide-react"

type Bid = {
  id: string
  bidder: string
  amount: number
  time: Date
  isWinner?: boolean
}

type AuctionItem = {
  id: string
  title: string
  currentBid: number
  endTime: Date
  bids: Bid[]
}

const BidHistoryPage = () => {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [auction, setAuction] = useState<AuctionItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        setIsLoading(true)
        const auctionId = params.id // Unwrap params here

        // Mock data
        const mockAuction: AuctionItem = {
          id: auctionId,
          title: "Antique Wooden Chair",
          currentBid: 150,
          endTime: new Date(Date.now() + 86400000), // 1 day from now
          bids: [
            { id: "1", bidder: "Collector1", amount: 50, time: new Date(Date.now() - 86400000) },
            { id: "2", bidder: "VintageLover", amount: 60, time: new Date(Date.now() - 43200000) },
            { id: "3", bidder: "FurnitureFan", amount: 75, time: new Date(Date.now() - 21600000) },
            { id: "4", bidder: "HistoryBuff", amount: 90, time: new Date(Date.now() - 10800000) },
            { id: "5", bidder: "Collector1", amount: 100, time: new Date(Date.now() - 3600000) },
            { id: "6", bidder: "VintageLover", amount: 110, time: new Date(Date.now() - 1800000) },
            { id: "7", bidder: "NewBidder", amount: 120, time: new Date(Date.now() - 900000) },
            {
              id: "8",
              bidder: "TopBidder",
              amount: 150,
              time: new Date(Date.now() - 300000),
              isWinner: true,
            },
          ],
        }

        setAuction(mockAuction)
      } catch (err) {
        setError("Failed to load bid history")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAuctionData()
  }, [params.id])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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
          onClick={() => router.back()}
          className="mt-4 flex items-center rounded-lg bg-gray-200 px-4 py-2"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Auction
        </button>
      </div>
    )
  }

  if (!auction) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
          Auction not found
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 flex items-center rounded-lg bg-gray-200 px-4 py-2"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Auctions
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => router.push(`/auctions/${auction.id}`)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Auction
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="border-b p-6">
          <h1 className="flex items-center text-2xl font-bold">
            <Gavel className="mr-2 text-yellow-500" />
            Bid History: {auction.title}
          </h1>
          <p className="mt-2 text-gray-600">Item #{auction.id}</p>
        </div>

        <div className="overflow-x-auto">
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
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {auction.bids.map((bid) => (
                <tr key={bid.id} className={bid.isWinner ? "bg-green-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <span className="font-medium text-blue-600">
                          {bid.bidder.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{bid.bidder}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">${bid.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(bid.time)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {bid.isWinner ? (
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
                        Winning Bid
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs leading-5 font-semibold text-gray-800">
                        Outbid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{auction.bids.length}</span> bids
            </p>
            <p className="text-sm font-medium text-gray-900">
              Current Bid: <span className="text-blue-600">${auction.currentBid.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BidHistoryPage
