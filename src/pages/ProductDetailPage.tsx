import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ChevronLeft, Check, Package, Truck, Thermometer, Calendar, Loader2 } from 'lucide-react';
import { useRouter } from '../lib/router';
import { ProductCard } from '../components/ProductCard';
import { useLanguage } from '../lib/LanguageContext';
import { client, getImageUrl } from '../lib/sanity';
import { productBySlugQuery, productsByCategoryQuery, findProductTranslationQuery } from '../lib/queries';

const MONTH_KEYS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] as const;

export function ProductDetailPage() {
  const { navigate, params } = useRouter();
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log('🔍 ProductDetailPage: Starting fetch', { slug: params?.slug, language });

      if (!params?.slug) {
        console.log('❌ No slug provided');
        return;
      }

      setLoading(true);

      try {
        setError(null);

        console.log('📡 Fetching product data...');
        const productData = await client.fetch(productBySlugQuery, {
          slug: params.slug,
          lang: language
        });



        if (!productData) {
          console.log('⚠️ Product not found in current language, checking for translations...');
          const translationData = await client.fetch(findProductTranslationQuery, {
            slug: params.slug,
            targetLang: language
          });

          if (translationData?.target) {
            console.log('🔄 Found translation, redirecting to:', translationData.target);
            navigate('product-detail', { slug: translationData.target });
            return;
          }
        }

        setProduct(productData);

        if (productData) {
          console.log('📡 Fetching related products...');
          const relatedData = await client.fetch(productsByCategoryQuery, {
            category: productData.category,
            lang: language
          });
          console.log('✅ Related products received:', relatedData?.length);
          const filtered = relatedData?.filter((p: any) => p._id !== productData._id) || [];
          setRelatedProducts(filtered.slice(0, 3));
        }
      } catch (err) {
        console.error('❌ Failed to fetch product:', err);
        setError('Failed to load product details.');
      } finally {
        console.log('✅ Loading complete');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params?.slug, language]);

  // Update SEO Title
  useEffect(() => {
    if (product) {
      document.title = product.seo?.metaTitle || `${product.title} | Al Soadaa`;
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[var(--citrus-orange)] mx-auto mb-4" />
          <p className="text-lg" style={{ color: 'var(--gray-600)' }}>{t.loadingProduct}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-4">{t.error}</h2>
          <p className="mb-6" style={{ color: 'var(--gray-600)' }}>{error || t.loadFailed}</p>
          <Button onClick={() => navigate('products')}>{t.backToProducts}</Button>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-4">{t.productNotFound}</h2>
          <p className="mb-6" style={{ color: 'var(--gray-600)' }}>{t.productNotFoundMessage}</p>
          <Button onClick={() => navigate('products')}>{t.backToProducts}</Button>
        </Card>
      </div>
    );
  }

  // Safe checks before rendering
  if (!product.title || !product.image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">{t.invalidProductData}</h2>
          <p className="mb-6" style={{ color: 'var(--gray-600)' }}>{t.invalidProductDataMessage}</p>
          <Button onClick={() => navigate('products')}>{t.backToProducts}</Button>
        </Card>
      </div>
    );
  }

  let currentMonth, gallery;

  try {
    currentMonth = new Date().getMonth();
    gallery = (product.gallery && Array.isArray(product.gallery) && product.gallery.length > 0)
      ? product.gallery
      : [product.image];
    console.log('🎨 Ready to render product:', { title: product.title, galleryCount: gallery.length });
  } catch (err) {
    console.error('❌ Error preparing data:', err);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">{t.errorPreparingData}</h2>
          <p className="mb-6" style={{ color: 'var(--gray-600)' }}>{t.errorPreparingDataMessage}</p>
          <Button onClick={() => navigate('products')}>{t.backToProducts}</Button>
        </Card>
      </div>
    );
  }

  console.log('🚀 Starting render...');

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--gray-600)' }}>
            <button onClick={() => navigate('home')} className="hover:text-[var(--citrus-orange)]">{t.home}</button>
            <span>/</span>
            <button onClick={() => navigate('products')} className="hover:text-[var(--citrus-orange)]">{t.products}</button>
            <span>/</span>
            <span style={{ color: 'var(--gray-900)' }}>{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <Button variant="ghost" onClick={() => navigate('products')} className="mb-6">
          <ChevronLeft className="w-4 h-4 mr-2" />{t.backToProducts}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
              <img
                src={typeof gallery[selectedImage] === 'string' ? gallery[selectedImage] : getImageUrl(gallery[selectedImage], 800, 800) || ''}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((img: any, index: number) => (
                  <button key={index} onClick={() => setSelectedImage(index)} className="aspect-square rounded-lg overflow-hidden border-2 transition-all" style={{ borderColor: selectedImage === index ? 'var(--citrus-orange)' : 'var(--gray-300)' }}>
                    <img src={typeof img === 'string' ? img : getImageUrl(img, 200, 200) || ''} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="text-sm px-3 py-1" style={{ backgroundColor: getCategoryColor(product.category), color: 'white' }}>
                {getCategoryEmoji(product.category)} {t[product.category.toLowerCase() as keyof typeof t] || product.category}
              </Badge>
              {product.season && (
                <Badge variant="secondary" className="text-sm px-3 py-1" style={{ backgroundColor: getSeasonColor(product.season), color: product.season === 'coming-soon' ? 'var(--gray-900)' : 'white' }}>
                  {getSeasonText(product.season, t)}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>{product.title}</h1>
            <p className="text-lg italic mb-6" style={{ color: 'var(--gray-600)' }}>{product.scientificName}</p>

            <div className="flex items-center gap-4 mb-6">
              {product.certifications?.map((cert: string) => (
                <div key={cert} className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: 'var(--trust-blue)' }} />
                  <span className="font-medium" style={{ color: 'var(--trust-blue)' }}>{cert} {t.certified}</span>
                </div>
              ))}
            </div>

            <p className="text-lg mb-8" style={{ color: 'var(--gray-700)' }}>{product.description}</p>

            <div className="flex gap-4 mb-8">
              <Button size="lg" className="flex-1 bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)]" onClick={() => navigate('contact')}>{t.requestQuote}</Button>
              <Button size="lg" variant="outline" className="flex-1 border-[var(--citrus-orange)] text-[var(--citrus-orange)]" onClick={() => navigate('contact')}>{t.scheduleCallback}</Button>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>{t.quickInformation}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4" style={{ color: 'var(--citrus-orange)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>{t.packaging}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>{product.specifications?.packaging?.[0] || t.variousOptions}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-4 h-4" style={{ color: 'var(--citrus-orange)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>{t.storage}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>{product.specifications?.storage || t.coldStorage}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" style={{ color: 'var(--citrus-orange)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>{t.shelfLife}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>{product.specifications?.shelfLife || t.contactForDetails}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4" style={{ color: 'var(--citrus-orange)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>{t.deliveryLabel}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>{t.deliveryTimelineDesc}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="specifications" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
            <TabsTrigger value="specifications">{t.specifications}</TabsTrigger>
            <TabsTrigger value="availability">{t.availability}</TabsTrigger>
            <TabsTrigger value="shipping">{t.shipping}</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>{t.productSpecifications}</h3>
              {product.specifications?.sizes && Array.isArray(product.specifications.sizes) && product.specifications.sizes.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--gray-700)' }}>{t.availableSizes}</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.specifications.sizes.map((size: string) => <Badge key={size} variant="outline">{size}</Badge>)}
                  </div>
                </div>
              )}
              {product.specifications?.packaging && Array.isArray(product.specifications.packaging) && product.specifications.packaging.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--gray-700)' }}>{t.packagingOptions}</h4>
                  <ul className="space-y-2">
                    {product.specifications.packaging.map((pkg: string) => (
                      <li key={pkg} className="flex items-center gap-2">
                        <Check className="w-4 h-4" style={{ color: 'var(--fresh-green)' }} />
                        <span style={{ color: 'var(--gray-700)' }}>{pkg}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>{t.seasonalAvailability}</h3>
              <div className="flex gap-1 mb-6">
                {MONTH_KEYS.map((key, index) => (
                  <div key={key} className="flex-1 h-16 flex flex-col items-center justify-center rounded text-xs font-medium" style={{ backgroundColor: product.availability?.[key] ? 'var(--fresh-green)' : 'var(--gray-200)', color: product.availability?.[key] ? 'white' : 'var(--gray-500)', outline: index === currentMonth ? '2px solid var(--trust-blue)' : 'none', outlineOffset: '2px' }}>
                    <span>{t[key].slice(0, 3)}</span>
                    {product.availability?.[key] && <Check className="w-3 h-3 mt-1" />}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>{t.shippingAndStorage}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--gray-700)' }}>{t.storageRequirements}</h4>
                  <p style={{ color: 'var(--gray-600)' }}>{product.specifications?.storage || t.storageRequirementsDesc}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--gray-700)' }}>{t.deliveryTimeline}</h4>
                  <p style={{ color: 'var(--gray-600)' }}>{t.deliveryTimelineDesc}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--gray-900)' }}>{t.relatedProducts}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <div key={rp._id} onClick={() => navigate('product-detail', { slug: rp.slug.current })}>
                  <ProductCard name={rp.title} image={rp.image} category={rp.category} season={rp.season || 'in-season'} certifications={rp.certifications} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryEmoji(c?: string): string {
  if (!c) return '🌱';
  const e: Record<string, string> = { citrus: '🍊', vegetables: '🥬', berries: '🍓', lemons: '🍋', grapes: '🍇' };
  return e[c.toLowerCase()] || '🌱';
}

function getCategoryColor(c?: string): string {
  if (!c) return 'var(--gray-500)';
  const col: Record<string, string> = { citrus: 'var(--citrus-orange)', vegetables: 'var(--fresh-green)', berries: 'var(--berry-red)', lemons: 'var(--lemon-yellow)', grapes: 'var(--grape-purple)' };
  return col[c.toLowerCase()] || 'var(--gray-500)';
}

function getSeasonColor(s?: string): string {
  if (!s) return 'var(--gray-500)';
  const col: Record<string, string> = { peak: 'var(--citrus-orange)', 'in-season': 'var(--fresh-green)', 'coming-soon': 'var(--lemon-yellow)', 'last-weeks': 'var(--berry-red)' };
  return col[s] || 'var(--gray-500)';
}

function getSeasonText(s: string | undefined, t: any): string {
  if (!s) return t.inSeason;
  const map: Record<string, string> = { peak: `⭐ ${t.peakSeason}`, 'in-season': `🟢 ${t.inSeason}`, 'coming-soon': `🟡 ${t.seasonComingSoon}`, 'last-weeks': `🔔 ${t.seasonLastWeeks}` };
  return map[s] || s;
}
