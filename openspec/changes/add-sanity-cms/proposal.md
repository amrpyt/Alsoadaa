# Change: Add Sanity.io Serverless CMS Integration

## Why

The website currently uses hardcoded mock data in `src/lib/mockData.ts` for products, services, and content. This requires developer intervention for any content updates and makes it difficult for non-technical users to manage the website content. A serverless headless CMS solution will enable:

- Content editors to manage products, pages, and media without code changes
- Real-time content updates without redeployment
- Scalable image delivery through Sanity's CDN
- Structured content with validation and relationships
- Form submission storage and management
- Complete serverless architecture with no backend infrastructure to maintain

## What Changes

- **Add Sanity.io client SDK** for fetching content from Sanity's hosted API
- **Replace mock data** with dynamic content fetched from Sanity
- **Create Sanity schemas** for products, pages, services, calendar events, and form submissions with multi-language support (Arabic, English, Russian)
- **Integrate Sanity AI Assist** for automated translation between languages
- **Integrate Sanity Image CDN** for optimized image delivery with automatic transformations
- **Add content preview mode** for viewing draft content before publishing
- **Create Sanity Studio** as a separate deployment for content management
- **Implement GROQ queries** for efficient content fetching with filtering and pagination
- **Add environment configuration** for Sanity project ID and dataset
- **Create TypeScript types** generated from Sanity schemas
- **Implement form submission handler** that posts to Sanity via API

## Impact

- **Affected specs**: New capability `content-management` (no existing specs to modify)
- **Affected code**:
  - `src/lib/mockData.ts` - Will be replaced with Sanity client and queries
  - `src/pages/*.tsx` - Updated to fetch content from Sanity
  - `src/components/ProductCard.tsx` - Updated to use Sanity image URLs
  - `src/components/ContactForm.tsx` - Updated to submit to Sanity
  - New files: `src/lib/sanity.ts`, `src/lib/queries.ts`, `src/types/sanity.ts`
  - New directory: `studio/` for Sanity Studio configuration (separate deployment)
- **Dependencies**: Add `@sanity/client` (v6+), `@sanity/image-url`, `@portabletext/react`, `groq` for type-safe queries, `@sanity/assist` for AI-powered translation
- **Environment**: Requires `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION` (e.g., '2024-01-01'), and `VITE_SANITY_USE_CDN` environment variables
- **Deployment**: Sanity Studio will be deployed separately (Vercel/Netlify) or on Sanity Cloud
- **Breaking changes**: None - existing UI remains the same, only data source changes
