import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
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
    
    return NextResponse.json(artists, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
      }
    })
  } catch (error) {
    console.error('Error fetching artists:', error)
    return NextResponse.json(
      { error: 'Failed to fetch artists' },
      { status: 500 }
    )
  }
}
