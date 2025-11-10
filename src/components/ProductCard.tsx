import { ImageWithFallback } from './figma/ImageWithFallback';
import { getImageUrl } from '../lib/sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface ProductCardProps {
  name: string;
  image: SanityImageSource | string;
  category: 'citrus' | 'vegetables' | 'berries' | 'lemons' | 'grapes';
  season: 'in-season' | 'coming-soon' | 'peak' | 'last-weeks';
  certifications?: string[];
}

const categoryColors = {
  citrus: { bg: 'var(--citrus-orange)', light: 'var(--citrus-orange-bg)' },
  vegetables: { bg: 'var(--fresh-green)', light: 'var(--fresh-green-bg)' },
  berries: { bg: 'var(--berry-red)', light: 'var(--berry-red-bg)' },
  lemons: { bg: 'var(--lemon-yellow)', light: 'var(--lemon-yellow-bg)' },
  grapes: { bg: 'var(--grape-purple)', light: 'var(--grape-purple-bg)' },
};

const seasonBadges = {
  'in-season': { emoji: '🟢', text: 'In Season!', bg: 'var(--fresh-green-bg)', color: 'var(--fresh-green)' },
  'peak': { emoji: '⭐', text: 'Peak Season!', bg: 'var(--citrus-orange-bg)', color: 'var(--citrus-orange)' },
  'coming-soon': { emoji: '🟡', text: 'Coming Soon', bg: 'var(--lemon-yellow-bg)', color: '#C9A000' },
  'last-weeks': { emoji: '🔔', text: 'Last Weeks', bg: 'var(--berry-red-bg)', color: 'var(--berry-red)' },
};

export function ProductCard({ name, image, category, season, certifications = [] }: ProductCardProps) {
  const badge = seasonBadges[season];
  const colors = categoryColors[category];
  
  // Get optimized image URL from Sanity or use as-is if it's a string URL
  const imageUrl = typeof image === 'string' 
    ? image 
    : getImageUrl(image, 800, 600) || '';

  return (
    <div className="group cursor-pointer h-full">
      <div 
        className="relative overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col"
        style={{ borderRadius: '20px' }}
      >
        {/* Image Container - Larger aspect ratio */}
        <div className="aspect-[4/3] relative overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Season Badge - Larger and more prominent */}
          <div 
            className="absolute top-4 right-4 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm"
            style={{ 
              backgroundColor: badge.bg,
              border: `2px solid ${badge.color}`
            }}
          >
            <span className="text-base md:text-lg">{badge.emoji}</span>
            <span className="text-sm md:text-base font-semibold" style={{ color: badge.color }}>
              {badge.text}
            </span>
          </div>
        </div>

        {/* Card Content - More spacious */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          {/* Product Name - Larger font */}
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4" style={{ color: 'var(--gray-900)' }}>
            {name}
          </h3>
          
          {/* Certifications - Larger and more prominent */}
          {certifications.length > 0 && (
            <div className="flex items-center gap-3 md:gap-4 mt-auto">
              {certifications.includes('ISO') && (
                <div 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" 
                  style={{ backgroundColor: 'var(--trust-blue-bg)' }}
                >
                  <span className="text-sm md:text-base font-semibold" style={{ color: 'var(--trust-blue)' }}>✓ ISO</span>
                </div>
              )}
              {certifications.includes('GAP') && (
                <div 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" 
                  style={{ backgroundColor: 'var(--trust-blue-bg)' }}
                >
                  <span className="text-sm md:text-base font-semibold" style={{ color: 'var(--trust-blue)' }}>✓ GAP</span>
                </div>
              )}
            </div>
          )}

          {/* View Details hint */}
          <div className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div 
              className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold"
              style={{ color: colors.bg }}
            >
              <span>View Details</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
