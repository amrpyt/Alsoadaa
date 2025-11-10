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
  const { language, t } = useLanguage();
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
        setError('Failed to load products. Please try again later.');
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
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            {/* Mobile Filter Toggle */}
            <Button
              className="lg:hidden w-full mb-4"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card className="p-6">
                <h3 className="font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                  Search
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-500)' }} />
                  <Input
                    placeholder="Search products..."
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
                        {getCategoryEmoji(category)} {category}
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
                    { value: 'peak', label: '⭐ Peak Season' },
                    { value: 'in-season', label: '🟢 In Season' },
                    { value: 'coming-soon', label: '🟡 Coming Soon' },
                    { value: 'last-weeks', label: '🔔 Last Weeks' },
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
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3 mt-6 lg:mt-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-[var(--citrus-orange)] mb-4" />
                <p className="text-lg" style={{ color: 'var(--gray-600)' }}>Loading products...</p>
              </div>
            ) : error ? (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--gray-900)' }}>
                  Error Loading Products
                </h3>
                <p className="mb-6" style={{ color: 'var(--gray-600)' }}>
                  {error}
                </p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Retry
                </Button>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p style={{ color: 'var(--gray-600)' }}>
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      No products found
                    </h3>
                    <p className="mb-6" style={{ color: 'var(--gray-600)' }}>
                      Try adjusting your filters or search term
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear Filters
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
