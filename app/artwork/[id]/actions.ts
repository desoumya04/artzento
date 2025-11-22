"use server"

import { prisma } from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

export async function getArtworkById(id: string) {
  "use cache"
  cacheLife("hours")
  cacheTag("get-artwork", `artwork-${id}`)

  try {
    const artwork = await prisma.artwork.findUnique({
      where: { id },
      include: {
        artist: true
      }
    })
    
    return artwork
  } catch (error) {
    console.error('Error fetching artwork:', error)
    throw new Error('Failed to fetch artwork')
  }
}

export async function getRelatedArtworks(artistId: string, excludeId: string) {
  "use cache"
  cacheLife("hours")
  cacheTag("get-related-artworks", `artist-${artistId}`)

  try {
    const artworks = await prisma.artwork.findMany({
      where: {
        artistId,
        id: {
          not: excludeId
        }
      },
      include: {
        artist: true
      },
      take: 3,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return artworks
  } catch (error) {
    console.error('Error fetching related artworks:', error)
    throw new Error('Failed to fetch related artworks')
  }
}
