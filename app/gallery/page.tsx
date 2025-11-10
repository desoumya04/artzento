"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArtworkCard } from "@/components/artwork-card"
import { artworks, searchArtworks, sortArtworks } from "@/lib/mock-data"

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [priceFilter, setPriceFilter] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "newest">("newest")

  const categories = ["All", "Painting", "Abstract", "Digital Art", "Sculpture", "Photography", "Minimalist"]

  let filtered = artworks

  if (searchQuery) {
    filtered = searchArtworks(searchQuery)
  }

  filtered = filtered.filter((artwork) => {
    const categoryMatch = selectedCategory === "All" || artwork.category === selectedCategory
    const priceMatch = getPriceMatch(artwork.price, priceFilter)
    return categoryMatch && priceMatch
  })

  const displayedArtworks = sortArtworks(filtered, sortBy)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Art Gallery</h1>
            <p className="text-lg text-muted-foreground">
              Discover and purchase beautiful artworks from our collection of {artworks.length} unique pieces.
            </p>
          </div>
        </section>

        {/* Filters and Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search artworks, artists, or styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-border sticky top-20">
                {/* Category Filter */}
                <div className="mb-8">
                  <h3 className="font-bold text-foreground mb-4">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ease-out text-sm font-medium ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="border-t border-border pt-8 mb-8">
                  <h3 className="font-bold text-foreground mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {["All", "Under $300", "$300 - $400", "Over $400"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setPriceFilter(range)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ease-out text-sm font-medium ${
                          priceFilter === range
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-8 mb-8">
                  <h3 className="font-bold text-foreground mb-4">Sort By</h3>
                  <div className="space-y-2">
                    {[
                      { value: "newest", label: "Newest First" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as "price-low" | "price-high" | "newest")}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ease-out text-sm font-medium ${
                          sortBy === option.value
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setSelectedCategory("All")
                    setPriceFilter("All")
                    setSearchQuery("")
                    setSortBy("newest")
                  }}
                  className="w-full px-4 py-2 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out text-sm"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="lg:col-span-3">
              {displayedArtworks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedArtworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">No artworks found matching your search.</p>
                </div>
              )}

              {/* Results Info */}
              <div className="mt-8 text-sm text-muted-foreground">
                Showing {displayedArtworks.length} of {artworks.length} artworks
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function getPriceMatch(price: string, filter: string): boolean {
  const priceNum = Number.parseInt(price.replace("$", ""))

  switch (filter) {
    case "Under $300":
      return priceNum < 300
    case "$300 - $400":
      return priceNum >= 300 && priceNum <= 400
    case "Over $400":
      return priceNum > 400
    default:
      return true
  }
}
