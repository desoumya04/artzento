"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface WishlistItem {
  id: string
  artworkId: string
  artwork: {
    id: string
    title: string
    price: number
    currency: string
    image: string
    artist: {
      name: string
    }
  }
}

export interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (artworkId: string, artwork: any) => Promise<void>
  removeFromWishlist: (artworkId: string) => Promise<void>
  isInWishlist: (artworkId: string) => boolean
  clearWishlist: () => Promise<void>
  getCount: () => number
  loading: boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist')
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Failed to fetch wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToWishlist = async (artworkId: string, artwork: any) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artworkId }),
      })
      
      if (response.ok) {
        await fetchWishlist() // Refresh wishlist
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error)
      throw error
    }
  }

  const removeFromWishlist = async (artworkId: string) => {
    try {
      const response = await fetch(`/api/wishlist?artworkId=${artworkId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setItems((prevItems) => prevItems.filter((i) => i.artworkId !== artworkId))
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error)
    }
  }

  const isInWishlist = (artworkId: string) => {
    return items.some((i) => i.artworkId === artworkId)
  }

  const clearWishlist = async () => {
    // Delete all items
    for (const item of items) {
      await removeFromWishlist(item.artworkId)
    }
    setItems([])
  }

  const getCount = () => items.length

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        getCount,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
