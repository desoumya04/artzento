"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface CartItem {
  artworkId: number
  quantity: number
  price: string
  title: string
  image: string
  artistName: string
}

export interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (artworkId: number) => void
  updateQuantity: (artworkId: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("artgallery-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to load cart from localStorage:", e)
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("artgallery-cart", JSON.stringify(items))
    }
  }, [items, mounted])

  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.artworkId === item.artworkId)

      if (existingItem) {
        return prevItems.map((i) =>
          i.artworkId === item.artworkId ? { ...i, quantity: i.quantity + item.quantity } : i,
        )
      }

      return [...prevItems, item]
    })
  }

  const removeFromCart = (artworkId: number) => {
    setItems((prevItems) => prevItems.filter((i) => i.artworkId !== artworkId))
  }

  const updateQuantity = (artworkId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(artworkId)
      return
    }
    setItems((prevItems) => prevItems.map((i) => (i.artworkId === artworkId ? { ...i, quantity } : i)))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("₹", "").replace(/,/g, ""))
      return total + price * item.quantity
    }, 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
