"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArtworkCard } from "@/components/artwork-card"
import { useArtistFollow } from "@/lib/artist-follow-context"

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
}

interface Artist {
  id: string
  name: string
  bio: string
  profileImage: string
  specialization: string
  instagram?: string | null
  artworks: Artwork[]
}

export default function ArtistProfileClient({ artistId }: { artistId: string }) {
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)
  const { followArtist, unfollowArtist, isFollowing } = useArtistFollow()

  useEffect(() => {
    fetchArtist()
  }, [artistId])

  const fetchArtist = async () => {
    try {
      const response = await fetch(`/api/artists/${artistId}`)
      if (!response.ok) {
        setArtist(null)
        setLoading(false)
        return
      }
      const data = await response.json()
      setArtist(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching artist:', error)
      setArtist(null)
      setLoading(false)
    }
  }

  const handleFollowToggle = async () => {
    if (!artist) return
    
    if (isFollowing(artist.id)) {
      await unfollowArtist(artist.id)
    } else {
      await followArtist(artist.id)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </main>
    )
  }

  if (!artist) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Artist not found</h1>
          <Link href="/artists" className="text-primary hover:underline">
            Back to artists
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Artist Header */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <img
                src={artist.profileImage || "/placeholder.svg"}
                alt={artist.name}
                className="w-48 h-48 rounded-lg object-cover shadow-lg"
              />
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
                {artist.specialization}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{artist.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{artist.bio}</p>
              <div className="flex gap-4">
                <button
                  onClick={handleFollowToggle}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ease-out ${
                    isFollowing(artist.id)
                      ? "bg-secondary text-secondary-foreground hover:opacity-90"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {isFollowing(artist.id) ? "Following" : "Follow Artist"}
                </button>
                <Link href="/contact">
                  <button className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out">
                    Contact
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artworks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Artworks by {artist.name}</h2>

        {artist.artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artist.artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No artworks found from this artist.</p>
          </div>
        )}
      </div>
    </main>
  )
}
