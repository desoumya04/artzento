"use client"

import Link from "next/link"
import { useState, Suspense } from "react"
import { usePathname } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

export function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { getTotalItems } = useCart()
  const { getCount } = useWishlist()

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/artists", label: "Artists" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <img src="/Alogo.svg" width={40} height={30} alt="Artzento Logo" />
            <span className="hidden sm:inline">Artzento</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 ease-out ${
                  isActive(link.href) ? "text-primary border-b-2 border-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/wishlist"
              className="relative p-2 rounded-lg hover:bg-secondary transition-all duration-300 ease-out"
              title="Wishlist"
            >
              <svg
                className="w-6 h-6 text-foreground hover:text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {getCount() > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getCount()}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 ease-out text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-all duration-300 ease-out"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out ${
                  isActive(link.href) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/wishlist"
              className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-all duration-300 ease-out flex items-center justify-between"
              onClick={() => setIsOpen(false)}
            >
              Wishlist
              {getCount() > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold">{getCount()}</span>
              )}
            </Link>
            <Link
              href="/cart"
              className="px-3 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 ease-out flex items-center justify-between"
              onClick={() => setIsOpen(false)}
            >
              Cart
              {getTotalItems() > 0 && (
                <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1 font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 bg-white border-b border-border shadow-sm" />}>
      <NavbarContent />
    </Suspense>
  )
}
