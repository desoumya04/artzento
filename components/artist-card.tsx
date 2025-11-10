import Link from "next/link"
import type { Artist } from "@/lib/mock-data"

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artist/${artist.id}`}>
      <div className="card-hover rounded-lg overflow-hidden bg-white text-center">
        {/* Profile Image */}
        <div className="relative h-48 bg-secondary overflow-hidden">
          <img
            src={artist.profileImage || "/placeholder.svg"}
            alt={artist.name}
            className="w-full h-full object-cover hover:scale-110 transition-all duration-300 ease-out"
          />
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-bold text-lg text-foreground mb-1">{artist.name}</h3>
          <p className="text-xs font-semibold text-primary mb-3">{artist.specialization}</p>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{artist.bio}</p>
          <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-300 ease-out">
            View Artworks
          </button>
        </div>
      </div>
    </Link>
  )
}
