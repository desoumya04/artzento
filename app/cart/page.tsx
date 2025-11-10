"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"

export default function Cart() {
  const { items, removeFromCart, updateQuantity } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background" />
        <Footer />
      </>
    )
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          {/* Header */}
          <section className="bg-secondary border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Shopping Cart</h1>
            </div>
          </section>

          {/* Empty Cart */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start browsing our collection to find your favorite artworks.
              </p>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all duration-300 ease-out"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const total = items.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace("₹", "").replace(/,/g, ""))
    return sum + price * item.quantity
  }, 0)

  const tax = total * 0.18
  const grandTotal = total + tax

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Shopping Cart</h1>
            <p className="text-lg text-muted-foreground">{items.length} item(s) in cart</p>
          </div>
        </section>

        {/* Cart Items */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.artworkId}
                    className="flex gap-4 p-4 bg-white rounded-lg border border-border hover:border-primary transition-colors duration-300"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">By {item.artistName}</p>
                        <p className="text-lg font-bold text-primary">{item.price} each</p>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.artworkId, Math.max(1, item.quantity - 1))}
                            className="px-3 py-1 rounded border border-border hover:bg-secondary transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.artworkId, item.quantity + 1)}
                            className="px-3 py-1 rounded border border-border hover:bg-secondary transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.artworkId)}
                          className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm text-muted-foreground mb-2">Subtotal</p>
                      <p className="text-xl font-bold text-foreground">
                        ₹
                        {(
                          Number.parseFloat(item.price.replace("₹", "").replace(/,/g, "")) * item.quantity
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 p-6 bg-secondary rounded-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (18% GST)</span>
                    <span className="font-semibold text-foreground">₹{tax.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-8">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>

                <button className="w-full px-6 py-4 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all duration-300 mb-3">
                  Proceed to Checkout
                </button>

                <Link
                  href="/gallery"
                  className="block w-full px-6 py-4 rounded-lg border-2 border-primary text-primary font-bold text-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
