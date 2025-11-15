import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all reviews or reviews for a specific artwork
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const artworkId = searchParams.get('artworkId')

    if (artworkId) {
      const reviews = await prisma.review.findMany({
        where: {
          artworkId: artworkId
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      return NextResponse.json(reviews)
    }

    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST a new review
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { artworkId, userName, rating, comment } = body

    if (!artworkId || !userName || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        artworkId,
        userName,
        rating: Number(rating),
        comment
      }
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
