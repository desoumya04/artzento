"use server"

import { prisma } from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

export async function getArtists() {
  "use cache"
  cacheLife("days")
  cacheTag("get-artists")

  try {
    const artists = await prisma.artist.findMany({
      include: {
        _count: {
          select: { artworks: true }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    return artists
  } catch (error) {
    console.error('Error fetching artists:', error)
    throw new Error('Failed to fetch artists')
  }
}
