import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parsePrice } from '@/lib/currency'
import { revalidateArtworks, revalidateArtist } from '@/app/submit/actions'

export async function GET() {
  try {
    const artworks = await prisma.artwork.findMany({
      include: {
        artist: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(artworks, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
      }
    })
  } catch (error) {
    console.error('Error fetching artworks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch artworks' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      title, 
      artistName,
      artistEmail,
      price, 
      currency,
      image, 
      description, 
      dimensions, 
      year, 
      category, 
      medium,
      artistBio,
      artistWebsite,
      artistInstagram,
      artistProfileImage
    } = body

    // First, find or create the artist
    let artist = await prisma.artist.findFirst({
      where: {
        OR: [
          { name: artistName },
          { instagram: artistInstagram }
        ]
      }
    })

    if (!artist) {
      // Create new artist
      artist = await prisma.artist.create({
        data: {
          name: artistName,
          bio: artistBio || 'Emerging artist',
          profileImage: artistProfileImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
          specialization: category,
          website: artistWebsite,
          instagram: artistInstagram,
        }
      })
    }

    // Create the artwork
    const artwork = await prisma.artwork.create({
      data: {
        title,
        artistId: artist.id,
        price: price ? parsePrice(price) : 0,
        currency: currency || 'INR',
        image,
        description,
        dimensions,
        year: parseInt(year),
        category,
        medium,
      },
      include: {
        artist: true
      }
    })

    // Revalidate caches
    await revalidateArtworks()
    await revalidateArtist(artist.id)

    return NextResponse.json(artwork, { status: 201 })
  } catch (error) {
    console.error('Error creating artwork:', error)
    return NextResponse.json(
      { error: 'Failed to create artwork' },
      { status: 500 }
    )
  }
}
