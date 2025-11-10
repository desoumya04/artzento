import Link from "next/link"
import type { Artwork } from "@/lib/mock-data"
import { getArtistById } from "@/lib/mock-data"

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const artist = getArtistById(artwork.artistId)

  return (
    <Link href={`/artwork/${artwork.id}`}>
      <div className="card-hover rounded-lg overflow-hidden bg-white">
        {/* Image Container */}
        <div className="relative h-64 sm:h-80 overflow-hidden bg-secondary">
          <img
            src={artwork.image || "/placeholder.svg"}
            alt={artwork.title}
            className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-out"
          />
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
            {artwork.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-bold text-lg text-foreground truncate mb-1">{artwork.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">by {artist?.name || "Unknown Artist"}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary">{artwork.price}</span>
            <button className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-all duration-300 ease-out">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
