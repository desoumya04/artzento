"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface WishlistItem {
  artworkId: number
  title: string
  price: string
  image: string
  artistName: string
}

export interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (artworkId: number) => void
  isInWishlist: (artworkId: number) => boolean
  clearWishlist: () => void
  getCount: () => number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedWishlist = localStorage.getItem("artgallery-wishlist")
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (e) {
        console.error("Failed to load wishlist from localStorage:", e)
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("artgallery-wishlist", JSON.stringify(items))
    }
  }, [items, mounted])

  const addToWishlist = (item: WishlistItem) => {
    setItems((prevItems) => {
      const exists = prevItems.find((i) => i.artworkId === item.artworkId)
      if (exists) return prevItems
      return [...prevItems, item]
    })
  }

  const removeFromWishlist = (artworkId: number) => {
    setItems((prevItems) => prevItems.filter((i) => i.artworkId !== artworkId))
  }

  const isInWishlist = (artworkId: number) => {
    return items.some((i) => i.artworkId === artworkId)
  }

  const clearWishlist = () => {
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
