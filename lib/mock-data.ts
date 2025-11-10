export interface Artist {
  id: number
  name: string
  bio: string
  profileImage: string
  specialization: string
  website?: string
  instagram?: string
}

export interface Artwork {
  id: number
  title: string
  artistId: number
  price: string
  image: string
  description: string
  dimensions: string
  year: number
  category: string
  medium?: string
}

export const artists: Artist[] = [
  {
    id: 1,
    name: "Sophia Turner",
    bio: "Contemporary painter focusing on urban themes and vibrant cityscapes. Sophia's work explores the interplay of light and shadow in modern metropolitan landscapes.",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    specialization: "Painting",
    website: "sophiaturner.art",
    instagram: "@sophiaturner_art",
  },
  {
    id: 2,
    name: "Marcus Chen",
    bio: "Abstract expressionist exploring color, form, and emotional depth through bold gestural marks. Marcus's practice investigates the boundaries between representation and abstraction.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    specialization: "Abstract",
    website: "marcuschen.studio",
    instagram: "@marcuschenart",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    bio: "Digital artist creating stunning landscapes and 3D visualizations that blend technology with artistic vision. Emma pioneers new approaches to digital creation.",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    specialization: "Digital Art",
    website: "emmarodriguez.digital",
    instagram: "@emmarodriguez_art",
  },
  {
    id: 4,
    name: "James Mitchell",
    bio: "Sculptor with a passion for creating dramatic forms in wood and stone. James explores the tension between raw material and refined form.",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    specialization: "Sculpture",
    website: "jamesmitchell.sculpture",
    instagram: "@jmitchell_sculptor",
  },
  {
    id: 5,
    name: "Olivia Park",
    bio: "Photographer capturing raw emotions and untold stories through her lens. Olivia's work documents the human experience with intimacy and authenticity.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    specialization: "Photography",
    website: "oliviapark.photography",
    instagram: "@oliviapark_photos",
  },
  {
    id: 6,
    name: "David Bergström",
    bio: "Minimalist artist exploring the beauty of simplicity and negative space. David's work is an exercise in reduction and clarity.",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    specialization: "Minimalist",
    website: "davidbergstrom.art",
    instagram: "@davidbergstrom_",
  },
]

export const artworks: Artwork[] = [
  {
    id: 101,
    title: "Neon City Dreams",
    artistId: 1,
    price: "₹34,500",
    image: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&h=500&fit=crop",
    description:
      "A vibrant depiction of night life in a modern city, capturing the energy and excitement of urban landscapes through bold color contrasts.",
    dimensions: "24 x 36 inches",
    year: 2024,
    category: "Painting",
    medium: "Acrylic on Canvas",
  },
  {
    id: 102,
    title: "Twilight Reflections",
    artistId: 1,
    price: "₹29,000",
    image: "https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=500&h=500&fit=crop",
    description: "A peaceful urban scene at dusk with reflective surfaces and soft lighting creating moody atmosphere.",
    dimensions: "20 x 20 inches",
    year: 2023,
    category: "Painting",
    medium: "Oil on Canvas",
  },
  {
    id: 103,
    title: "Chromatic Euphoria",
    artistId: 2,
    price: "₹39,800",
    image: "https://images.unsplash.com/photo-1549887534-7d0ca8f58ce6?w=500&h=500&fit=crop",
    description:
      "An abstract exploration of color and emotion, blending gestural techniques and bold color choices to evoke joy and movement.",
    dimensions: "30 x 40 inches",
    year: 2024,
    category: "Abstract",
    medium: "Mixed Media",
  },
  {
    id: 104,
    title: "Digital Horizon",
    artistId: 3,
    price: "₹24,500",
    image: "https://images.unsplash.com/photo-1578926078328-123f5474f1f2?w=500&h=500&fit=crop",
    description:
      "A stunning digital landscape combining technology and nature in perfect harmony, showcasing surreal environmental elements.",
    dimensions: "Digital - 4K",
    year: 2024,
    category: "Digital Art",
    medium: "Digital",
  },
  {
    id: 105,
    title: "Luminescent Void",
    artistId: 2,
    price: "₹36,700",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
    description:
      "A radiant abstract piece exploring the interplay of light and shadow, creating a sense of infinite depth and movement.",
    dimensions: "28 x 28 inches",
    year: 2024,
    category: "Abstract",
    medium: "Acrylic on Canvas",
  },
  {
    id: 106,
    title: "Stone Echo",
    artistId: 4,
    price: "₹49,800",
    image: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&h=500&fit=crop",
    description: "A monumental sculpture in marble, reflecting the essence of human emotion and timeless beauty.",
    dimensions: "24 x 18 x 30 inches",
    year: 2023,
    category: "Sculpture",
    medium: "Marble",
  },
  {
    id: 107,
    title: "The Human Story",
    artistId: 5,
    price: "₹29,800",
    image: "https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=500&h=500&fit=crop",
    description:
      "A powerful portrait series documenting human stories and untold narratives with raw authenticity and emotion.",
    dimensions: "16 x 24 inches",
    year: 2024,
    category: "Photography",
    medium: "Archival Print",
  },
  {
    id: 108,
    title: "Silence & Form",
    artistId: 6,
    price: "₹24,500",
    image: "https://images.unsplash.com/photo-1549887534-7d0ca8f58ce6?w=500&h=500&fit=crop",
    description:
      "An exploration of negative space and simplicity in contemporary art, where absence speaks louder than presence.",
    dimensions: "20 x 20 inches",
    year: 2024,
    category: "Minimalist",
    medium: "Ink on Paper",
  },
  {
    id: 109,
    title: "Urban Fragments",
    artistId: 1,
    price: "₹31,400",
    image: "https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=500&h=500&fit=crop",
    description: "Capturing the essence of city life through reflections, perspectives, and architectural elements.",
    dimensions: "22 x 30 inches",
    year: 2023,
    category: "Painting",
    medium: "Mixed Media",
  },
  {
    id: 110,
    title: "Color Symphony",
    artistId: 2,
    price: "₹38,200",
    image: "https://images.unsplash.com/photo-1578926078328-123f5474f1f2?w=500&h=500&fit=crop",
    description:
      "A harmonious blend of colors creating a visual symphony of emotions, where each hue plays its own instrument.",
    dimensions: "32 x 32 inches",
    year: 2024,
    category: "Abstract",
    medium: "Acrylic on Canvas",
  },
  {
    id: 111,
    title: "Ethereal Worlds",
    artistId: 3,
    price: "₹34,500",
    image: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&h=500&fit=crop",
    description:
      "Digital art transcending reality with imaginative and fantastical elements, blending surrealism with technological innovation.",
    dimensions: "Digital - 8K",
    year: 2024,
    category: "Digital Art",
    medium: "3D Render",
  },
  {
    id: 112,
    title: "Whispers of Time",
    artistId: 5,
    price: "₹28,300",
    image: "https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=500&h=500&fit=crop",
    description:
      "A delicate photographic series capturing intimate moments and the quiet beauty of fleeting instances.",
    dimensions: "12 x 18 inches",
    year: 2023,
    category: "Photography",
    medium: "Fine Art Print",
  },
]

export const getArtistById = (id: number): Artist | undefined => {
  return artists.find((artist) => artist.id === id)
}

export const getArtworksByArtist = (artistId: number): Artwork[] => {
  return artworks.filter((artwork) => artwork.artistId === artistId)
}

export const getArtworkById = (id: number): Artwork | undefined => {
  return artworks.find((artwork) => artwork.id === id)
}

export const searchArtworks = (query: string): Artwork[] => {
  const q = query.toLowerCase()
  return artworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(q) ||
      artwork.description.toLowerCase().includes(q) ||
      getArtistById(artwork.artistId)?.name.toLowerCase().includes(q),
  )
}

export const filterArtworksByCategory = (category: string): Artwork[] => {
  return artworks.filter((artwork) => artwork.category === category)
}

export const sortArtworks = (items: Artwork[], sortBy: "price-low" | "price-high" | "newest") => {
  const sorted = [...items]
  if (sortBy === "price-low") {
    sorted.sort(
      (a, b) =>
        Number.parseFloat(a.price.replace("₹", "").replace(",", "")) -
        Number.parseFloat(b.price.replace("₹", "").replace(",", "")),
    )
  } else if (sortBy === "price-high") {
    sorted.sort(
      (a, b) =>
        Number.parseFloat(b.price.replace("₹", "").replace(",", "")) -
        Number.parseFloat(a.price.replace("₹", "").replace(",", "")),
    )
  } else if (sortBy === "newest") {
    sorted.sort((a, b) => b.year - a.year)
  }
  return sorted
}
