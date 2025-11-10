"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface Review {
  id: string
  artworkId: number
  userName: string
  rating: number
  comment: string
  date: string
}

interface ReviewsContextType {
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "date">) => void
  getReviewsByArtwork: (artworkId: number) => Review[]
  getAverageRating: (artworkId: number) => number
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined)

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedReviews = localStorage.getItem("artgallery-reviews")
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews))
      } catch (e) {
        console.error("Failed to load reviews from localStorage:", e)
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("artgallery-reviews", JSON.stringify(reviews))
    }
  }, [reviews, mounted])

  const addReview = (review: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    }
    setReviews((prev) => [...prev, newReview])
  }

  const getReviewsByArtwork = (artworkId: number): Review[] => {
    return reviews.filter((r) => r.artworkId === artworkId)
  }

  const getAverageRating = (artworkId: number): number => {
    const artworkReviews = getReviewsByArtwork(artworkId)
    if (artworkReviews.length === 0) return 0
    const sum = artworkReviews.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / artworkReviews.length) * 10) / 10
  }

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getReviewsByArtwork, getAverageRating }}>
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
