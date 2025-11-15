"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface CartItem {
  id: string
  artworkId: string
  quantity: number
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

export interface CartContextType {
  items: CartItem[]
  addToCart: (artworkId: string, artwork: any) => Promise<void>
  removeFromCart: (artworkId: string) => Promise<void>
  updateQuantity: (artworkId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getTotalPrice: () => number
  getTotalItems: () => number
  loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart')
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (artworkId: string, artwork: any) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artworkId, quantity: 1 }),
      })
      
      if (response.ok) {
        await fetchCart() // Refresh cart
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
      throw error
    }
  }

  const removeFromCart = async (artworkId: string) => {
    try {
      const response = await fetch(`/api/cart?artworkId=${artworkId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setItems((prevItems) => prevItems.filter((i) => i.artworkId !== artworkId))
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error)
    }
  }

  const updateQuantity = async (artworkId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(artworkId)
      return
    }
    
    try {
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artworkId, quantity }),
      })
      
      if (response.ok) {
        // Update local state
        setItems((prevItems) => 
          prevItems.map((i) => (i.artworkId === artworkId ? { ...i, quantity } : i))
        )
      }
    } catch (error) {
      console.error('Failed to update quantity:', error)
    }
  }

  const clearCart = async () => {
    // Delete all items
    for (const item of items) {
      await removeFromCart(item.artworkId)
    }
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + item.artwork.price * item.quantity
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
        loading,
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
