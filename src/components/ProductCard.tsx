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
    <div className="group cursor-pointer">
      <div 
        className="relative overflow-hidden bg-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
        style={{ borderRadius: '16px' }}
      >
        {/* Image */}
        <div className="aspect-video relative overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Gradient overlay on bottom for text readability */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Season Badge - Top Right */}
          <div 
            className="absolute top-3 right-3 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md"
            style={{ 
              backgroundColor: badge.bg,
              border: `2px solid ${badge.color}`
            }}
          >
            <span className="text-sm">{badge.emoji}</span>
            <span className="text-xs font-medium" style={{ color: badge.color }}>
              {badge.text}
            </span>
          </div>
          
          {/* Product Name - Bottom Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
          </div>
        </div>

        {/* Certifications - Bottom of card */}
        {certifications.length > 0 && (
          <div className="px-4 py-3 flex items-center gap-3">
            {certifications.includes('ISO') && (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium" style={{ color: 'var(--trust-blue)' }}>✓ ISO</span>
              </div>
            )}
            {certifications.includes('GAP') && (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium" style={{ color: 'var(--trust-blue)' }}>✓ GAP</span>
              </div>
            )}
          </div>
        )}

        {/* Hover: View Details */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div 
            className="px-6 py-2 rounded-lg font-medium text-white"
            style={{ backgroundColor: colors.bg }}
          >
            View Details
          </div>
        </div>
      </div>
    </div>
  );
}
