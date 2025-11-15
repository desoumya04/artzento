import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const artist = await prisma.artist.findUnique({
      where: {
        id: id
      },
      include: {
        artworks: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!artist) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(artist)
  } catch (error) {
    console.error('Error fetching artist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch artist' },
      { status: 500 }
    )
  }
}
