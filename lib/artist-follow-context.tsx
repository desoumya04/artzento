"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface ArtistFollow {
  id: string
  artistId: string
  artist: {
    id: string
    name: string
  }
}

export interface ArtistFollowContextType {
  followedArtists: ArtistFollow[]
  followArtist: (artistId: string) => Promise<void>
  unfollowArtist: (artistId: string) => Promise<void>
  isFollowing: (artistId: string | number) => boolean
  getFollowCount: () => number
  loading: boolean
}

const ArtistFollowContext = createContext<ArtistFollowContextType | undefined>(undefined)

export function ArtistFollowProvider({ children }: { children: React.ReactNode }) {
  const [followedArtists, setFollowedArtists] = useState<ArtistFollow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFollows()
  }, [])

  const fetchFollows = async () => {
    try {
      const response = await fetch('/api/follows')
      const data = await response.json()
      setFollowedArtists(data)
    } catch (error) {
      console.error('Failed to fetch follows:', error)
    } finally {
      setLoading(false)
    }
  }

  const followArtist = async (artistId: string) => {
    try {
      const response = await fetch('/api/follows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artistId }),
      })
      
      if (response.ok) {
        await fetchFollows() // Refresh follows
      }
    } catch (error) {
      console.error('Failed to follow artist:', error)
      throw error
    }
  }

  const unfollowArtist = async (artistId: string) => {
    try {
      const response = await fetch(`/api/follows?artistId=${artistId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setFollowedArtists((prev) => prev.filter((f) => f.artistId !== artistId))
      }
    } catch (error) {
      console.error('Failed to unfollow artist:', error)
    }
  }

  const isFollowing = (artistId: string | number) => {
    const idStr = artistId.toString()
    return followedArtists.some((f) => f.artistId === idStr)
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
        loading,
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
