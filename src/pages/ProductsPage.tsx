import { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Search, Filter, Loader2 } from 'lucide-react';
import { useRouter } from '../lib/router';
import { useLanguage } from '../lib/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { usePageContent } from '../hooks/usePageContent';
import { client } from '../lib/sanity';
import { allProductsQuery } from '../lib/queries';
import type { SanityDocument } from '@sanity/client';

interface SanityProduct extends SanityDocument {
  title: string;
  slug: { current: string };
  scientificName?: string;
  category: 'citrus' | 'vegetables' | 'berries' | 'lemons' | 'grapes';
  description?: string;
  season?: 'in-season' | 'coming-soon' | 'peak' | 'last-weeks';
  image: any;
  certifications?: string[];
}

export function ProductsPage() {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const { t: siteT, loading: siteLoading } = useSiteSettings(language);
  const { content: pageT, loading: pageLoading } = usePageContent('products', language);
  const { content: calendarT, loading: calendarLoading } = usePageContent('calendar', language);

  const t = { ...siteT, ...pageT, ...calendarT };
  const translationsLoading = siteLoading || pageLoading || calendarLoading;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Sanity
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await client.fetch(allProductsQuery, { lang: language });
        setProducts(data || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(t.loadFailed);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [language]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSeason = (season: string) => {
    setSelectedSeasons(prev =>
      prev.includes(season)
        ? prev.filter(s => s !== season)
        : [...prev, season]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesSeason = selectedSeasons.length === 0 || (product.season && selectedSeasons.includes(product.season));

    return matchesSearch && matchesCategory && matchesSeason;
  });

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSeasons([]);
    setSearchTerm('');
  };

  if (translationsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[var(--citrus-orange)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--citrus-orange)] to-[var(--citrus-orange-hover)] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h1 className="text-4xl font-bold text-white mb-4">{t.ourPremiumProducts}</h1>
          <p className="text-xl text-white/90">{t.freshCertifiedDelivered}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        {/* Mobile Filter Button - Fixed at top */}
        <div className="lg:hidden mb-6">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            {t.filters}
            {(selectedCategories.length > 0 || selectedSeasons.length > 0) && (
              <span className="ml-2 bg-[var(--citrus-orange)] text-white text-xs rounded-full px-2 py-0.5">
                {selectedCategories.length + selectedSeasons.length}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Filter Overlay */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setShowFilters(false)}>
            <div
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold" style={{ color: 'var(--gray-900)' }}>{t.filters}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    ✕
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                    Search
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-500)' }} />
                    <Input
                      placeholder={t.searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                    Category
                  </h3>
                  <div className="space-y-3">
                    {['citrus', 'vegetables', 'berries', 'lemons', 'grapes'].map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={category} className="capitalize cursor-pointer">
                          {getCategoryEmoji(category)} {t[category as keyof typeof t] || category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                    Availability
                  </h3>
                  <div className="space-y-3">
                    {[
                      { value: 'peak', label: `⭐ ${t.peakSeason || 'Peak Season'}` },
                      { value: 'in-season', label: `🟢 ${t.inSeason || 'In Season'}` },
                      { value: 'coming-soon', label: `🟡 ${t.seasonComingSoon || 'Coming Soon'}` },
                      { value: 'last-weeks', label: `🔔 ${t.seasonLastWeeks || 'Last Weeks'}` },
                    ].map((season) => (
                      <div key={season.value} className="flex items-center gap-2">
                        <Checkbox
                          id={season.value}
                          checked={selectedSeasons.includes(season.value)}
                          onCheckedChange={() => toggleSeason(season.value)}
                        />
                        <Label htmlFor={season.value} className="cursor-pointer">
                          {season.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </Card>

                {(selectedCategories.length > 0 || selectedSeasons.length > 0 || searchTerm) && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    {t.clearAllFilters}
                  </Button>
                )}

                {/* Apply Button for Mobile */}
                <Button
                  className="w-full bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)] text-white"
                  onClick={() => setShowFilters(false)}
                >
                  {t.applyFilters}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              <Card className="p-6">
                <h3 className="font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                  {t.search}
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-500)' }} />
                  <Input
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                  {t.category}
                </h3>
                <div className="space-y-3">
                  {['citrus', 'vegetables', 'berries', 'lemons', 'grapes'].map((category) => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox
                        id={`desktop-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={`desktop-${category}`} className="capitalize cursor-pointer">
                        {getCategoryEmoji(category)} {t[category as keyof typeof t] || category}
                      </Label>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                  {t.availability}
                </h3>
                <div className="space-y-3">
                  {[
                    { value: 'peak', label: `⭐ ${t.peakSeason || 'Peak Season'}` },
                    { value: 'in-season', label: `🟢 ${t.inSeason || 'In Season'}` },
                    { value: 'coming-soon', label: `🟡 ${t.seasonComingSoon || 'Coming Soon'}` },
                    { value: 'last-weeks', label: `🔔 ${t.seasonLastWeeks || 'Last Weeks'}` },
                  ].map((season) => (
                    <div key={season.value} className="flex items-center gap-2">
                      <Checkbox
                        id={`desktop-${season.value}`}
                        checked={selectedSeasons.includes(season.value)}
                        onCheckedChange={() => toggleSeason(season.value)}
                      />
                      <Label htmlFor={`desktop-${season.value}`} className="cursor-pointer">
                        {season.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </Card>

              {(selectedCategories.length > 0 || selectedSeasons.length > 0 || searchTerm) && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  {t.clearAllFilters}
                </Button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-[var(--citrus-orange)] mb-4" />
                <p className="text-lg" style={{ color: 'var(--gray-600)' }}>{t.loadingProductsText}</p>
              </div>
            ) : error ? (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--gray-900)' }}>
                  {t.error}
                </h3>
                <p className="mb-6" style={{ color: 'var(--gray-600)' }}>
                  {error}
                </p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  {t.retry}
                </Button>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p style={{ color: 'var(--gray-600)' }}>
                    {(t.showingProducts || 'Showing {count} of {total} products').replace('{count}', filteredProducts.length.toString()).replace('{total}', products.length.toString())}
                  </p>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <div key={product._id} onClick={() => navigate('product-detail', { slug: product.slug.current })}>
                        <ProductCard
                          name={product.title}
                          image={product.image}
                          category={product.category}
                          season={product.season || 'in-season'}
                          certifications={product.certifications}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--gray-900)' }}>
                      {t.noProductsFound}
                    </h3>
                    <p className="mb-6" style={{ color: 'var(--gray-600)' }}>
                      {t.noProductsFoundMessage}
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      {t.clearFilters}
                    </Button>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryEmoji(category: string) {
  const emojis: Record<string, string> = {
    citrus: '🍊',
    vegetables: '🥬',
    berries: '🍓',
    lemons: '🍋',
    grapes: '🍇',
  };
  return emojis[category] || '🌱';
}
