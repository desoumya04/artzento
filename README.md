# 🎨 Artzento - Art Gallery E-Commerce Platform

A modern, full-stack art gallery and e-commerce platform built with Next.js 15, TypeScript, Prisma, and MongoDB. Artzento connects artists with art enthusiasts, providing a seamless platform for discovering, showcasing, and purchasing artwork.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=flat-square&logo=prisma)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [What I Learned](#what-i-learned)
- [API Routes](#api-routes)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## 🎯 Overview

Artzento is a comprehensive art marketplace that bridges the gap between talented artists and art collectors. The platform features artwork browsing, artist profiles, shopping cart functionality, wishlist management, reviews, and artist submission capabilities. Built with modern web technologies, it emphasizes performance, user experience, and scalability.

## ✨ Features

### For Art Enthusiasts
- **🖼️ Browse Gallery**: Explore a curated collection of artworks with detailed information
- **🔍 Artist Profiles**: View artist bios, portfolios, and specializations
- **🛒 Shopping Cart**: Add artworks to cart with session-based persistence
- **❤️ Wishlist**: Save favorite artworks for later
- **⭐ Reviews & Ratings**: Read and write reviews for artworks
- **💱 Multi-Currency Support**: View prices in INR and USD
- **📱 Responsive Design**: Seamless experience across all devices

### For Artists
- **📤 Artwork Submission**: Submit artwork with detailed information
- **👤 Artist Registration**: Create artist profiles with portfolio
- **📊 Artist Following**: Build a follower base
- **🔗 Social Integration**: Link Instagram and personal websites

### Technical Features
- **⚡ Server-Side Rendering (SSR)**: Fast page loads with Next.js App Router
- **🔄 Real-time Data**: Dynamic content with Prisma ORM
- **🎨 Modern UI**: Built with Radix UI and Tailwind CSS
- **📦 Context API**: Efficient state management for cart, wishlist, and user preferences
- **🌓 Theme Support**: Light/dark mode with next-themes
- **📊 Database Seeding**: Pre-populated data for development
- **🖼️ Image Management**: Cloudinary integration for image uploads

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0 (App Router)
- **Language**: TypeScript 5.x
- **UI Components**: Radix UI (Accordion, Dialog, Dropdown, etc.)
- **Styling**: Tailwind CSS 4.1 with custom animations
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Image Handling**: Next Cloudinary

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB Atlas
- **ORM**: Prisma 6.19
- **API**: Next.js API Routes (RESTful)

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Package Manager**: npm/yarn/pnpm
- **Database Migrations**: Prisma Migrate
- **Seeding**: Custom seed scripts

## 📁 Project Structure

```
artzento/
├── app/                        # Next.js App Router
│   ├── api/                   # API Routes
│   │   ├── artists/          # Artist CRUD operations
│   │   ├── artworks/         # Artwork CRUD operations
│   │   ├── cart/             # Shopping cart management
│   │   ├── wishlist/         # Wishlist operations
│   │   ├── reviews/          # Review system
│   │   ├── follows/          # Artist follow functionality
│   │   └── upload/           # Image upload handling
│   ├── (pages)/              # Route pages
│   │   ├── gallery/          # Artwork gallery
│   │   ├── artists/          # Artists listing
│   │   ├── artist/[id]/      # Individual artist page
│   │   ├── artwork/[id]/     # Artwork details
│   │   ├── cart/             # Shopping cart page
│   │   ├── wishlist/         # Wishlist page
│   │   ├── submit/           # Artist submission form
│   │   ├── about/            # About page
│   │   └── contact/          # Contact page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/                # React components
│   ├── navbar.tsx            # Navigation bar
│   ├── footer.tsx            # Footer
│   ├── artwork-card.tsx      # Artwork display card
│   ├── artist-card.tsx       # Artist profile card
│   ├── review-form.tsx       # Review submission form
│   ├── reviews-list.tsx      # Reviews display
│   └── artist-submission-form.tsx
├── lib/                       # Utility libraries
│   ├── prisma.ts             # Prisma client
│   ├── types.ts              # TypeScript types
│   ├── currency.ts           # Currency utilities
│   ├── utils.ts              # Helper functions
│   ├── cart-context.tsx      # Shopping cart state
│   ├── wishlist-context.tsx  # Wishlist state
│   ├── artwork-context.tsx   # Artwork state
│   ├── reviews-context.tsx   # Reviews state
│   ├── theme-context.tsx     # Theme management
│   └── mock-data.ts          # Sample data
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seeding script
├── public/                    # Static assets
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind config
└── README.md                 # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/desoumya04/artzento.git
   cd artzento
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/artzento?retryWrites=true&w=majority"
   
   # Cloudinary (for image uploads)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   
   # Optional
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

4. **Generate Prisma client**
   ```bash
   npm run db:generate
   ```

5. **Push database schema**
   ```bash
   npm run db:push
   ```

6. **Seed the database** (optional)
   ```bash
   npm run db:seed
   ```

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Prisma Schema Overview

The application uses 6 main models:

- **Artist**: Artist profiles with bio, images, and social links
- **Artwork**: Art pieces with pricing, descriptions, and metadata
- **Review**: User reviews and ratings for artworks
- **CartItem**: Shopping cart items (session-based)
- **WishlistItem**: User wishlists (session-based)
- **ArtistFollow**: Artist following system (session-based)

### Database Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (development)
npm run db:push

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (database GUI)
npx prisma studio
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MongoDB connection string | ✅ Yes |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ Yes |
| `NEXT_PUBLIC_API_URL` | API base URL | ⚠️ Optional |

## 📚 What I Learned

Building Artzento has been an incredible learning journey. Here are the key skills and concepts I mastered:

### 1. **Next.js 15 App Router & Server Components**
   - Implemented file-based routing with the new App Router
   - Utilized Server Components for improved performance
   - Learned the difference between client and server components
   - Implemented dynamic routes with `[id]` parameters
   - Used `"use client"` directive appropriately for interactive components

### 2. **TypeScript Best Practices**
   - Created type-safe interfaces for all data models
   - Leveraged Prisma's generated types
   - Implemented proper type inference and generics
   - Used strict type checking to catch errors early

### 3. **Prisma ORM & MongoDB**
   - Designed a relational schema for MongoDB
   - Implemented CRUD operations with Prisma Client
   - Created database relations (one-to-many, many-to-one)
   - Used `@db.ObjectId` for MongoDB compatibility
   - Implemented database seeding for development
   - Learned cascade delete patterns

### 4. **State Management with React Context**
   - Built custom context providers for:
     - Shopping cart management
     - Wishlist functionality
     - Theme preferences
     - Artwork data
   - Implemented session-based storage for anonymous users
   - Learned proper context optimization techniques

### 5. **RESTful API Design**
   - Created RESTful API routes with Next.js API handlers
   - Implemented proper HTTP methods (GET, POST, PUT, DELETE)
   - Handled error responses and status codes
   - Validated request payloads
   - Implemented CORS and security headers

### 6. **Advanced UI Development**
   - Worked with Radix UI for accessible components
   - Implemented responsive design with Tailwind CSS
   - Created reusable component patterns
   - Built complex forms with React Hook Form and Zod validation
   - Implemented loading states and error handling
   - Created smooth animations and transitions

### 7. **Image Handling & Optimization**
   - Integrated Cloudinary for image uploads
   - Implemented Next.js Image optimization
   - Handled file uploads in API routes
   - Learned image transformation techniques

### 8. **E-commerce Patterns**
   - Built shopping cart functionality
   - Implemented wishlist features
   - Created product (artwork) detail pages
   - Designed artist profiles and portfolios
   - Built review and rating systems

### 9. **Performance Optimization**
   - Implemented code splitting
   - Used dynamic imports for heavy components
   - Optimized images with next/image
   - Implemented proper caching strategies
   - Reduced bundle size with tree shaking

### 10. **Database Relations & Queries**
   - Designed efficient database schemas
   - Implemented Prisma includes for relational data
   - Used orderBy for sorting
   - Created unique constraints and indexes
   - Learned query optimization techniques

### 11. **Form Handling & Validation**
   - Built complex forms with React Hook Form
   - Implemented Zod schema validation
   - Handled file uploads in forms
   - Created custom form components
   - Implemented error messages and validation feedback

### 12. **Session Management**
   - Implemented session-based cart for anonymous users
   - Created session tracking without authentication
   - Learned browser storage patterns (localStorage, sessionStorage)

### 13. **Deployment & DevOps**
   - Configured environment variables for production
   - Set up MongoDB Atlas for cloud database
   - Prepared application for Vercel deployment
   - Learned CI/CD basics

### Key Takeaways
- **Full-stack development**: Gained end-to-end experience from database to UI
- **Modern React patterns**: Mastered hooks, context, and component composition
- **Type safety**: Understood the importance of TypeScript in large projects
- **Database design**: Learned to design scalable schemas
- **User experience**: Built intuitive interfaces with accessibility in mind
- **Code organization**: Structured large projects for maintainability
- **Problem-solving**: Debugged complex issues across the stack

## 📡 API Routes

### Artworks
- `GET /api/artworks` - Fetch all artworks
- `GET /api/artworks/[id]` - Get single artwork
- `POST /api/artworks` - Create new artwork (with artist)
- `PUT /api/artworks/[id]` - Update artwork
- `DELETE /api/artworks/[id]` - Delete artwork

### Artists
- `GET /api/artists` - Fetch all artists
- `GET /api/artists/[id]` - Get single artist with artworks
- `POST /api/artists` - Create new artist
- `PUT /api/artists/[id]` - Update artist

### Cart
- `GET /api/cart` - Get cart items by session
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart` - Remove item from cart

### Wishlist
- `GET /api/wishlist` - Get wishlist items by session
- `POST /api/wishlist` - Add item to wishlist
- `DELETE /api/wishlist` - Remove item from wishlist

### Reviews
- `GET /api/reviews?artworkId=xxx` - Get reviews for artwork
- `POST /api/reviews` - Create new review

### Follows
- `GET /api/follows?sessionId=xxx` - Get followed artists
- `POST /api/follows` - Follow an artist
- `DELETE /api/follows` - Unfollow an artist

### Upload
- `POST /api/upload` - Upload image to Cloudinary

## 🖼️ Screenshots

*Add screenshots of your application here once deployed*

## 🚀 Future Enhancements

- [ ] User authentication with NextAuth.js
- [ ] Payment integration (Stripe/Razorpay)
- [ ] Advanced search and filtering
- [ ] Artist dashboard with analytics
- [ ] Order management system
- [ ] Email notifications
- [ ] Social sharing features
- [ ] Artwork recommendations based on preferences
- [ ] Mobile app with React Native
- [ ] Multi-language support
- [ ] Advanced admin panel
- [ ] Real-time chat with artists

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Developer

**Soumya De**
- GitHub: [@desoumya04](https://github.com/desoumya04)
- Repository: [artzento](https://github.com/desoumya04/artzento)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Unsplash](https://unsplash.com/) for placeholder images

---

**Built with ❤️ using Next.js, TypeScript, Prisma, and MongoDB**
