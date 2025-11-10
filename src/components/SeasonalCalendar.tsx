import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Check, X, Loader2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useRouter } from '../lib/router';
import { client, getImageUrl } from '../lib/sanity';
import { allProductsQuery } from '../lib/queries';

const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
] as const;

export function SeasonalCalendar() {
  const { t, language } = useLanguage();
  const { navigate } = useRouter();
  const [view, setView] = useState<'product' | 'month'>('product');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(allProductsQuery, { lang: language });
        setProducts(data || []);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[var(--citrus-orange)] mx-auto mb-4" />
          <p className="text-lg" style={{ color: 'var(--gray-600)' }}>Loading calendar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-12 text-center">
        <p className="text-lg text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </Card>
    );
  }

  if (view === 'month') {
    const monthKey = MONTH_KEYS[selectedMonth];
    const availableProducts = products.filter(p => p.availability[monthKey]);

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-3xl font-bold" style={{ color: 'var(--gray-900)' }}>
            {t.productsAvailableIn} {MONTHS[selectedMonth]}
          </h2>
          <Button
            variant="outline"
            onClick={() => setView('product')}
            className="border-[var(--citrus-orange)] text-[var(--citrus-orange)]"
          >
            {t.viewCalendar}
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {MONTHS.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(index)}
              className="px-4 py-2 rounded-lg whitespace-nowrap transition-colors"
              style={{
                backgroundColor: index === selectedMonth ? 'var(--citrus-orange)' : 'var(--gray-100)',
                color: index === selectedMonth ? 'white' : 'var(--gray-700)',
              }}
            >
              {month}
            </button>
          ))}
        </div>

        {availableProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProducts.map(product => (
              <Card key={product._id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('product-detail', { slug: product.slug?.current })}>
                <img
                  src={typeof product.image === 'string' ? product.image : getImageUrl(product.image, 400, 300) || ''}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--gray-900)' }}>
                  {product.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--gray-600)' }}>
                  {product.description?.substring(0, 100)}...
                </p>
                <Button
                  className="w-full bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('product-detail', { slug: product.slug?.current });
                  }}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
              {t.noProductsAvailable} {MONTHS[selectedMonth]}
            </p>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold" style={{ color: 'var(--gray-900)' }}>
          {t.seasonalAvailability}
        </h2>
        <Button
          variant="outline"
          onClick={() => setView('month')}
          className="border-[var(--citrus-orange)] text-[var(--citrus-orange)]"
        >
          {t.viewByMonth}
        </Button>
      </div>

      {/* Legend */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-6">
          <span className="font-semibold" style={{ color: 'var(--gray-900)' }}>{t.legend}:</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--fresh-green)' }}>
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm" style={{ color: 'var(--gray-700)' }}>{t.available}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--gray-300)' }}>
              <X className="w-4 h-4" style={{ color: 'var(--gray-500)' }} />
            </div>
            <span className="text-sm" style={{ color: 'var(--gray-700)' }}>{t.notAvailable}</span>
          </div>
        </div>
      </Card>

      {/* Calendar Table */}
      <Card className="p-6">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-max">
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gray-200)' }}>
                <th className="p-3 text-left font-semibold sticky left-0 bg-white z-10" style={{ color: 'var(--gray-900)' }}>
                  {t.product}
                </th>
                {MONTHS.map((month) => (
                  <th key={month} className="p-3 text-center font-medium min-w-[80px]" style={{ color: 'var(--gray-700)' }}>
                    <div className="hidden md:block">{month}</div>
                    <div className="md:hidden">{month.substring(0, 3)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  style={{
                    borderBottom: index < products.length - 1 ? '1px solid var(--gray-200)' : 'none',
                  }}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate('product-detail', { slug: product.slug?.current })}
                >
                  <td className="p-3 font-medium sticky left-0 bg-white z-10" style={{ color: 'var(--gray-900)' }}>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getProductEmoji(product.category)}</div>
                      <span>{product.title}</span>
                    </div>
                  </td>
                  {MONTH_KEYS.map((monthKey) => (
                    <td key={monthKey} className="p-3 text-center">
                      <div className="flex justify-center">
                        {product.availability?.[monthKey] ? (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--fresh-green)' }}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--gray-300)' }}>
                            <X className="w-4 h-4" style={{ color: 'var(--gray-500)' }} />
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
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
  };
  return emojis[category?.toLowerCase()] || '🌱';
}
