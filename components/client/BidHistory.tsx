import { Gavel } from 'lucide-react'

type Bid = {
  id: string
  bidder: string
  amount: number
  time: Date
  isWinner?: boolean
}

type BidHistoryProps = {
  bids: Bid[]
  currentBid: number
  title?: string
  itemId?: string
  className?: string
}

export default function BidHistory({ 
  bids, 
  currentBid, 
  title, 
  itemId, 
  className = '' 
}: BidHistoryProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold flex items-center">
            <Gavel className="mr-2 text-yellow-500" />
            {title}
          </h2>
          {itemId && <p className="text-gray-600 mt-1">Item #{itemId}</p>}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidder</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bids.map((bid) => (
              <tr 
                key={bid.id} 
                className={bid.isWinner ? 'bg-green-50' : ''}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-medium">
                        {bid.bidder.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{bid.bidder}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">${bid.amount.toFixed(2)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(bid.time)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {bid.isWinner ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Winning
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Outbid
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{bids.length}</span> bids
          </p>
          <p className="text-sm font-medium text-gray-900">
            Current Bid: <span className="text-blue-600">${currentBid.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}