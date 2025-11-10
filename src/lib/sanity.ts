import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Validate environment variables
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01'
const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== 'false'

if (!projectId) {
  throw new Error('Missing VITE_SANITY_PROJECT_ID environment variable')
}

if (!dataset) {
  throw new Error('Missing VITE_SANITY_DATASET environment variable')
}

// Create Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN to get latest data
  token: import.meta.env.VITE_SANITY_TOKEN, // Add token for authenticated requests
  // Remove perspective - it's not needed for client-side
})

// Create client for write operations (form submissions)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN,
})

// Image URL builder
const builder = imageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).auto('format').fit('max')
}

// Helper to get optimized image URL with dimensions
export const getImageUrl = (
  source: SanityImageSource,
  width?: number,
  height?: number
): string | null => {
  if (!source) return null
  
  let imageBuilder = urlFor(source)
  
  if (width) {
    imageBuilder = imageBuilder.width(width)
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height)
  }
  
  return imageBuilder.url()
}

// Helper to get responsive image URLs
export const getResponsiveImageUrls = (source: SanityImageSource) => {
  if (!source) return null
  
  return {
    small: getImageUrl(source, 400),
    medium: getImageUrl(source, 800),
    large: getImageUrl(source, 1200),
    xlarge: getImageUrl(source, 1600),
  }
}
