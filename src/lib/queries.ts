import { defineQuery } from 'groq'

// Product Queries
export const allProductsQuery = defineQuery(`
  *[_type == "product" && language == $lang] | order(title asc) {
    _id,
    title,
    slug,
    scientificName,
    category,
    description,
    season,
    image,
    availability,
    certifications
  }
`)

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug && language == $lang][0] {
    _id,
    title,
    slug,
    scientificName,
    category,
    description,
    season,
    image,
    gallery,
    availability,
    specifications,
    certifications,
    seo
  }
`)

export const productsByCategoryQuery = defineQuery(`
  *[_type == "product" && category == $category && language == $lang] | order(title asc) {
    _id,
    title,
    slug,
    scientificName,
    category,
    description,
    season,
    image,
    availability,
    certifications
  }
`)

export const productsBySeasonQuery = defineQuery(`
  *[_type == "product" && season == $season && language == $lang] | order(title asc) {
    _id,
    title,
    slug,
    scientificName,
    category,
    description,
    season,
    image,
    availability,
    certifications
  }
`)

// Page Queries
export const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug && language == $lang && published == true][0] {
    _id,
    title,
    slug,
    content,
    seo
  }
`)

export const allPagesQuery = defineQuery(`
  *[_type == "page" && language == $lang && published == true] | order(title asc) {
    _id,
    title,
    slug
  }
`)

// Service Queries
export const allServicesQuery = defineQuery(`
  *[_type == "service" && language == $lang] | order(order asc) {
    _id,
    name,
    description,
    icon,
    features,
    order
  }
`)

// Calendar Event Queries
export const calendarEventsByMonthQuery = defineQuery(`
  *[_type == "calendarEvent" && month == $month] {
    _id,
    month,
    status,
    notes,
    "product": product->{
      _id,
      title,
      slug,
      image,
      category
    }
  }
`)

export const allCalendarEventsQuery = defineQuery(`
  *[_type == "calendarEvent"] | order(month asc) {
    _id,
    month,
    status,
    notes,
    "product": product->{
      _id,
      title,
      slug,
      image,
      category
    }
  }
`)

// Form Submission Query (for admin)
export const allFormSubmissionsQuery = defineQuery(`
  *[_type == "formSubmission"] | order(submittedAt desc) {
    _id,
    type,
    language,
    name,
    email,
    phone,
    company,
    message,
    requirements,
    submittedAt,
    status,
    notes
  }
`)

export const findProductTranslationQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    "target": *[_type == "product" && language == $targetLang && (
      originalDocument._ref == ^._id ||
      _id == ^.originalDocument._ref ||
      originalDocument._ref == ^.originalDocument._ref
    )][0].slug.current
  }
`)
