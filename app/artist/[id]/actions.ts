"use server"

import { prisma } from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

export async function getArtistById(id: string) {
  "use cache"
  cacheLife("hours")
  cacheTag("get-artist", `artist-${id}`)

  try {
    const artist = await prisma.artist.findUnique({
      where: { id },
      include: {
        artworks: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })
    
    return artist
  } catch (error) {
    console.error('Error fetching artist:', error)
    throw new Error('Failed to fetch artist')
  }
}
