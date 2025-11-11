# Latest Sanity.io Updates (Context7 Documentation)

## ✅ Proposal Updated with Latest Best Practices

This proposal has been updated based on the latest Sanity.io documentation (retrieved Nov 9, 2025) to ensure we're using the most modern and recommended approaches.

## Key Updates from Latest Documentation

### 1. **Sanity Client v6+ (Latest)**
```typescript
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2024-01-01', // Date-based versioning
  useCdn: true, // Free CDN, < 100ms globally
})
```

**Why v6+:**
- Built-in TypeScript support (no external codegen needed)
- Better performance with CDN
- Modern API with `createClient`
- Free CDN requests on all plans

### 2. **Modern Schema Definition with `defineType` and `defineField`**
```typescript
import { defineType, defineField } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true }, // Editor-defined focal points
    }),
  ],
})
```

**Benefits:**
- Built-in type safety
- Better autocomplete in IDE
- No need for external codegen tools
- Follows Sanity v6+ conventions

### 3. **Type-Safe GROQ Queries with `defineQuery`**
```typescript
import { defineQuery } from 'groq'

export const productsQuery = defineQuery(
  `*[_type == "product"]{
    _id,
    title,
    slug,
    image // Just reference, not image-> (performance optimization)
  }`
)
```

**Performance Optimization:**
- Fetch `image` not `image->` to avoid loading full asset metadata
- Use explicit projections to avoid over-fetching
- Leverage Sanity's CDN caching

### 4. **Modern Image URL Builder Pattern**
```typescript
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const { projectId, dataset } = client.config()

export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset })
        .image(source)
        .auto('format') // Automatic WebP/AVIF
        .fit('max')
    : null

// Usage
const imageUrl = urlFor(product.image)?.width(800).height(600).url()
```

**Features:**
- Automatic format conversion (WebP/AVIF)
- Hotspot support (editor-defined focal points)
- Responsive images with srcset
- Imgix-powered CDN

### 5. **Environment Variables (Vite Best Practices)**
```env
# .env.local
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_USE_CDN=true

# Optional: For write operations (form submissions)
VITE_SANITY_TOKEN=your-write-token
```

**Security:**
- Project ID is public (safe to expose)
- Token only needed for write operations
- Use date-based API versioning for stability

### 6. **Portable Text Rendering (React)**
```typescript
import { PortableText } from '@portabletext/react'
import type { SanityDocument } from '@sanity/client'

export default function PageContent({ page }: { page: SanityDocument }) {
  return (
    <div className="prose">
      {Array.isArray(page.body) && <PortableText value={page.body} />}
    </div>
  )
}
```

### 7. **GROQ Query Optimization Patterns**

**❌ Inefficient (Over-fetching):**
```groq
*[_type == "post"]{
  ...,
  categories[]->
}
```

**✅ Efficient (Explicit Projections):**
```groq
*[_type == "post"]{
  title,
  slug,
  categories[]->{ title, slug }
}
```

**✅ Image Optimization:**
```groq
*[_type == "product"]{
  image // Just reference
}
// NOT: "imageUrl": image.asset->url (fetches too much data)
```

## Updated Dependencies

```json
{
  "dependencies": {
    "@sanity/client": "^6.0.0",
    "@sanity/image-url": "^1.0.0",
    "@portabletext/react": "^3.0.0",
    "groq": "^3.0.0"
  }
}
```

## Studio Initialization (Modern v6+)

```bash
# Create studio directory
mkdir studio
cd studio

# Initialize with latest Sanity CLI
npm create sanity@latest

# Development
npm run dev

# Deploy to Sanity Cloud (free)
npx sanity deploy
```

## Performance Best Practices

1. **Use CDN**: Set `useCdn: true` for production (< 100ms response times)
2. **Optimize Queries**: Use explicit projections, avoid `...` spread
3. **Image References**: Fetch `image` not `image->` to reduce payload
4. **Parallel Queries**: Execute independent queries in parallel
5. **Caching**: Leverage Sanity's edge CDN (free on all plans)

## Migration from Old Patterns

### Old Pattern (Pre-v6):
```typescript
// Old: sanity-codegen
import { Product } from './types/sanity-schema'
```

### New Pattern (v6+):
```typescript
// New: Built-in types
import { defineType, defineField } from 'sanity'
import type { SanityDocument } from '@sanity/client'
```

## Serverless Architecture Confirmed

✅ **100% Serverless:**
- Sanity.io hosted API (no backend needed)
- Sanity CDN for content delivery
- Sanity Cloud for Studio hosting (free tier)
- Client-side data fetching
- Form submissions via Sanity API

✅ **Cost Structure:**
- Free tier: 10k documents, 5GB assets, 3 users
- CDN requests: Free on all plans
- Paid tier: $99/month if needed (unlikely for this project)

## Next Steps

1. Review updated `proposal.md`, `design.md`, and `tasks.md`
2. Approve the proposal
3. Run `/openspec-apply` to start implementation
4. Follow the 20-phase implementation plan in `tasks.md`

## References

- [Sanity.io Official Docs](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Image Optimization](https://www.sanity.io/docs/image-url)
- [TypeScript Support](https://www.sanity.io/docs/typescript)
- [React Integration](https://www.sanity.io/docs/react)
