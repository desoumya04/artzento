# Quick Caching Reference Guide

## 🚀 Quick Start

Your Next.js 16 project now has advanced caching! Here's what you need to know:

## Adding Cache to New Functions

### 1. For Server Actions (Recommended)

```typescript
"use server"

import { cacheLife, cacheTag } from "next/cache"

export async function getMyData() {
  "use cache"
  cacheLife("hours") // or "days" or "weeks"
  cacheTag("my-data") // for invalidation
  
  const data = await prisma.myTable.findMany()
  return data
}
```

### 2. For Components

```typescript
async function MyComponent({ id }: { id: string }) {
  "use cache"
  cacheLife("hours")
  cacheTag("my-component", `item-${id}`)
  
  const data = await fetchData(id)
  return <div>{data.name}</div>
}
```

## Cache Profiles Available

| Profile | Use For | Client | Server | Max |
|---------|---------|--------|--------|-----|
| `hours` | Dynamic data (artworks) | 5 min | 15 min | 1 hour |
| `days` | Stable data (artists) | 1 hour | 2 hours | 1 day |
| `weeks` | Static data (categories) | 1 day | 2 days | 1 week |

## Invalidating Cache

### After Creating/Updating Data

```typescript
import { revalidateArtworks, revalidateArtist } from '@/app/submit/actions'

// After creating an artwork
await createArtwork(data)
await revalidateArtworks() // Clears artwork list cache

// After updating an artist
await updateArtist(id, data)
await revalidateArtist(id) // Clears specific artist cache
```

### Available Invalidation Functions

```typescript
revalidateArtworks()          // All artworks
revalidateArtists()           // All artists  
revalidateArtist(artistId)    // Specific artist
revalidateArtwork(artworkId)  // Specific artwork
revalidateAll()               // Everything (use sparingly!)
```

## Cache Tags Guide

### Naming Convention

```typescript
// General tags (for lists)
cacheTag("get-artworks")
cacheTag("get-artists")

// Specific tags (for items)
cacheTag(`artwork-${id}`)
cacheTag(`artist-${id}`)

// Multiple tags
cacheTag("get-artworks", `artist-${artistId}`)
```

## Common Patterns

### 1. List with Details

```typescript
// List (stable, long cache)
export async function getItems() {
  "use cache"
  cacheLife("days")
  cacheTag("get-items")
  return await prisma.item.findMany()
}

// Detail (can change, shorter cache)
export async function getItemById(id: string) {
  "use cache"
  cacheLife("hours")
  cacheTag("get-item", `item-${id}`)
  return await prisma.item.findUnique({ where: { id } })
}
```

### 2. Related Data

```typescript
export async function getRelated(parentId: string, excludeId: string) {
  "use cache"
  cacheLife("hours")
  cacheTag("get-related", `parent-${parentId}`)
  
  return await prisma.item.findMany({
    where: { parentId, id: { not: excludeId } }
  })
}
```

### 3. Server Component with Suspense

```typescript
// page.tsx
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DataList />
    </Suspense>
  )
}

async function DataList() {
  const data = await getCachedData() // Uses cache!
  return <div>{/* render */}</div>
}
```

## API Routes (If Needed)

### Add Revalidation

```typescript
export const revalidate = 3600 // seconds

export async function GET() {
  const data = await prisma.item.findMany()
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  })
}
```

### Invalidate After Mutation

```typescript
export async function POST(request: Request) {
  const data = await request.json()
  const result = await prisma.item.create({ data })
  
  // Invalidate caches
  await revalidateItems()
  
  return NextResponse.json(result)
}
```

## Debugging Cache

### Check if Caching Works

1. **First Load** - Should be slower (cache MISS)
2. **Reload** - Should be instant (cache HIT)
3. **After Invalidation** - Should be slower again (cache MISS)

### View Cache in DevTools

```typescript
// In browser console
performance.getEntriesByType("navigation")[0]
// Check transferSize - small = cached
```

### Check Server Logs

```bash
# Development
npm run dev
# Watch for cache-related messages

# Build info
npm run build
# Shows which routes are static/dynamic
```

## Common Issues

### ❌ Cache Not Working

**Problem**: Data always fresh, never cached

**Solutions**:
1. Check `"use cache"` is at top of function
2. Verify `cacheLife()` is called
3. Ensure function is `async`
4. Check arguments are serializable

### ❌ Stale Data

**Problem**: Old data showing after update

**Solutions**:
1. Call appropriate `revalidate*()` function
2. Check cache tags match
3. Verify `updateTag()` is awaited
4. Consider shorter cache profile

### ❌ Build Errors

**Problem**: "Cache timeout" during build

**Solutions**:
1. Don't use `cookies()`, `headers()` in cached scope
2. Pass runtime data as arguments
3. Check for dynamic data in closures

## Best Practices

✅ **DO:**
- Use server actions for data fetching
- Cache stable data longer (`days`/`weeks`)
- Tag caches for specific invalidation
- Use Suspense for loading states
- Test in production mode

❌ **DON'T:**
- Cache user-specific data (use `use cache: private`)
- Use cookies/headers inside `use cache`
- Over-invalidate (only clear what changed)
- Forget to await invalidation functions
- Cache mutations (only cache reads)

## Testing Checklist

- [ ] First load - data fetches from DB
- [ ] Reload - data loads instantly (cached)
- [ ] Create item - list updates immediately
- [ ] Update item - detail page refreshes
- [ ] Different users - see correct data
- [ ] Build succeeds - no cache timeouts
- [ ] Production mode - full caching works

## Need Help?

1. Check `CACHING_STRATEGY.md` for detailed docs
2. Look at existing cached functions in:
   - `app/artists/actions.ts`
   - `app/gallery/actions.ts`
   - `app/artist/[id]/actions.ts`
   - `app/artwork/[id]/actions.ts`
3. Review Next.js docs: https://nextjs.org/docs/app/api-reference/directives/use-cache

## Performance Targets

- **Cached reads**: < 100ms
- **Cache MISS**: 500-2000ms (database query)
- **Invalidation**: < 50ms
- **Build time**: No timeouts

Happy caching! 🚀
