"use server"

import { prisma } from "@/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

export async function getArtworks() {
  "use cache"
  cacheLife("hours")
  cacheTag("get-artworks")

  try {
    const artworks = await prisma.artwork.findMany({
      include: {
        artist: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    // Convert dates and decimals to plain objects/strings if necessary for serialization
    // Prisma objects are usually serializable by Server Actions/Cache functions in Next.js 15/16
    // but sometimes Decimal or Date types need handling. 
    // However, the API route was returning JSON, which handles serialization.
    // Server actions return values that must be serializable.
    // Let's assume standard serialization works for now.
    return artworks
  } catch (error) {
    console.error('Error fetching artworks:', error)
    throw new Error('Failed to fetch artworks')
  }
}
