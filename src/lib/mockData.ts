// Mock data for the Alsoadaa Export Website

export interface Product {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  description: string;
  category: 'citrus' | 'vegetables' | 'berries' | 'lemons' | 'grapes';
  season: 'in-season' | 'coming-soon' | 'peak' | 'last-weeks';
  image: string;
  certifications: string[];
  availability: {
    january: boolean;
    february: boolean;
    march: boolean;
    april: boolean;
    may: boolean;
    june: boolean;
    july: boolean;
    august: boolean;
    september: boolean;
    october: boolean;
    november: boolean;
    december: boolean;
  };
  specifications: {
    packaging: string[];
    sizes: string[];
    storage: string;
    shelfLife: string;
  };
  gallery: string[];
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'navel-orange',
    name: 'Navel Orange',
    scientificName: 'Citrus × sinensis',
    description: 'Premium Egyptian Navel oranges known for their sweetness and easy-to-peel skin. Perfect for fresh consumption and juice production.',
    category: 'citrus',
    season: 'peak',
    image: 'https://images.unsplash.com/photo-1740242386780-20d3dc753ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZXMlMjBiYXNrZXR8ZW58MXx8fHwxNzYxNDg3MTkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    certifications: ['ISO', 'GAP'],
    availability: {
      january: true,
      february: true,
      march: true,
      april: false,
      may: false,
      june: false,
      july: false,
      august: false,
      september: false,
      october: true,
      november: true,
      december: true,
    },
    specifications: {
      packaging: ['15kg cartons', '8kg cartons', 'Bulk containers'],
      sizes: ['Small (56-64mm)', 'Medium (64-72mm)', 'Large (72-80mm)', 'Extra Large (80mm+)'],
      storage: 'Cold storage at 3-8°C',
      shelfLife: '30-45 days under proper storage',
    },
    gallery: [
      'https://images.unsplash.com/photo-1740242386780-20d3dc753ca1?w=800',
      'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=800',
      'https://images.unsplash.com/photo-1547514701-42782101795e?w=800',
    ],
  },
  {
    id: '2',
    slug: 'pomegranates',
    name: 'Pomegranates',
    scientificName: 'Punica granatum',
    description: 'Egyptian pomegranates are renowned worldwide for their deep red color, sweet-tart flavor, and abundant juice content.',
    category: 'berries',
    season: 'in-season',
    image: 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb21lZ3JhbmF0ZSUyMGZydWl0fGVufDF8fHx8MTc2MTQ4NzE5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    certifications: ['ISO', 'GAP'],
    availability: {
      january: false,
      february: false,
      march: false,
      april: false,
      may: false,
      june: false,
      july: false,
      august: true,
      september: true,
      october: true,
      november: true,
      december: false,
    },
    specifications: {
      packaging: ['4kg cartons', '5kg cartons', 'Custom packaging available'],
      sizes: ['Small (200-250g)', 'Medium (250-350g)', 'Large (350-450g)', 'Extra Large (450g+)'],
      storage: 'Cold storage at 5°C, 90-95% humidity',
      shelfLife: '2-3 months under proper storage',
    },
    gallery: [
      'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=800',
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800',
    ],
  },
  {
    id: '3',
    slug: 'fresh-grapes',
    name: 'Fresh Grapes',
    scientificName: 'Vitis vinifera',
    description: 'Premium table grapes grown in the Nile Delta. Available in both green and red varieties with exceptional sweetness.',
    category: 'grapes',
    season: 'in-season',
    image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGdyYXBlc3xlbnwxfHx8fDE3NjE0ODcxOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    certifications: ['ISO', 'GAP'],
    availability: {
      january: false,
      february: false,
      march: false,
      april: false,
      may: true,
      june: true,
      july: true,
      august: true,
      september: true,
      october: true,
      november: false,
      december: false,
    },
    specifications: {
      packaging: ['4.5kg cartons', '5kg cartons', 'Punnet packaging'],
      sizes: ['Flame Seedless', 'Superior Seedless', 'Thompson Seedless'],
      storage: 'Cold storage at 0-2°C',
      shelfLife: '40-60 days under proper storage',
    },
    gallery: [
      'https://images.unsplash.com/photo-1596363505729-4190a9506133?w=800',
      'https://images.unsplash.com/photo-1599819177153-0e5572d1c1c5?w=800',
    ],
  },
  {
    id: '4',
    slug: 'fresh-lemons',
    name: 'Fresh Lemons',
    scientificName: 'Citrus limon',
    description: 'Egyptian lemons are highly aromatic with high juice content, perfect for culinary and beverage applications.',
    category: 'lemons',
    season: 'coming-soon',
    image: 'https://images.unsplash.com/photo-1704131809595-936882d7a25d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbiUyMGNpdHJ1c3xlbnwxfHx8fDE3NjEzODU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    certifications: ['ISO', 'GAP'],
    availability: {
      january: true,
      february: true,
      march: true,
      april: true,
      may: false,
      june: false,
      july: false,
      august: false,
      september: false,
      october: false,
      november: true,
      december: true,
    },
    specifications: {
      packaging: ['15kg cartons', '8kg cartons'],
      sizes: ['Small (53-62mm)', 'Medium (62-67mm)', 'Large (67-75mm)'],
      storage: 'Cold storage at 10-13°C',
      shelfLife: '30-60 days under proper storage',
    },
    gallery: [
      'https://images.unsplash.com/photo-1704131809595-936882d7a25d?w=800',
      'https://images.unsplash.com/photo-1590502593747-42a996133562?w=800',
    ],
  },
  {
    id: '5',
    slug: 'fresh-vegetables',
    name: 'Fresh Vegetables',
    scientificName: 'Various',
    description: 'A wide selection of premium Egyptian vegetables including peppers, tomatoes, and leafy greens, grown with sustainable practices.',
    category: 'vegetables',
    season: 'in-season',
    image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzYxNDYzOTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    certifications: ['ISO', 'GAP'],
    availability: {
      january: true,
      february: true,
      march: true,
      april: true,
      may: true,
      june: true,
      july: true,
      august: true,
      september: true,
      october: true,
      november: true,
      december: true,
    },
    specifications: {
      packaging: ['5kg cartons', '10kg cartons', 'Custom packaging'],
      sizes: ['Various by vegetable type'],
      storage: 'Cold storage at 2-8°C depending on type',
      shelfLife: '7-21 days under proper storage',
    },
    gallery: [
      'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800',
      'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=800',
    ],
  },
  {
    id: '6',
    slug: 'valencia-orange',
    name: 'Valencia Orange',
    scientificName: 'Citrus × sinensis',
    description: 'The premier juice orange variety. Valencia oranges are known for their high juice content and balanced sweet-tart flavor.',
    category: 'citrus',
    season: 'in-season',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800',
    certifications: ['ISO', 'GAP'],
    availability: {
      january: false,
      february: false,
      march: true,
      april: true,
      may: true,
      june: true,
      july: true,
      august: true,
      september: false,
      october: false,
      november: false,
      december: false,
    },
    specifications: {
      packaging: ['15kg cartons', '8kg cartons'],
      sizes: ['Small (56-64mm)', 'Medium (64-72mm)', 'Large (72-80mm)'],
      storage: 'Cold storage at 3-8°C',
      shelfLife: '30-45 days under proper storage',
    },
    gallery: [
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800',
    ],
  },
];

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

export const companyStats = {
  yearsExporting: 15,
  countriesServed: 50,
  containersPerYear: 1000,
  certifications: 3,
};
