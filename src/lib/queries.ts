import { defineQuery } from 'groq'

// ============================================
// CENTRALIZED PRODUCT QUERIES (NEW - RECOMMENDED)
// ============================================

// Get all products with localized fields
export const allProductsCentralizedQuery = defineQuery(`
  *[_type == "productCentralized"] | order(titleEn asc) {
    _id,
    slug,
    scientificName,
    category,
    season,
    image,
    availability,
    certifications,
    packaging,
    sizes,
    "title": select(
      $lang == "ar" => titleAr,
      $lang == "ru" => coalesce(titleRu, titleEn),
      titleEn
    ),
    "description": select(
      $lang == "ar" => descriptionAr,
      $lang == "ru" => coalesce(descriptionRu, descriptionEn),
      descriptionEn
    )
  }
`)

// Get single product by slug with localized fields
export const productBySlugCentralizedQuery = defineQuery(`
  *[_type == "productCentralized" && slug.current == $slug][0] {
    _id,
    slug,
    scientificName,
    category,
    season,
    image,
    gallery,
    availability,
    packaging,
    sizes,
    storage,
    shelfLife,
    certifications,
    titleAr,
    titleEn,
    titleRu,
    descriptionAr,
    descriptionEn,
    descriptionRu,
    "title": select(
      $lang == "ar" => titleAr,
      $lang == "ru" => coalesce(titleRu, titleEn),
      titleEn
    ),
    "description": select(
      $lang == "ar" => descriptionAr,
      $lang == "ru" => coalesce(descriptionRu, descriptionEn),
      descriptionEn
    ),
    "seo": select(
      $lang == "ar" => seoAr,
      $lang == "ru" => coalesce(seoRu, seoEn),
      seoEn
    )
  }
`)

// Get products by category (centralized)
export const productsByCategoryCentralizedQuery = defineQuery(`
  *[_type == "productCentralized" && category == $category] | order(titleEn asc) {
    _id,
    slug,
    scientificName,
    category,
    season,
    image,
    availability,
    "title": select(
      $lang == "ar" => titleAr,
      $lang == "ru" => coalesce(titleRu, titleEn),
      titleEn
    ),
    "description": select(
      $lang == "ar" => descriptionAr,
      $lang == "ru" => coalesce(descriptionRu, descriptionEn),
      descriptionEn
    )
  }
`)

// Get products by season (centralized)
export const productsBySeasonCentralizedQuery = defineQuery(`
  *[_type == "productCentralized" && season == $season] | order(titleEn asc) {
    _id,
    slug,
    scientificName,
    category,
    season,
    image,
    availability,
    "title": select(
      $lang == "ar" => titleAr,
      $lang == "ru" => coalesce(titleRu, titleEn),
      titleEn
    ),
    "description": select(
      $lang == "ar" => descriptionAr,
      $lang == "ru" => coalesce(descriptionRu, descriptionEn),
      descriptionEn
    )
  }
`)

// ============================================
// OLD PRODUCT QUERIES (LEGACY - will be removed)
// ============================================

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
// Note: Calendar events reference Arabic products. We fetch the localized version.
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
      category,
      language
    },
    "localizedProduct": *[_type == "product" && language == $lang && originalDocument._ref == ^.product._ref][0]{
      _id,
      title,
      slug,
      image,
      category,
      language
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
      category,
      language
    },
    "localizedProduct": *[_type == "product" && language == $lang && originalDocument._ref == ^.product._ref][0]{
      _id,
      title,
      slug,
      image,
      category,
      language
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

// Fallback query: Get product in requested language, or fallback to Arabic
export const productBySlugWithFallbackQuery = defineQuery(`
  {
    "product": *[_type == "product" && slug.current == $slug && language == $lang][0] {
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
      seo,
      language
    },
    "fallback": *[_type == "product" && slug.current == $slug][0] {
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
      seo,
      language,
      "arOriginal": *[_type == "product" && language == "ar" && (
        _id == ^.originalDocument._ref ||
        ^._id == originalDocument._ref
      )][0] {
        _id,
        title,
        slug,
        language
      }
    }
  }
`)

// Get product by ID with all fields
export const productByIdQuery = defineQuery(`
  *[_type == "product" && _id == $id][0] {
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
    seo,
    language,
    originalDocument
  }
`)
