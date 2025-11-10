/**
 * Static data for the Alsoadaa Export Website
 * 
 * Note: Product data has been migrated to Sanity CMS.
 * This file now contains only static/hardcoded data like testimonials,
 * certifications, and company stats that don't need CMS management.
 */

// Testimonials - Static client feedback
export const testimonials = [
  {
    quote: "Al Soadaa has been our trusted supplier for over 5 years. Their commitment to quality and reliable delivery is unmatched.",
    author: "Mohammed Al-Rashid",
    company: "Premium Foods Distribution",
    country: "Saudi Arabia",
  },
  {
    quote: "The quality of their citrus products is exceptional. Every shipment arrives fresh and meets our strict standards.",
    author: "Elena Popov",
    company: "Euro Fresh Imports",
    country: "Russia",
  },
  {
    quote: "Professional service from start to finish. Al Soadaa understands the needs of international markets.",
    author: "David Chen",
    company: "Asian Markets Group",
    country: "China",
  },
];

// Certifications - Company certifications
export const certifications = [
  {
    name: 'ISO 9001',
    description: 'Quality Management System certification ensuring consistent quality control and customer satisfaction.',
    icon: '🏆',
  },
  {
    name: 'Global G.A.P',
    description: 'Good Agricultural Practices certification guaranteeing safe and sustainable agricultural production.',
    icon: '🌱',
  },
  {
    name: 'HACCP',
    description: 'Hazard Analysis and Critical Control Points certification for food safety management.',
    icon: '✓',
  },
];

// Company Statistics
export const companyStats = {
  yearsExporting: 15,
  countriesServed: 50,
  containersPerYear: 1000,
  certifications: 3,
};
