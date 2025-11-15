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

// GET followed artists for current session
export async function GET() {
  try {
    const sessionId = await getSessionId()
    
    const follows = await prisma.artistFollow.findMany({
      where: {
        sessionId: sessionId
      },
      include: {
        artist: true
      }
    })

    const response = NextResponse.json(follows)
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    })
    
    return response
  } catch (error) {
    console.error('Error fetching follows:', error)
    return NextResponse.json(
      { error: 'Failed to fetch follows' },
      { status: 500 }
    )
  }
}

// POST follow an artist
export async function POST(request: Request) {
  try {
    const sessionId = await getSessionId()
    const body = await request.json()
    const { artistId } = body

    if (!artistId) {
      return NextResponse.json(
        { error: 'Artist ID is required' },
        { status: 400 }
      )
    }

    // Check if already following
    const existing = await prisma.artistFollow.findFirst({
      where: {
        sessionId: sessionId,
        artistId: artistId
      }
    })

    if (existing) {
      return NextResponse.json(
        { message: 'Already following' },
        { status: 200 }
      )
    }

    const follow = await prisma.artistFollow.create({
      data: {
        artistId,
        sessionId
      },
      include: {
        artist: true
      }
    })

    const response = NextResponse.json(follow, { status: 201 })
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365
    })
    
    return response
  } catch (error) {
    console.error('Error following artist:', error)
    return NextResponse.json(
      { error: 'Failed to follow artist' },
      { status: 500 }
    )
  }
}

// DELETE unfollow an artist
export async function DELETE(request: Request) {
  try {
    const sessionId = await getSessionId()
    const { searchParams } = new URL(request.url)
    const artistId = searchParams.get('artistId')

    if (!artistId) {
      return NextResponse.json(
        { error: 'Artist ID is required' },
        { status: 400 }
      )
    }

    await prisma.artistFollow.deleteMany({
      where: {
        sessionId: sessionId,
        artistId: artistId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error unfollowing artist:', error)
    return NextResponse.json(
      { error: 'Failed to unfollow artist' },
      { status: 500 }
    )
  }
}
