import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const artistsData = [
  {
    name: "Sophia Turner",
    bio: "Contemporary painter focusing on urban themes and vibrant cityscapes. Sophia's work explores the interplay of light and shadow in modern metropolitan landscapes.",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    specialization: "Painting",
    website: "sophiaturner.art",
    instagram: "@sophiaturner_art",
  },
  {
    name: "Marcus Chen",
    bio: "Abstract expressionist exploring color, form, and emotional depth through bold gestural marks. Marcus's practice investigates the boundaries between representation and abstraction.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    specialization: "Abstract",
    website: "marcuschen.studio",
    instagram: "@marcuschenart",
  },
  {
    name: "Emma Rodriguez",
    bio: "Digital artist creating stunning landscapes and 3D visualizations that blend technology with artistic vision. Emma pioneers new approaches to digital creation.",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    specialization: "Digital Art",
    website: "emmarodriguez.digital",
    instagram: "@emmarodriguez_art",
  },
  {
    name: "James Mitchell",
    bio: "Sculptor with a passion for creating dramatic forms in wood and stone. James explores the tension between raw material and refined form.",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    specialization: "Sculpture",
    website: "jamesmitchell.sculpture",
    instagram: "@jmitchell_sculptor",
  },
  {
    name: "Olivia Park",
    bio: "Photographer capturing raw emotions and untold stories through her lens. Olivia's work documents the human experience with intimacy and authenticity.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    specialization: "Photography",
    website: "oliviapark.photography",
    instagram: "@oliviapark_photos",
  },
  {
    name: "David Bergström",
    bio: "Minimalist artist exploring the beauty of simplicity and negative space. David's work is an exercise in reduction and clarity.",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    specialization: "Minimalist",
    website: "davidbergstrom.art",
    instagram: "@davidbergstrom_",
  },
]

const artworksData = [
  {
    artistIndex: 0,
    artworks: [
      {
        title: "Neon City Dreams",
        price: 34500,
        currency: "INR",
        image: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&h=500&fit=crop",
        description: "A vibrant depiction of night life in a modern city, capturing the energy and excitement of urban landscapes through bold color contrasts.",
        dimensions: "24 x 36 inches",
        year: 2024,
        category: "Painting",
        medium: "Acrylic on Canvas",
      },
      {
        title: "Twilight Reflections",
        price: 29000,
        currency: "INR",
        image: "https://imgs.search.brave.com/cWMJQ2Ik4Re3a_Dfc1XJ7pokdAtIyiXpy252wnaxEjc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amFja3NvbnNhcnQu/Y29tL2Jsb2cvd3At/Y29udGVudC91cGxv/YWRzLzIwMjMvMDEv/SG93X1RvX1Bob3Rv/Z3JhcGhfWW91cl9B/cnR3b3JrX0lOX1RI/RV9XSU5ET1cuanBn",
        description: "A peaceful urban scene at dusk with reflective surfaces and soft lighting creating moody atmosphere.",
        dimensions: "20 x 20 inches",
        year: 2023,
        category: "Painting",
        medium: "Oil on Canvas",
      },
      {
        title: "Urban Fragments",
        price: 31400,
        currency: "INR",
        image: "https://imgs.search.brave.com/ZoYulcihvQkqf3KVkUNPEDjN28JhemnYjfj35wakF58/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzkzLzk0Lzgy/LzM2MF9GXzc5Mzk0/ODI0MF9uNGpqM2kz/R2M4QUpHUndsajFH/Mkt3TEc1QXFyS3lP/NS5qcGc",
        description: "Capturing the essence of city life through reflections, perspectives, and architectural elements.",
        dimensions: "22 x 30 inches",
        year: 2023,
        category: "Painting",
        medium: "Mixed Media",
      },
    ]
  },
  {
    artistIndex: 1,
    artworks: [
      {
        title: "Chromatic Euphoria",
        price: 39800,
        currency: "INR",
        image: "https://imgs.search.brave.com/RHHGMULejfEUgqzqyJjL97NnlADbAYEERZnWxOciLGY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzY2ODIzMjIvci9p/bC9jOWY3NmYvNTY1/Nzk3NzkzOS9pbF82/MDB4NjAwLjU2NTc5/Nzc5MzlfZnNncC5q/cGc",
        description: "An abstract exploration of color and emotion, blending gestural techniques and bold color choices to evoke joy and movement.",
        dimensions: "30 x 40 inches",
        year: 2024,
        category: "Abstract",
        medium: "Mixed Media",
      },
      {
        title: "Luminescent Void",
        price: 36700,
        currency: "INR",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
        description: "A radiant abstract piece exploring the interplay of light and shadow, creating a sense of infinite depth and movement.",
        dimensions: "28 x 28 inches",
        year: 2024,
        category: "Abstract",
        medium: "Acrylic on Canvas",
      },
      {
        title: "Color Symphony",
        price: 38200,
        currency: "INR",
        image: "https://imgs.search.brave.com/h3hyakyN35wL_hpfE2bHZvRerXpwN8VNbQguytvBtvY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dWdhbGxlcnkuY29t/L2Nkbi9zaG9wL3By/b2R1Y3RzL29yaWdf/bGlzYS1lbGxleS1v/aWwtcGFpbnRpbmct/Y29sb3JmdWwtc3lt/cGhvbnktZGV0YWls/LTNfNTQweC5qcGc_/dj0xNjk3Njk0NDY5",
        description: "A harmonious blend of colors creating a visual symphony of emotions, where each hue plays its own instrument.",
        dimensions: "32 x 32 inches",
        year: 2024,
        category: "Abstract",
        medium: "Acrylic on Canvas",
      },
    ]
  },
  {
    artistIndex: 2,
    artworks: [
      {
        title: "Digital Horizon",
        price: 24500,
        currency: "INR",
        image: "https://imgs.search.brave.com/WqYt41rHRhBcAPXP4cG3YOt-Ij81QnD6SumdF0XRF0o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTUx/MzMwNzIwL3ZlY3Rv/ci9hbGllbi1wbGFu/ZXQtYXJ0d29yay5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZTlYTXpTVXlFYkp3/X2JKcFdXQWN4LWpL/VXp2ODByRHRsSjYz/WTVSaVExcz0",
        description: "A stunning digital landscape combining technology and nature in perfect harmony, showcasing surreal environmental elements.",
        dimensions: "Digital - 4K",
        year: 2024,
        category: "Digital Art",
        medium: "Digital",
      },
      {
        title: "Ethereal Worlds",
        price: 34500,
        currency: "INR",
        image: "https://imgs.search.brave.com/B6eHuNHVTB3pUAw7dI0mVEgHEuvKAHbPBXETBiVGRHg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZmZv/cmRhYmxlYXJ0ZmFp/ci5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMDkvZXRo/ZXJlYWwtYXJ0LWRh/bi1oaWxsaWVyLmpw/Zw",
        description: "Digital art transcending reality with imaginative and fantastical elements, blending surrealism with technological innovation.",
        dimensions: "Digital - 8K",
        year: 2024,
        category: "Digital Art",
        medium: "3D Render",
      },
    ]
  },
  {
    artistIndex: 3,
    artworks: [
      {
        title: "Stone Echo",
        price: 49800,
        currency: "INR",
        image: "https://imgs.search.brave.com/BAI2WJ7IX_uGOEe_USgnN2GCYFUwmgmB0qubtEV2xpo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZW5k/ZXIuZmluZWFydGFt/ZXJpY2EuY29tL2lt/YWdlcy9pbWFnZXMt/cHJvZmlsZS1mbG93/LzQwMC9pbWFnZXMv/YXJ0d29ya2ltYWdl/cy9tZWRpdW1sYXJn/ZS8zL2VjaG9zLW9m/LXN1bnNldC1wYXJr/LW1hcnktc3ZldGlr/LmpwZw",
        description: "A monumental sculpture in marble, reflecting the essence of human emotion and timeless beauty.",
        dimensions: "24 x 18 x 30 inches",
        year: 2023,
        category: "Sculpture",
        medium: "Marble",
      },
    ]
  },
  {
    artistIndex: 4,
    artworks: [
      {
        title: "The Human Story",
        price: 29800,
        currency: "INR",
        image: "https://imgs.search.brave.com/d6Bdt7e6cv7Jaqk5WoisFCaZ_feCG7DhtMxficHDxoM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzYyMzAxMjYvci9p/bC9kNWE0ZTYvNTM3/MjU0NzgzOS9pbF82/MDB4NjAwLjUzNzI1/NDc4MzlfdHZjcy5q/cGc",
        description: "A powerful portrait series documenting human stories and untold narratives with raw authenticity and emotion.",
        dimensions: "16 x 24 inches",
        year: 2024,
        category: "Photography",
        medium: "Archival Print",
      },
      {
        title: "Whispers of Time",
        price: 28300,
        currency: "INR",
        image: "https://imgs.search.brave.com/n8ZHJhq7fHQZk9zdsjN9BjISo7-5ZQwuaQZ2pxg-fjY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9meWRu/LmltZ2l4Lm5ldC9t/L2dlbi9hcnQtcHJp/bnQtc3F1YXJlLWZy/YW1lZC1ibGFjay9l/ZGM4M2Y5Yi1iYjUz/LTQ5ZTMtOGFmYi01/OTVjMjMwNWIxNjYu/anBnP2F1dG89Zm9y/bWF0LGNvbXByZXNz/JnE9NTAmdz0yODA",
        description: "A delicate photographic series capturing intimate moments and the quiet beauty of fleeting instances.",
        dimensions: "12 x 18 inches",
        year: 2023,
        category: "Photography",
        medium: "Fine Art Print",
      },
    ]
  },
  {
    artistIndex: 5,
    artworks: [
      {
        title: "Silence & Form",
        price: 24500,
        currency: "INR",
        image: "https://imgs.search.brave.com/iIWdDpTkm3WrhBKh-eYO3Z4EcTKyTA-p1QAApwNZCLo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE1LzYzLzYyLzk5/LzM2MF9GXzE1NjM2/Mjk5NzZfa1pUMEFE/VHRJYkNqR25kTmQx/UUFZdTExY3lISXNK/bWMuanBn",
        description: "An exploration of negative space and simplicity in contemporary art, where absence speaks louder than presence.",
        dimensions: "20 x 20 inches",
        year: 2024,
        category: "Minimalist",
        medium: "Ink on Paper",
      },
    ]
  },
]

async function main() {
  console.log('Start seeding...')

  // Clear existing data
  await prisma.artwork.deleteMany()
  await prisma.artist.deleteMany()
  console.log('Cleared existing data')

  // Create artists and their artworks
  const createdArtists = []
  
  for (let i = 0; i < artistsData.length; i++) {
    const artistData = artistsData[i]
    const relatedArtworks = artworksData.find(a => a.artistIndex === i)?.artworks || []
    
    const artist = await prisma.artist.create({
      data: {
        ...artistData,
        artworks: {
          create: relatedArtworks
        }
      },
      include: {
        artworks: true
      }
    })
    
    createdArtists.push(artist)
    console.log(`Created artist: ${artist.name} with ${artist.artworks.length} artworks`)
  }

  console.log('Seeding finished.')
  console.log(`Created ${createdArtists.length} artists`)
  console.log(`Total artworks: ${createdArtists.reduce((sum, a) => sum + a.artworks.length, 0)}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
