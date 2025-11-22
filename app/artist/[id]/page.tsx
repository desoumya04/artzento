import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import ArtistProfileClient from "./artist-profile-client"

export default async function ArtistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <main className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
      }>
        <ArtistProfileClient artistId={id} />
      </Suspense>
      <Footer />
    </>
  )
}
