import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

// Helper to get or create session ID
async function getSessionId() {
  const cookieStore = await cookies()
  let sessionId = cookieStore.get('sessionId')?.value
  
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
  
  return sessionId
}

// GET wishlist items for current session
export async function GET() {
  try {
    const sessionId = await getSessionId()
    
    const wishlistItems = await prisma.wishlistItem.findMany({
      where: {
        sessionId: sessionId
      },
      include: {
        artwork: {
          include: {
            artist: true
          }
        }
      }
    })

    const response = NextResponse.json(wishlistItems)
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    })
    
    return response
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

// POST add item to wishlist
export async function POST(request: Request) {
  try {
    const sessionId = await getSessionId()
    const body = await request.json()
    const { artworkId } = body

    if (!artworkId) {
      return NextResponse.json(
        { error: 'Artwork ID is required' },
        { status: 400 }
      )
    }

    // Check if already in wishlist
    const existing = await prisma.wishlistItem.findFirst({
      where: {
        sessionId: sessionId,
        artworkId: artworkId
      }
    })

    if (existing) {
      return NextResponse.json(
        { message: 'Already in wishlist' },
        { status: 200 }
      )
    }

    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        artworkId,
        sessionId
      },
      include: {
        artwork: {
          include: {
            artist: true
          }
        }
      }
    })

    const response = NextResponse.json(wishlistItem, { status: 201 })
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365
    })
    
    return response
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}

// DELETE remove item from wishlist
export async function DELETE(request: Request) {
  try {
    const sessionId = await getSessionId()
    const { searchParams } = new URL(request.url)
    const artworkId = searchParams.get('artworkId')

    if (!artworkId) {
      return NextResponse.json(
        { error: 'Artwork ID is required' },
        { status: 400 }
      )
    }

    await prisma.wishlistItem.deleteMany({
      where: {
        sessionId: sessionId,
        artworkId: artworkId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to remove from wishlist' },
      { status: 500 }
    )
  }
}
