"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArtworkCard } from "@/components/artwork-card"
import { ArtistSubmissionForm } from "@/components/artist-submission-form"
import { artworks } from "@/lib/mock-data"

export default function Home() {
  const featuredArtworks = artworks.slice(0, 6)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
  <section className="relative h-screen md:h-[600px] bg-linear-to-br from-background via-secondary to-background overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=1600&h=800&fit=crop"
              alt="Hero art"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/50 to-transparent"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
                Discover Extraordinary Art
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                Explore a curated collection of stunning artworks from talented artists around the world. Find your next
                masterpiece and bring creativity into your space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all duration-300 ease-out"
                >
                  Explore Gallery
                </Link>
                <Link
                  href="/artists"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out"
                >
                  Meet Artists
                </Link>
                <Link
                  href="#submit-art"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-all duration-300 ease-out"
                >
                  Submit Your Work
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Artworks */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Artworks</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse our latest additions and discover works from our most talented artists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all duration-300 ease-out"
              >
                View All Artworks
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About Artistry Gallery</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Artistry Gallery is a platform dedicated to showcasing contemporary art and connecting passionate
                  collectors with talented artists.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  We believe in democratizing art and making it accessible to everyone. Our mission is to support
                  emerging and established artists while helping art enthusiasts find pieces that resonate with their
                  souls.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300 ease-out"
                >
                  Learn More
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="h-96 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop"
                  alt="Gallery space"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Artist Submission */}
        <section id="submit-art" className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2 space-y-6">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  For Artists
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Share your latest masterpiece with the Artzento community
                </h2>
                <p className="text-muted-foreground">
                  Submit new works, connect with collectors, and join a network of creators shaping the future of art.
                  We review every submission with care and respond within two business days.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <svg className="mt-1 h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Feature-ready portfolio support and feedback from our curation team.
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-1 h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Listing opportunities across categories including painting, sculpture, and digital art.
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-1 h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Personalised promotion through newsletters, spotlights, and social collaborations.
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-3 rounded-xl border border-border bg-white/80 p-6 shadow-sm backdrop-blur">
                <ArtistSubmissionForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
