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
        className="relative overflow-hidden bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col"
        style={{ borderRadius: '16px' }}
      >
        {/* Image Container - Responsive aspect ratio */}
        <div className="aspect-[3/2] md:aspect-[4/3] lg:aspect-square relative overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Season Badge - Compact */}
          <div 
            className="absolute top-3 right-3 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-sm"
            style={{ 
              backgroundColor: badge.bg,
              border: `2px solid ${badge.color}`
            }}
          >
            <span className="text-sm">{badge.emoji}</span>
            <span className="text-xs font-semibold" style={{ color: badge.color }}>
              {badge.text}
            </span>
          </div>
        </div>

        {/* Card Content - Compact but readable */}
        <div className="flex flex-col flex-1 p-4">
          {/* Product Name - Balanced sizing */}
          <h3 className="text-base md:text-lg lg:text-xl font-bold mb-3 line-clamp-2" style={{ color: 'var(--gray-900)' }}>
            {name}
          </h3>
          
          {/* Certifications - Compact badges */}
          {certifications.length > 0 && (
            <div className="flex items-center gap-2 mt-auto">
              {certifications.includes('ISO') && (
                <div 
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md" 
                  style={{ backgroundColor: 'var(--trust-blue-bg)' }}
                >
                  <span className="text-xs md:text-sm font-semibold" style={{ color: 'var(--trust-blue)' }}>✓ ISO</span>
                </div>
              )}
              {certifications.includes('GAP') && (
                <div 
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md" 
                  style={{ backgroundColor: 'var(--trust-blue-bg)' }}
                >
                  <span className="text-xs md:text-sm font-semibold" style={{ color: 'var(--trust-blue)' }}>✓ GAP</span>
                </div>
              )}
            </div>
          )}

          {/* View Details hint */}
          <div className="mt-3 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div 
              className="flex items-center justify-center gap-1.5 text-sm font-semibold"
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
