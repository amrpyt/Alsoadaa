import type { SanityDocument } from '@sanity/client'
import type { PortableTextBlock } from '@portabletext/react'

export type Language = 'ar' | 'en' | 'ru'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface Product extends SanityDocument {
  _type: 'product'
  language: Language
  originalDocument?: {
    _ref: string
    _type: 'reference'
  }
  title: string
  slug: {
    current: string
    _type: 'slug'
  }
  scientificName?: string
  category: 'citrus' | 'vegetables' | 'berries' | 'lemons' | 'grapes'
  description?: string
  season?: 'in-season' | 'coming-soon' | 'peak' | 'last-weeks'
  image: SanityImage
  gallery?: SanityImage[]
  availability?: {
    january: boolean
    february: boolean
    march: boolean
    april: boolean
    may: boolean
    june: boolean
    july: boolean
    august: boolean
    september: boolean
    october: boolean
    november: boolean
    december: boolean
  }
  specifications?: {
    packaging?: string
    sizes?: string
    storage?: string
    shelfLife?: string
  }
  certifications?: string[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface Page extends SanityDocument {
  _type: 'page'
  language: Language
  originalDocument?: {
    _ref: string
    _type: 'reference'
  }
  title: string
  slug: {
    current: string
    _type: 'slug'
  }
  content?: PortableTextBlock[]
  published: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface Service extends SanityDocument {
  _type: 'service'
  language: Language
  originalDocument?: {
    _ref: string
    _type: 'reference'
  }
  name: string
  description: string
  icon?: string
  features?: string[]
  order: number
}

export interface CalendarEvent extends SanityDocument {
  _type: 'calendarEvent'
  product: Product
  month: 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december'
  status: 'available' | 'peak' | 'coming-soon' | 'last-weeks'
  notes?: string
}

export interface FormSubmission extends SanityDocument {
  _type: 'formSubmission'
  type: 'contact' | 'quote'
  language?: string
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  requirements?: string
  submittedAt: string
  status: 'new' | 'reviewed' | 'responded' | 'archived'
  notes?: string
}

// Helper type for form submission creation
export interface FormSubmissionInput {
  _type: 'formSubmission'
  type: 'contact' | 'quote'
  language: Language
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  requirements?: string
  submittedAt: string
  status: 'new'
}
