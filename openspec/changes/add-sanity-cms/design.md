# Design: Sanity.io Serverless CMS Integration

## Context

Alsoadaa is a client-side React application currently using hardcoded mock data. The goal is to integrate Sanity.io as a serverless headless CMS to enable dynamic content management without maintaining backend infrastructure. The solution must be fully serverless, cost-effective, and maintain the current fast performance.

**Stakeholders:**
- Content editors who need to update products and pages
- Developers who need type-safe content queries
- End users who expect fast page loads

**Constraints:**
- Must remain serverless (no custom backend servers)
- Must maintain current performance (< 2s initial load)
- Must work with existing Docker deployment
- Must support Arabic and English content
- Budget-conscious (use Sanity's free tier initially)

## Goals / Non-Goals

**Goals:**
- Enable non-technical content management through Sanity Studio
- Fetch all content (products, pages, services, calendar) from Sanity
- Store form submissions in Sanity for review
- Optimize images through Sanity's CDN with automatic transformations
- Support draft/published workflow for content preview
- Maintain type safety with TypeScript
- Keep the application fully serverless

**Non-Goals:**
- Real-time collaboration features (not needed for small team)
- Custom authentication (use Sanity's built-in auth)
- Server-side rendering (keeping client-side architecture)
- Complex workflow approvals (simple draft/publish is sufficient)
- Custom image processing (use Sanity's built-in transformations)

## Decisions

### Decision 1: Sanity.io as CMS Platform
**What:** Use Sanity.io as the headless CMS instead of alternatives like Contentful, Strapi, or Directus.

**Why:**
- **Serverless by default**: No infrastructure to manage, perfect for the requirement
- **Free tier**: Generous limits (10k documents, 5GB assets, 3 users) suitable for this project
- **GROQ query language**: Powerful, GraphQL-like queries with better performance for this use case
- **Image CDN**: Built-in Imgix-powered CDN with automatic optimization
- **Portable Text**: Rich text format that's easy to render in React
- **TypeScript support**: First-class TypeScript SDK and type generation
- **Real-time**: Built-in real-time subscriptions if needed later

**Alternatives considered:**
- **Contentful**: More expensive, less flexible query language
- **Strapi**: Requires server hosting (not serverless)
- **Directus**: Requires database and server (not serverless)
- **Firebase/Firestore**: Less structured, no built-in CMS UI

### Decision 2: Separate Sanity Studio Deployment
**What:** Deploy Sanity Studio as a separate application, not embedded in the main website.

**Why:**
- **Security**: Studio doesn't need to be publicly accessible with the main site
- **Performance**: Reduces main bundle size by ~500KB
- **Deployment flexibility**: Can deploy Studio to Sanity Cloud (free) or Vercel
- **Access control**: Easier to manage who can access the CMS
- **Updates**: Studio can be updated independently

**Implementation:**
- Create `studio/` directory in repository root
- Deploy to `studio.alsoadaa.com` or Sanity Cloud
- Configure CORS to allow main site to fetch content

### Decision 3: Content Modeling Strategy
**What:** Create the following Sanity schema types:

1. **Product** (document)
   - Basic info: name, slug, scientific name, description
   - Category: citrus, vegetables, berries, lemons, grapes
   - Season status: in-season, coming-soon, peak, last-weeks
   - Availability: monthly boolean flags
   - Specifications: packaging, sizes, storage, shelf life
   - Media: main image, gallery images
   - Certifications: array of strings
   - SEO: meta title, description

2. **Page** (document)
   - Title, slug, content (Portable Text)
   - SEO metadata
   - Published status

3. **Service** (document)
   - Name, description, icon
   - Features array
   - Order (for sorting)

4. **CalendarEvent** (document)
   - Product reference
   - Month, status
   - Notes

5. **FormSubmission** (document)
   - Type: contact, quote
   - Name, email, phone, company
   - Message/requirements
   - Timestamp, status (new, reviewed, responded)

**Why this structure:**
- Matches existing mock data structure for easy migration
- Normalized (products referenced in calendar, not duplicated)
- Flexible for future expansion
- Supports both Arabic and English content (localized strings)

### Decision 4: Data Fetching Strategy
**What:** Use client-side fetching with Sanity's JavaScript client v6+ with `useCdn: true` for optimal performance.

**Why:**
- **Consistency**: Matches current client-side architecture
- **Simplicity**: No need for API routes or server functions
- **CDN Performance**: Sanity's CDN provides < 100ms response times globally
- **Cost-effective**: CDN requests are free on all plans
- **Real-time**: Can add real-time subscriptions later if needed

**Implementation:**
```typescript
import { createClient } from '@sanity/client'
import { defineQuery } from 'groq'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for production
})

// Type-safe queries using defineQuery
export const productsQuery = defineQuery(`*[_type == "product"]{
  _id,
  title,
  slug,
  "imageUrl": image.asset->url
}`)
```

**Trade-offs:**
- Initial page load shows loading state (acceptable for this use case)
- Content not in HTML (SEO impact minimal for product catalog)
- Can add SSR/SSG later if SEO becomes critical

### Decision 5: Image Optimization Strategy
**What:** Use Sanity's Image CDN with `@sanity/image-url` for all images with automatic format conversion.

**Why:**
- **Automatic optimization**: WebP/AVIF conversion, compression
- **Responsive images**: Generate multiple sizes with srcset
- **Hotspot support**: Editor-defined focal points preserved
- **CDN delivery**: Imgix-powered global edge network
- **Transformations**: Crop, resize, blur, filters on-the-fly
- **Performance**: Lazy loading with blur placeholders

**Implementation (Latest Best Practices):**
```typescript
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const { projectId, dataset } = client.config()

export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset })
        .image(source)
        .auto('format') // WebP/AVIF automatic
        .fit('max')
    : null

// Usage with responsive images
const imageUrl = urlFor(product.image)?.width(800).height(600).url()
```

**GROQ Optimization:**
Fetch only image reference, not full asset details:
```groq
*[_type == "product"]{
  image // Just the reference, not image->
}
```

### Decision 6: Form Submission Handling
**What:** Submit contact/quote forms directly to Sanity using the client SDK.

**Why:**
- **Serverless**: No backend needed for form handling
- **Centralized**: All data in one place (Sanity)
- **Review workflow**: Content editors can review/respond in Studio
- **Notifications**: Can set up Sanity webhooks to trigger emails (future)

**Implementation:**
- Use `sanityClient.create()` to create form submission documents
- Add validation with Zod (existing)
- Show success/error toast notifications (existing Sonner)
- Store submissions with status field for workflow

**Alternatives considered:**
- **Email-only**: Loses submission history, no workflow
- **Third-party forms**: Additional service to manage (Formspree, etc.)
- **Serverless functions**: Adds complexity, not needed

### Decision 7: Environment Configuration
**What:** Use Vite environment variables for Sanity configuration following latest best practices.

**Configuration needed:**
```env
# .env.local (for development)
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_USE_CDN=true

# Optional: For write operations (form submissions)
VITE_SANITY_TOKEN=your-write-token
```

**Why:**
- **Security**: Project ID is public (safe to expose), token is optional for write operations
- **Flexibility**: Easy to switch between datasets (dev/staging/production)
- **Best practice**: Follows Vite conventions and Sanity v6+ recommendations
- **API Versioning**: Use date-based API version (YYYY-MM-DD) for stability

### Decision 8: TypeScript Type Generation
**What:** Use Sanity's built-in TypeScript support with `defineType` and `defineField` for schema definitions.

**Why:**
- **Type safety**: Catch errors at compile time
- **Autocomplete**: Better DX with IntelliSense
- **Refactoring**: Easier to update when schemas change
- **Modern approach**: Uses Sanity v6+ built-in type system
- **No external tools**: No need for separate codegen tools

**Implementation (Modern Sanity v6+):**
```typescript
// studio/schemas/product.ts
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
```

**Query Type Safety with `defineQuery`:**
```typescript
import { defineQuery } from 'groq'

export const productsQuery = defineQuery(
  `*[_type == "product"]{ _id, title, slug }`
)
```

### Decision 9: AI-Powered Translation Strategy
**What:** Use Sanity AI Assist for automated translation between Arabic, English, and Russian with document-level language separation.

**Why:**
- **Automated Translation**: AI translates content with one click in Studio
- **100% FREE**: Google Translate offers 500,000 characters/month for free
- **Multiple Languages**: Support for Arabic (ar), English (en), Russian (ru)
- **Context-Aware**: Maintains formatting and context during translation
- **Protected Phrases**: Keep brand names and technical terms untranslated
- **SEO-Friendly**: Separate documents per language (better for search engines)
- **Professional Quality**: Review and adjust AI translations before publishing

**Architecture (Document-Level):**
```typescript
// Each language is a separate document
{
  _id: 'product-123-ar',
  _type: 'product',
  language: 'ar',
  title: 'برتقال نافل',
  slug: { current: 'navel-orange-ar' },
  originalDocument: null // This is the source
}

{
  _id: 'product-123-en',
  _type: 'product',
  language: 'en',
  title: 'Navel Orange',
  slug: { current: 'navel-orange-en' },
  originalDocument: { _ref: 'product-123-ar' } // Links to Arabic
}

{
  _id: 'product-123-ru',
  _type: 'product',
  language: 'ru',
  title: 'Апельсин Навел',
  slug: { current: 'navel-orange-ru' },
  originalDocument: { _ref: 'product-123-ar' } // Links to Arabic
}
```

**Implementation:**
```typescript
// studio/sanity.config.ts
import { assist } from '@sanity/assist'

export default defineConfig({
  plugins: [
    assist({
      translate: {
        // Use Google Translate (FREE - 500k chars/month)
        provider: 'google',
        document: {
          languageField: 'language',
          documentTypes: ['product', 'page', 'service'],
        },
      },
    }),
  ],
})

// Schema with language field
defineField({
  name: 'language',
  type: 'string',
  options: {
    list: [
      { title: 'العربية', value: 'ar' },
      { title: 'English', value: 'en' },
      { title: 'Русский', value: 'ru' },
    ],
  },
  validation: (rule) => rule.required(),
  initialValue: 'ar',
})
```

**Frontend Language Switching:**
```typescript
// Get current language from localStorage
const lang = localStorage.getItem('language') || 'ar'

// Fetch products in selected language
const products = await client.fetch(
  `*[_type == "product" && language == $lang]`,
  { lang }
)

// Set document direction (RTL for Arabic, LTR for English/Russian)
document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
document.documentElement.lang = lang
```

**Translation Workflow:**
1. Create content in Arabic (default language)
2. Click "Translate" button in Studio
3. Select target language (English or Russian)
4. AI Assist creates new document with translated content
5. Review and adjust translation if needed
6. Publish translated version

**Protected Phrases:**
```typescript
{
  protectedPhrases: [
    'Alsoadaa',      // Brand name
    'ISO',           // Certification
    'GAP',           // Certification
    'Citrus × sinensis', // Scientific names
  ]
}
```

**Alternatives considered:**
- **Field-Level Translation**: All languages in one document (rejected: complex queries, harder to manage)
- **Manual Translation**: No AI assistance (rejected: time-consuming)
- **OpenAI Translation**: Better quality but requires paid API key (rejected: unnecessary cost)
- **Third-Party Services**: Separate translation service (rejected: adds complexity, costs more)

**Cost Analysis (Google Translate FREE):**
- Google Translate: **FREE** (500,000 characters/month)
- Average product: 500 characters
- 100 products × 2 translations = 100,000 characters
- **Cost: $0.00** (completely free!)
- Remaining quota: 400,000 chars for updates and new content

## Risks / Trade-offs

### Risk 1: Sanity Free Tier Limits
**Risk:** Project grows beyond free tier limits (10k documents, 5GB assets).

**Mitigation:**
- Monitor usage in Sanity dashboard
- Free tier is generous for this use case (estimated < 1000 products)
- Paid tier is affordable ($99/month if needed)
- Can optimize by archiving old form submissions

### Risk 2: Client-Side Fetching Performance
**Risk:** Initial page load shows loading state, perceived as slow.

**Mitigation:**
- Sanity CDN is very fast (< 100ms typical response)
- Add skeleton loaders for better UX
- Consider adding React Query for caching
- Can add SSR/SSG later if needed (Vite SSR or migrate to Next.js)

### Risk 3: CORS Configuration
**Risk:** CORS issues when fetching from Sanity in production.

**Mitigation:**
- Configure allowed origins in Sanity project settings
- Add production domain before deployment
- Test in production-like environment

### Risk 4: Content Migration Effort
**Risk:** Migrating existing mock data to Sanity is manual work.

**Mitigation:**
- Create migration script to import mock data
- Use Sanity's import API
- Estimated 2-4 hours for ~50 products

### Risk 5: Learning Curve
**Risk:** Team needs to learn GROQ query language and Sanity Studio.

**Mitigation:**
- GROQ is similar to GraphQL (familiar to developers)
- Sanity Studio is intuitive for content editors
- Excellent documentation and community
- Provide training/documentation for team

## Migration Plan

### Phase 1: Setup (Day 1)
1. Create Sanity project on sanity.io
2. Install dependencies (`@sanity/client`, `@sanity/image-url`)
3. Create `studio/` directory with Sanity Studio
4. Define schemas for all content types
5. Configure environment variables

### Phase 2: Studio Deployment (Day 1-2)
1. Deploy Sanity Studio to Sanity Cloud or Vercel
2. Configure CORS for production domain
3. Test Studio access and permissions
4. Import mock data using migration script

### Phase 3: Client Integration (Day 2-3)
1. Create Sanity client configuration (`src/lib/sanity.ts`)
2. Create GROQ queries (`src/lib/queries.ts`)
3. Generate TypeScript types
4. Update components to fetch from Sanity
5. Replace mock data imports

### Phase 4: Testing (Day 3-4)
1. Test all pages with real Sanity data
2. Test form submissions
3. Test image loading and optimization
4. Test draft/preview mode
5. Performance testing

### Phase 5: Deployment (Day 4)
1. Update environment variables in production
2. Deploy updated application
3. Verify all content loads correctly
4. Monitor for errors

### Rollback Plan
If issues arise:
1. Revert to previous deployment (mock data still in git history)
2. Environment variables can switch back to mock data mode
3. Sanity data is preserved (no data loss)
4. Can debug and redeploy

## Open Questions

1. **Content localization**: Do we need Arabic/English content now or later?
   - **Answer needed from**: Product owner
   - **Impact**: Schema design (localized strings vs separate documents)

2. **Studio access**: Who needs access to Sanity Studio?
   - **Answer needed from**: Project manager
   - **Impact**: User invitations and role setup

3. **Domain for Studio**: Use Sanity Cloud or custom domain?
   - **Answer needed from**: DevOps/Product owner
   - **Impact**: DNS configuration and deployment strategy

4. **Email notifications**: Should form submissions trigger email notifications?
   - **Answer needed from**: Product owner
   - **Impact**: Need to set up Sanity webhooks + email service (e.g., SendGrid)

5. **Content backup**: What's the backup/disaster recovery strategy?
   - **Answer needed from**: DevOps
   - **Impact**: Sanity has built-in backups, but may want additional exports
