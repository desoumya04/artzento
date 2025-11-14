"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface ArtistFollowContextType {
  followedArtists: number[]
  followArtist: (artistId: number) => void
  unfollowArtist: (artistId: number) => void
  isFollowing: (artistId: number) => boolean
  getFollowCount: () => number
}

const ArtistFollowContext = createContext<ArtistFollowContextType | undefined>(undefined)

export function ArtistFollowProvider({ children }: { children: React.ReactNode }) {
  const [followedArtists, setFollowedArtists] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedFollows = localStorage.getItem("artgallery-followed-artists")
    if (savedFollows) {
      try {
        setFollowedArtists(JSON.parse(savedFollows))
      } catch (e) {
        console.error("Failed to load followed artists from localStorage:", e)
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("artgallery-followed-artists", JSON.stringify(followedArtists))
    }
  }, [followedArtists, mounted])

  const followArtist = (artistId: number) => {
    setFollowedArtists((prev) => {
      if (prev.includes(artistId)) return prev
      return [...prev, artistId]
    })
  }

  const unfollowArtist = (artistId: number) => {
    setFollowedArtists((prev) => prev.filter((id) => id !== artistId))
  }

  const isFollowing = (artistId: number) => {
    return followedArtists.includes(artistId)
  }

  const getFollowCount = () => followedArtists.length

  return (
    <ArtistFollowContext.Provider
      value={{
        followedArtists,
        followArtist,
        unfollowArtist,
        isFollowing,
        getFollowCount,
      }}
    >
      {children}
    </ArtistFollowContext.Provider>
  )
}

export function useArtistFollow() {
  const context = useContext(ArtistFollowContext)
  if (context === undefined) {
    throw new Error("useArtistFollow must be used within an ArtistFollowProvider")
  }
  return context
}
