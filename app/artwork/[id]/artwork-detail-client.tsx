"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArtworkCard } from "@/components/artwork-card"
import { useCart } from "@/lib/cart-context"
import { useReviews } from "@/lib/reviews-context"
import { ReviewForm } from "@/components/review-form"
import { ReviewsList } from "@/components/reviews-list"
import { formatPrice } from "@/lib/currency"

interface Artist {
  id: string
  name: string
  bio: string
  profileImage: string
  specialization: string
  website?: string | null
  instagram?: string | null
}

interface Artwork {
  id: string
  title: string
  artistId: string
  price: number
  currency: string
  image: string
  description: string
  dimensions: string
  year: number
  category: string
  medium?: string | null
  artist: Artist
}

export default function ArtworkDetailClient({ artworkId }: { artworkId: string }) {
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart, items, updateQuantity } = useCart()
  const { getAverageRating, getReviewsByArtwork } = useReviews()

  // Check if item is in cart and get its quantity
  const cartItem = items.find(item => item.artworkId === artworkId)
  const isInCart = !!cartItem
  
  // Sync quantity with cart when cart items change
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity)
    } else {
      setQuantity(1)
    }
  }, [cartItem])

  useEffect(() => {
    fetchArtwork()
  }, [artworkId])

  const fetchArtwork = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/artworks/${artworkId}`)
      
      if (!response.ok) {
        setArtwork(null)
        setLoading(false)
        return
      }
      
      const data = await response.json()
      setArtwork(data)
      
      // Fetch related artworks by same artist
      if (data.artistId) {
        const artistResponse = await fetch(`/api/artists/${data.artistId}`)
        if (artistResponse.ok) {
          const artistData = await artistResponse.json()
          const related = artistData.artworks
            .filter((a: Artwork) => a.id !== artworkId)
            .slice(0, 3)
          setRelatedArtworks(related)
        }
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching artwork:', error)
      setArtwork(null)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading artwork...</p>
        </div>
      </main>
    )
  }

  if (!artwork) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Artwork not found</h1>
          <Link href="/gallery" className="text-primary hover:underline">
            Back to gallery
          </Link>
        </div>
      </main>
    )
  }

  const artist = artwork.artist

  const handleAddToCart = async () => {
    try {
      if (isInCart) {
        // Update to the new quantity
        await updateQuantity(artwork.id, quantity)
      } else {
        // Add new item
        await addToCart(artwork.id, artwork)
        // If quantity is more than 1, update it
        if (quantity > 1) {
          await updateQuantity(artwork.id, quantity)
        }
      }
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  const averageRating = getAverageRating(artwork.id)
  const reviewCount = getReviewsByArtwork(artwork.id).length

  return (
    <main className="min-h-screen bg-background dark:bg-dark-background">
      {/* Breadcrumb */}
      <div className="bg-secondary dark:bg-dark-secondary border-b border-border dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 text-sm text-muted-foreground dark:text-dark-muted-foreground">
            <Link href="/gallery" className="hover:text-primary transition-all duration-300 ease-out">
              Gallery
            </Link>
            <span>/</span>
            <span className="text-foreground dark:text-dark-foreground font-medium">{artwork.title}</span>
          </div>
        </div>
      </div>

      {/* Artwork Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="flex items-center justify-center bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-md border border-border dark:border-dark-border">
            <img
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-start">
            <div className="inline-flex w-fit px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold mb-4">
              {artwork.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-dark-foreground mb-2">
              {artwork.title}
            </h1>

            {artist && (
              <Link href={`/artist/${artist.id}`} className="text-lg text-primary font-semibold hover:underline mb-6">
                by {artist.name}
              </Link>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
                {averageRating > 0 ? `${averageRating} (${reviewCount} reviews)` : "No reviews yet"}
              </span>
            </div>

            <div className="border-b border-border dark:border-dark-border pb-6 mb-6">
              <p className="text-3xl font-bold text-primary">{formatPrice(artwork.price, artwork.currency as any)}</p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-bold text-foreground dark:text-dark-foreground mb-3">Description</h3>
              <p className="text-muted-foreground dark:text-dark-muted-foreground leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-8 bg-secondary dark:bg-dark-secondary p-4 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-muted-foreground dark:text-dark-muted-foreground mb-1">
                  Dimensions
                </p>
                <p className="font-bold text-foreground dark:text-dark-foreground">{artwork.dimensions}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground dark:text-dark-muted-foreground mb-1">
                  Year
                </p>
                <p className="font-bold text-foreground dark:text-dark-foreground">{artwork.year}</p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-border dark:border-dark-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-primary hover:bg-secondary dark:hover:bg-dark-secondary transition-all duration-300 ease-out"
                >
                  −
                </button>
                <span className="px-6 py-3 font-bold border-l border-r border-border dark:border-dark-border text-foreground dark:text-dark-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-primary hover:bg-secondary dark:hover:bg-dark-secondary transition-all duration-300 ease-out"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 px-8 py-3 rounded-lg font-bold transition-all duration-300 ease-out ${
                  addedToCart ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {addedToCart ? "✓ Updated Cart" : isInCart ? "Update Cart" : "Add to Cart"}
              </button>

              <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Artist Info */}
        {artist && (
          <div className="bg-white dark:bg-dark-card rounded-lg p-8 border border-border dark:border-dark-border mb-16">
            <h2 className="text-2xl font-bold text-foreground dark:text-dark-foreground mb-6">About the Artist</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="flex flex-col items-center">
                <img
                  src={artist.profileImage || "/placeholder.svg"}
                  alt={artist.name}
                  className="w-32 h-32 rounded-lg object-cover mb-4"
                />
                <h3 className="text-lg font-bold text-foreground dark:text-dark-foreground">{artist.name}</h3>
                <p className="text-sm text-primary font-semibold">{artist.specialization}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground dark:text-dark-muted-foreground leading-relaxed mb-6">
                  {artist.bio}
                </p>
                <Link
                  href={`/artist/${artist.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all duration-300 ease-out"
                >
                  View All Works
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground dark:text-dark-foreground mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ReviewForm artworkId={artwork.id} />
            </div>
            <div className="lg:col-span-2">
              <ReviewsList artworkId={artwork.id} />
            </div>
          </div>
        </div>

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-foreground dark:text-dark-foreground mb-8">
              More from {artist?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArtworks.map((art) => (
                <ArtworkCard key={art.id} artwork={art} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
