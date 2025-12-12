import { useState, useEffect, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Loader2, Calendar, LayoutGrid, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { useRouter } from '../lib/router';
import { client, getImageUrl } from '../lib/sanity';
import { allProductsQuery } from '../lib/queries';

const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
] as const;

// Stable image component to prevent flickering (iOS Safari fix)
function ProductImage({ image, title, size = 100 }: { image: any; title: string; size?: number }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageUrl = useMemo(() => {
    if (!image) return null;
    return typeof image === 'string' ? image : getImageUrl(image, size, size);
  }, [image, size]);

  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
  }, [imageUrl]);

  if (!imageUrl || error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xl bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400">
        {getProductEmoji('')}
      </div>
    );
  }

  return (
    <div
      className="w-full h-full relative"
      style={{
        // iOS Safari flickering fix
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      {!loaded && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse absolute inset-0">
          <div className="w-4 h-4 rounded-full bg-gray-200" />
        </div>
      )}
      <img
        src={imageUrl}
        alt={title || ''}
        className={`w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          // iOS Safari flickering fix
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}

// Availability Indicator - Clean circle design
function AvailabilityDot({ isAvailable, isCurrentMonth }: { isAvailable: boolean; isCurrentMonth: boolean }) {
  if (isAvailable) {
    return (
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
        ${isCurrentMonth
          ? 'bg-gradient-to-br from-[var(--citrus-orange)] to-[var(--citrus-orange-light)] shadow-lg shadow-orange-200/50 scale-110'
          : 'bg-gradient-to-br from-[var(--fresh-green)] to-[var(--fresh-green-light)]'
        }
      `}>
        <Check className="w-4 h-4 text-white" strokeWidth={3} />
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200/50" />
  );
}

export function SeasonalCalendar() {
  const { language } = useLanguage();
  const { t } = useSiteSettings(language);
  const { navigate } = useRouter();

  const [view, setView] = useState<'timeline' | 'cards'>('timeline');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection - only affects initial load
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) {
      setView('cards');
    }
  }, []);

  // Track mobile state for UI adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(allProductsQuery, { lang: language });
        setProducts(data || []);

        // Preload images
        if (data?.length > 0) {
          data.forEach((product: any) => {
            if (!product.image) return;
            const url = typeof product.image === 'string'
              ? product.image
              : getImageUrl(product.image, 100, 100);
            if (url) {
              const img = new Image();
              img.src = url;
            }
          });
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [language]);

  const MONTHS = [
    t.january, t.february, t.march, t.april, t.may, t.june,
    t.july, t.august, t.september, t.october, t.november, t.december
  ];



  // Navigation helpers for Cards view
  const goToPrevMonth = () => setSelectedMonth(prev => (prev === 0 ? 11 : prev - 1));
  const goToNextMonth = () => setSelectedMonth(prev => (prev === 11 ? 0 : prev + 1));

  const currentMonthIndex = new Date().getMonth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-gray-100 absolute inset-0" />
            <Loader2 className="w-16 h-16 animate-spin text-[var(--citrus-orange)]" />
          </div>
          <p className="text-gray-500 font-medium mt-6">{t.loadingCalendar || 'Loading calendar...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-12 text-center border-red-100 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-3xl">
          ⚠️
        </div>
        <p className="text-lg text-red-600 mb-4 font-medium">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="bg-white hover:bg-red-50 border-red-200"
        >
          {t.retry || 'Try Again'}
        </Button>
      </Card>
    );
  }

  const monthKey = MONTH_KEYS[selectedMonth];
  const availableProducts = products.filter(p => p.availability?.[monthKey]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t.seasonalAvailability || 'Seasonal Availability'}
          </h2>
          <p className="text-gray-500 text-lg">
            {language === 'ar'
              ? 'اكتشف ما هو متاح في كل موسم'
              : 'Discover what\'s fresh and available throughout the year'
            }
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl self-start lg:self-auto">
          <button
            onClick={() => setView('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${view === 'timeline'
              ? 'bg-white text-[var(--citrus-orange)] shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">{t.viewCalendar || 'Timeline'}</span>
          </button>
          <button
            onClick={() => setView('cards')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${view === 'cards'
              ? 'bg-white text-[var(--citrus-orange)] shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">{t.viewByMonth || 'By Month'}</span>
          </button>
        </div>
      </div>

      {/* Cards View */}
      {view === 'cards' ? (
        <div className="space-y-6">
          {/* Month Selector with Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevMonth}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[var(--citrus-orange)] hover:border-[var(--citrus-orange)] transition-colors shadow-sm"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {MONTHS.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(index)}
                    className={`
                      flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                      ${index === selectedMonth
                        ? 'bg-gradient-to-r from-[var(--citrus-orange)] to-[var(--citrus-orange-light)] text-white shadow-lg shadow-orange-200/50 scale-105'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-[var(--citrus-orange)]'
                      }
                    `}
                  >
                    {isMobile && language !== 'ar' ? month?.substring(0, 3) : month}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={goToNextMonth}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[var(--citrus-orange)] hover:border-[var(--citrus-orange)] transition-colors shadow-sm"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Products Count */}
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[var(--citrus-orange)] to-[var(--citrus-orange-light)]" />
            <p className="text-gray-600">
              <span className="font-bold text-gray-900">{availableProducts.length}</span>
              {' '}{availableProducts.length === 1 ? 'product' : 'products'} available in {MONTHS[selectedMonth]}
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="min-h-[300px]">
            {availableProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {availableProducts.map((product, idx) => (
                  <Card
                    key={product._id}
                    className="group border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden bg-white hover:-translate-y-1"
                    onClick={() => navigate('product-detail', { slug: product.slug?.current })}
                    style={{
                      animationDelay: `${idx * 80}ms`,
                      animation: 'fadeSlideUp 0.5s ease-out forwards',
                      opacity: 0,
                    }}
                  >
                    <div className="aspect-square w-full overflow-hidden bg-gray-50 relative">
                      {product.image ? (
                        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                          <ProductImage
                            image={product.image}
                            title={product.title || ''}
                            size={400}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-gray-50 to-gray-100">
                          {getProductEmoji(product.category)}
                        </div>
                      )}

                      {/* In Season Badge */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--citrus-orange)] shadow-sm flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--citrus-orange)] animate-pulse" />
                        In Season
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[var(--citrus-orange)] transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                        {product.description || t.noDescription || 'Premium quality produce'}
                      </p>

                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs font-medium text-[var(--citrus-orange)]">
                          {t.viewDetails || 'View Details'}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[var(--citrus-orange)]/10 text-[var(--citrus-orange)] flex items-center justify-center text-xs group-hover:bg-[var(--citrus-orange)] group-hover:text-white transition-colors">
                          →
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-4">
                  🍂
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t.noProductsAvailable || 'No products available'}
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Nothing is in season for {MONTHS[selectedMonth]}. Try selecting a different month!
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Timeline View - Redesigned with circles */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Legend */}
          <div className="px-4 py-3 border-b border-gray-100 flex flex-wrap items-center gap-6 text-sm bg-gradient-to-r from-gray-50 to-white">
            <span className="text-gray-700 font-medium">{t.legend || 'Legend'}:</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--fresh-green)] to-[var(--fresh-green-light)] flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-gray-600">{t.available || 'Available'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200" />
              <span className="text-gray-400">{t.notAvailable || 'Out of Season'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--citrus-orange)] to-[var(--citrus-orange-light)] flex items-center justify-center shadow-sm">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-[var(--citrus-orange)] font-medium">{t.currentMonth || 'Current Month'}</span>
            </div>
          </div>

          {/* Scrollable Table */}
          <div
            className="overflow-x-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th
                    className="sticky left-0 z-30 p-4 text-left font-semibold text-gray-900 bg-white border-b border-r border-gray-100 min-w-[200px] shadow-[2px_0_8px_rgba(0,0,0,0.04)]"
                    style={{ transform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    {t.product || 'Product'}
                  </th>
                  {MONTHS.map((month, idx) => (
                    <th
                      key={month}
                      className={`p-2 text-center text-[10px] font-semibold uppercase tracking-wide border-b border-gray-100 min-w-[70px] ${idx === currentMonthIndex
                        ? 'bg-[var(--citrus-orange-bg)] text-[var(--citrus-orange)]'
                        : 'text-gray-500 bg-white/50'
                        }`}
                    >
                      {/* Full month name for all languages */}
                      {month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="group hover:bg-[var(--citrus-orange-bg)]/30 transition-colors cursor-pointer border-b border-gray-50 last:border-0"
                    onClick={() => navigate('product-detail', { slug: product.slug?.current })}
                  >
                    <td
                      className="sticky left-0 z-20 p-3 bg-white group-hover:bg-[var(--citrus-orange-bg)]/30 transition-colors border-r border-gray-100 shadow-[2px_0_8px_rgba(0,0,0,0.04)]"
                      style={{ transform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 ring-1 ring-gray-200/50 flex-shrink-0">
                          {product.image ? (
                            <ProductImage
                              image={product.image}
                              title={product.title || ''}
                              size={80}
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-lg bg-gradient-to-br from-gray-50 to-gray-100">
                              {getProductEmoji(product.category)}
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-gray-800 group-hover:text-[var(--citrus-orange)] transition-colors text-sm whitespace-nowrap">
                          {product.title}
                        </span>
                      </div>
                    </td>

                    {MONTH_KEYS.map((monthKey, mIndex) => {
                      const isAvailable = product.availability?.[monthKey];
                      const isCurrentMonth = mIndex === currentMonthIndex;

                      return (
                        <td
                          key={monthKey}
                          className={`p-2 text-center h-[60px] ${isCurrentMonth ? 'bg-[var(--citrus-orange-bg)]/20' : ''
                            }`}
                        >
                          <div className="flex items-center justify-center">
                            <AvailabilityDot
                              isAvailable={!!isAvailable}
                              isCurrentMonth={isCurrentMonth && !!isAvailable}
                            />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function getProductEmoji(category: string) {
  const emojis: Record<string, string> = {
    citrus: '🍊',
    lemons: '🍋',
    vegetables: '🥬',
    berries: '🍓',
    grapes: '🍇',
    pomegranates: '🍎',
    oranges: '🍊',
    mangoes: '🥭',
  };
  return emojis[category?.toLowerCase()] || '🌱';
}
