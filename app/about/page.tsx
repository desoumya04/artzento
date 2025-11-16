"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Artzento Gallery</h1>
            <p className="text-lg text-muted-foreground">Connecting art lovers with talented creators worldwide</p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mission */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              At Artzento Gallery, we believe that art should be accessible to everyone. Our mission is to create a
              platform where emerging and established artists can showcase their work to a global audience, while art
              enthusiasts can discover and purchase pieces that truly resonate with them.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're dedicated to supporting the creative community by providing fair pricing, transparent practices, and
              a beautiful, intuitive platform for both artists and collectors.
            </p>
          </section>

          {/* Vision */}
          <section className="mb-16 bg-white rounded-lg p-8 border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">We envision a world where:</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-4">
                <span className="text-primary font-bold">•</span>
                <span>
                  Artists are empowered to build sustainable careers through direct connections with collectors
                </span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold">•</span>
                <span>Art is recognized as a valuable investment and form of personal expression</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold">•</span>
                <span>Technology enhances rather than replaces the human connection in art appreciation</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold">•</span>
                <span>Diverse art forms and perspectives are celebrated and supported</span>
              </li>
            </ul>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">Authenticity</h3>
                <p className="text-muted-foreground">
                  We celebrate genuine artistic expression and support creators who stay true to their vision.
                </p>
              </div>
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">Integrity</h3>
                <p className="text-muted-foreground">
                  Transparency and fair practices guide all our decisions and interactions.
                </p>
              </div>
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">Community</h3>
                <p className="text-muted-foreground">
                  We foster connections between artists, collectors, and art enthusiasts worldwide.
                </p>
              </div>
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve our platform to better serve the global art community.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg opacity-90 mb-6">
              Whether you're an artist or collector, there's a place for you in our gallery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gallery"
                className="px-6 py-3 rounded-lg bg-primary-foreground text-primary font-bold hover:opacity-90 transition-all duration-300 ease-out"
              >
                Explore Artworks
              </Link>
              <button className="px-6 py-3 rounded-lg border-2 border-primary-foreground text-primary-foreground font-bold hover:bg-primary-foreground hover:text-primary transition-all duration-300 ease-out">
                Become an Artist
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
