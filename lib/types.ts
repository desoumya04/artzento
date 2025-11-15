import { Prisma } from '@prisma/client'

export type ArtistWithArtworks = Prisma.ArtistGetPayload<{
  include: { artworks: true }
}>

export type ArtworkWithArtist = Prisma.ArtworkGetPayload<{
  include: { artist: true }
}>

export type Artist = Prisma.ArtistGetPayload<{}>
export type Artwork = Prisma.ArtworkGetPayload<{}>
