import { ImageWithFallback } from './figma/ImageWithFallback';
import { getImageUrl } from '../lib/sanity';
import { useLanguage } from '../lib/LanguageContext';
import { translations } from '../lib/translations';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface ProductCardProps {
  name: string;
  image: SanityImageSource | string;
  category: 'citrus' | 'vegetables' | 'berries' | 'lemons' | 'grapes';
  season: 'in-season' | 'coming-soon' | 'peak' | 'last-weeks';
  certifications?: string[];
}

const categoryColors: Record<string, { bg: string; chip: string }> = {
  citrus: { bg: 'var(--citrus-orange)', chip: 'rgba(255, 140, 66, 0.12)' },
  vegetables: { bg: 'var(--fresh-green)', chip: 'rgba(76, 175, 80, 0.12)' },
  berries: { bg: 'var(--berry-red)', chip: 'rgba(229, 57, 53, 0.12)' },
  lemons: { bg: 'var(--lemon-yellow)', chip: 'rgba(253, 216, 53, 0.18)' },
  grapes: { bg: 'var(--grape-purple)', chip: 'rgba(142, 36, 170, 0.12)' },
};

const defaultColors = { bg: 'var(--gray-500)', chip: 'rgba(107, 114, 128, 0.12)' };

export function ProductCard({ name, image, category, season, certifications = [] }: ProductCardProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const seasonBadges = {
    'in-season': { emoji: '🟢', text: t.seasonInSeason, bg: 'var(--fresh-green-bg)', color: 'var(--fresh-green)' },
    'peak': { emoji: '⭐', text: t.seasonPeak, bg: 'var(--citrus-orange-bg)', color: 'var(--citrus-orange)' },
    'coming-soon': { emoji: '🟡', text: t.seasonComingSoon, bg: 'var(--lemon-yellow-bg)', color: '#C9A000' },
    'last-weeks': { emoji: '🔔', text: t.seasonLastWeeks, bg: 'var(--berry-red-bg)', color: 'var(--berry-red)' },
  };

  const badge = seasonBadges[season] || seasonBadges['in-season'];
  const colors = categoryColors[category] || defaultColors;
  const uniqueCertifications = Array.from(new Set(certifications.filter(Boolean)));

  // Get optimized image URL from Sanity or use as-is if it's a string URL
  const imageUrl = typeof image === 'string'
    ? image
    : getImageUrl(image, 800, 600) || '';

  return (
    <div className="group cursor-pointer h-full">
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        {/* Image Container */}
        <div className="relative aspect-[3/2] sm:aspect-[4/3] lg:aspect-square overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/25"
            style={{ pointerEvents: 'none' }}
          />

          {/* Season Badge */}
          <div
            className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur"
            style={{ color: badge.color }}
          >
            <span>{badge.emoji}</span>
            <span>{badge.text}</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
          <div className="space-y-2">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ backgroundColor: colors.chip, color: colors.bg }}
            >
              {t[category.toLowerCase() as keyof typeof t] as string || category}
            </span>

            <h3 className="text-base font-semibold leading-tight text-gray-900 transition-colors group-hover:text-gray-800 sm:text-lg">
              {name}
            </h3>
          </div>

          {uniqueCertifications.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs font-medium text-[var(--trust-blue)]">
              {uniqueCertifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--trust-blue-bg)] px-2.5 py-1"
                >
                  <span>✓</span>
                  <span>{cert}</span>
                </span>
              ))}
            </div>
          )}

          <span
            className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[var(--gray-700)] transition-colors group-hover:text-[var(--gray-900)]"
          >
            {t.viewDetails}
            <span className="rtl:rotate-180" style={{ color: colors.bg }}>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
