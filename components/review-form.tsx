"use client"

import type React from "react"

import { useState } from "react"
import { useReviews } from "@/lib/reviews-context"

interface ReviewFormProps {
  artworkId: number
}

export function ReviewForm({ artworkId }: ReviewFormProps) {
  const { addReview } = useReviews()
  const [rating, setRating] = useState(5)
  const [userName, setUserName] = useState("")
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName.trim() || !comment.trim()) return

    addReview({
      artworkId,
      rating,
      userName: userName.trim(),
      comment: comment.trim(),
    })

    setUserName("")
    setComment("")
    setRating(5)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-lg border border-border dark:border-dark-border">
      <h3 className="text-lg font-bold text-foreground dark:text-dark-foreground mb-4">Share Your Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">Your Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-border dark:border-dark-border rounded-lg bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((r) => (
              <button
                key={r}
                onClick={() => setRating(r)}
                type="button"
                className={`text-2xl transition-all duration-300 ${r <= rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground dark:text-dark-foreground mb-2">
            Your Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this artwork..."
            rows={4}
            className="w-full px-4 py-2 border border-border dark:border-dark-border rounded-lg bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-all duration-300 ease-out"
        >
          {submitted ? "✓ Review Posted!" : "Post Review"}
        </button>
      </form>
    </div>
  )
}
