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

// GET cart items for current session
export async function GET() {
  try {
    const sessionId = await getSessionId()
    
    const cartItems = await prisma.cartItem.findMany({
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

    const response = NextResponse.json(cartItems)
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    })
    
    return response
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

// POST add item to cart
export async function POST(request: Request) {
  try {
    const sessionId = await getSessionId()
    const body = await request.json()
    const { artworkId, quantity = 1 } = body

    if (!artworkId) {
      return NextResponse.json(
        { error: 'Artwork ID is required' },
        { status: 400 }
      )
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        sessionId: sessionId,
        artworkId: artworkId
      }
    })

    let cartItem
    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: {
          id: existingItem.id
        },
        data: {
          quantity: existingItem.quantity + quantity
        },
        include: {
          artwork: {
            include: {
              artist: true
            }
          }
        }
      })
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          artworkId,
          sessionId,
          quantity
        },
        include: {
          artwork: {
            include: {
              artist: true
            }
          }
        }
      })
    }

    const response = NextResponse.json(cartItem, { status: 201 })
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365
    })
    
    return response
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    )
  }
}

// PATCH update item quantity
export async function PATCH(request: Request) {
  try {
    const sessionId = await getSessionId()
    const body = await request.json()
    const { artworkId, quantity } = body

    if (!artworkId || quantity === undefined) {
      return NextResponse.json(
        { error: 'Artwork ID and quantity are required' },
        { status: 400 }
      )
    }

    // Find the cart item
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        sessionId: sessionId,
        artworkId: artworkId
      }
    })

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      )
    }

    // Update quantity
    const updatedItem = await prisma.cartItem.update({
      where: {
        id: existingItem.id
      },
      data: {
        quantity: quantity
      },
      include: {
        artwork: {
          include: {
            artist: true
          }
        }
      }
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating cart quantity:', error)
    return NextResponse.json(
      { error: 'Failed to update cart quantity' },
      { status: 500 }
    )
  }
}

// DELETE remove item from cart
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

    await prisma.cartItem.deleteMany({
      where: {
        sessionId: sessionId,
        artworkId: artworkId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing from cart:', error)
    return NextResponse.json(
      { error: 'Failed to remove from cart' },
      { status: 500 }
    )
  }
}
