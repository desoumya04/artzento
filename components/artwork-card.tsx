"use client"

import Link from "next/link"
import type React from "react"
import { useWishlist } from "@/lib/wishlist-context"
import { formatPrice } from "@/lib/currency"

interface Artist {
  id: string | number
  name: string
  bio?: string
  profileImage?: string
  specialization?: string
  website?: string | null
  instagram?: string | null
}

interface ArtworkProp {
  id: string | number
  title: string
  artistId?: string | number
  price: number
  currency: string
  image: string
  description?: string
  dimensions?: string
  year?: number
  category?: string
  medium?: string | null
  artist?: Artist
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

export function ArtworkCard({ artwork }: { artwork: ArtworkProp }) {
  const artist = artwork.artist
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const artworkId = artwork.id.toString()

    if (isInWishlist(artworkId)) {
      await removeFromWishlist(artworkId)
    } else {
      await addToWishlist(artworkId, artwork)
    }
  }

  const artworkId = artwork.id.toString()
  const isWishlisted = isInWishlist(artworkId)

  return (
    <div className="card-hover rounded-lg overflow-hidden bg-white relative">
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full text-foreground hover:text-primary transition-colors"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <HeartIcon className={`w-5 h-5 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
      </button>
      <Link href={`/artwork/${artwork.id}`}>
        <div className="block">
          {/* Image Container */}
          <div className="relative h-64 sm:h-80 overflow-hidden bg-secondary">
            <img
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-out"
            />
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {artwork.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            <h3 className="font-bold text-lg text-foreground truncate mb-1">{artwork.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">by {artist?.name || "Unknown Artist"}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-primary">{formatPrice(artwork.price, artwork.currency as any)}</span>
              <div className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-all duration-300 ease-out">
                View Details
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
