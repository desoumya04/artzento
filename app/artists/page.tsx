"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArtistCard } from "@/components/artist-card"

interface Artist {
  id: string
  name: string
  bio: string
  profileImage: string
  specialization: string
  instagram?: string | null
  followersCount: number
}

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArtists()
  }, [])

  const fetchArtists = async () => {
    try {
      const response = await fetch('/api/artists')
      const data = await response.json()
      setArtists(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching artists:', error)
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Artists</h1>
            <p className="text-lg text-muted-foreground">
              Meet the talented creators behind our amazing artworks. Each artist brings their unique vision and passion
              to their craft.
            </p>
          </div>
        </section>

        {/* Artists Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

