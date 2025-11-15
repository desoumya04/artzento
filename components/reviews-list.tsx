"use client"

import { useReviews } from "@/lib/reviews-context"

interface ReviewsListProps {
  artworkId: string
}

export function ReviewsList({ artworkId }: ReviewsListProps) {
  const { getReviewsByArtwork } = useReviews()
  const reviews = getReviewsByArtwork(artworkId)

  if (reviews.length === 0) {
    return (
      <div className="bg-secondary dark:bg-dark-secondary p-8 rounded-lg text-center">
        <p className="text-muted-foreground dark:text-dark-muted-foreground">No reviews yet. Be the first to review!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white dark:bg-dark-card p-4 rounded-lg border border-border dark:border-dark-border"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-foreground dark:text-dark-foreground">{review.userName}</h4>
              <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-foreground dark:text-dark-foreground">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
