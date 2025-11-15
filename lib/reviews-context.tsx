"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface Review {
  id: string
  artworkId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

interface ReviewsContextType {
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "createdAt">) => Promise<void>
  getReviewsByArtwork: (artworkId: string) => Review[]
  getAverageRating: (artworkId: string) => number
  loading: boolean
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined)

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const addReview = async (review: Omit<Review, "id" | "createdAt">) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      })
      
      if (response.ok) {
        const newReview = await response.json()
        setReviews((prev) => [newReview, ...prev])
      }
    } catch (error) {
      console.error('Failed to add review:', error)
      throw error
    }
  }

  const getReviewsByArtwork = (artworkId: string): Review[] => {
    return reviews.filter((r) => r.artworkId === artworkId)
  }

  const getAverageRating = (artworkId: string): number => {
    const artworkReviews = getReviewsByArtwork(artworkId)
    if (artworkReviews.length === 0) return 0
    const sum = artworkReviews.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / artworkReviews.length) * 10) / 10
  }

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getReviewsByArtwork, getAverageRating, loading }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewsContext)
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewsProvider")
  }
  return context
}
