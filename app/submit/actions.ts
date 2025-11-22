"use server"

import { revalidateTag } from "next/cache"

/**
 * Revalidates artwork-related caches after new artwork submission
 * Uses 'max' profile for stale-while-revalidate behavior
 */
export async function revalidateArtworks() {
  revalidateTag("get-artworks", "max")
}

/**
 * Revalidates artist-related caches after artist update
 * Uses 'max' profile for stale-while-revalidate behavior
 */
export async function revalidateArtists() {
  revalidateTag("get-artists", "max")
}

/**
 * Revalidates specific artist cache
 * Uses 'max' profile for stale-while-revalidate behavior
 */
export async function revalidateArtist(artistId: string) {
  revalidateTag(`artist-${artistId}`, "max")
  revalidateTag("get-artist", "max")
}

/**
 * Revalidates specific artwork cache
 * Uses 'max' profile for stale-while-revalidate behavior
 */
export async function revalidateArtwork(artworkId: string) {
  revalidateTag(`artwork-${artworkId}`, "max")
  revalidateTag("get-artwork", "max")
}

/**
 * Revalidates all caches after major updates
 * Uses 'max' profile for stale-while-revalidate behavior
 */
export async function revalidateAll() {
  revalidateTag("get-artworks", "max")
  revalidateTag("get-artists", "max")
  revalidateTag("get-artist", "max")
  revalidateTag("get-artwork", "max")
  revalidateTag("get-related-artworks", "max")
}
