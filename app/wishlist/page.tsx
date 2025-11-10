"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useWishlist } from "@/lib/wishlist-context"

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="mb-6">
                <svg
                  className="w-24 h-24 mx-auto text-muted-foreground/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your Wishlist is Empty</h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Start adding your favorite artworks to your wishlist and they'll appear here.
              </p>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all duration-300 ease-out"
              >
                Explore Gallery
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-12">My Wishlist</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {items.map((item) => (
              <div
                key={item.artworkId}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-out border border-border"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-out"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
                    {item.price}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.artistName}</p>

                  <div className="flex gap-2">
                    <Link href={`/artwork/${item.artworkId}`} className="flex-1">
                      <button className="w-full py-2 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.artworkId)}
                      className="px-4 py-2 text-sm font-semibold text-destructive border-2 border-destructive rounded-lg hover:bg-destructive hover:text-white transition-all duration-300 ease-out"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-between items-center bg-secondary p-6 rounded-lg border border-border">
            <div>
              <p className="text-foreground font-bold">You have {items.length} item(s) in your wishlist</p>
            </div>
            <button
              onClick={clearWishlist}
              className="px-6 py-2 text-sm font-semibold text-muted-foreground border-2 border-muted rounded-lg hover:bg-muted hover:text-foreground transition-all duration-300 ease-out"
            >
              Clear Wishlist
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
