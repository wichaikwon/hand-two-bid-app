import React from "react"

const Home: React.FC = () => {
  return (
    <>
      <main className="container mx-auto p-8">
        <div className="border-gold-300 bg-gold-50 rounded-lg border bg-white p-6 shadow-md">
          <h2 className="text-gold-700 mb-4 text-2xl">Gold Collection</h2>
          <p className="mb-4 text-gray-700">
            Discover our premium gold items crafted with perfection.
          </p>
          <button className="bg-gold-600 hover:bg-gold-700 rounded px-4 py-2 text-white">
            View Collection
          </button>
        </div>
      </main>
      <div className="gold-card">
        <h2 className="gold-card-title">Gold Collection</h2>
        <button className="gold-button">View Collection</button>
      </div>
    </>
  )
}
export default Home
