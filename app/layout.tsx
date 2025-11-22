import { Suspense } from "react"
import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { ReviewsProvider } from "@/lib/reviews-context"
import { ArtistFollowProvider } from "@/lib/artist-follow-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Artzento - Online Art Gallery",
  description:
    "Discover and purchase beautiful artworks from talented artists worldwide. Browse paintings, sculptures, and digital art in our modern online gallery.",
  generator: "app",
  icons: {
    icon: [
      { url: "/Alogo.svg" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Suspense fallback={null}>
          <CartProvider>
            <WishlistProvider>
              <ArtistFollowProvider>
                <ReviewsProvider>{children}</ReviewsProvider>
              </ArtistFollowProvider>
            </WishlistProvider>
          </CartProvider>
        </Suspense>
      </body>
    </html>
  )
}
