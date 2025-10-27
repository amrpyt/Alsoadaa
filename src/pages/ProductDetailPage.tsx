import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ChevronLeft, Check, Package, Truck, Thermometer, Calendar } from 'lucide-react';
import { products } from '../lib/mockData';
import { useRouter } from '../lib/router';
import { ProductCard } from '../components/ProductCard';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
] as const;

export function ProductDetailPage() {
  const { navigate, params } = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('products')}>
            Back to Products
          </Button>
        </Card>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const currentMonth = new Date().getMonth();

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--gray-600)' }}>
            <button onClick={() => navigate('home')} className="hover:text-[var(--citrus-orange)]">Home</button>
            <span>/</span>
            <button onClick={() => navigate('products')} className="hover:text-[var(--citrus-orange)]">Products</button>
            <span>/</span>
            <span style={{ color: 'var(--gray-900)' }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('products')}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
              <img
                src={product.gallery[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className="aspect-square rounded-lg overflow-hidden border-2 transition-all"
                    style={{
                      borderColor: selectedImage === index ? 'var(--citrus-orange)' : 'var(--gray-300)',
                    }}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant="secondary"
                className="text-sm px-3 py-1"
                style={{
                  backgroundColor: getCategoryColor(product.category),
                  color: 'white',
                }}
              >
                {getCategoryEmoji(product.category)} {product.category}
              </Badge>
              <Badge
                variant="secondary"
                className="text-sm px-3 py-1"
                style={{
                  backgroundColor: getSeasonColor(product.season),
                  color: product.season === 'coming-soon' ? 'var(--gray-900)' : 'white',
                }}
              >
                {getSeasonText(product.season)}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
              {product.name}
            </h1>
            
            <p className="text-lg italic mb-6" style={{ color: 'var(--gray-600)' }}>
              {product.scientificName}
            </p>

            <div className="flex items-center gap-4 mb-6">
              {product.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <Check className="w-4 h-4" style={{ color: 'var(--trust-blue)' }} />
                  <span className="font-medium" style={{ color: 'var(--trust-blue)' }}>
                    {cert} Certified
                  </span>
                </div>
              ))}
            </div>

            <p className="text-lg mb-8" style={{ color: 'var(--gray-700)' }}>
              {product.description}
            </p>

            <div className="flex gap-4 mb-8">
              <Button
                size="lg"
                className="flex-1 bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)]"
                onClick={() => navigate('contact')}
              >
                Request Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-[var(--citrus-orange)] text-[var(--citrus-orange)]"
                onClick={() => navigate('contact')}
              >
                Schedule Callback
              </Button>
            </div>

            {/* Quick Specs */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                Quick Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4" style={{ color: 'var(--citrus-orange)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>Packaging</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    {product.specifications.packaging[0]}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-4 h-4" style={{ color: 'var(--citrus-orange)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>Storage</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    {product.specifications.storage}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" style={{ color: 'var(--citrus-orange)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>Shelf Life</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    {product.specifications.shelfLife}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4" style={{ color: 'var(--citrus-orange)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>Delivery</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    48 hours to port
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="specifications" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="availability">Seasonal Availability</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Storage</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                Product Specifications
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--gray-700)' }}>
                    Available Sizes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.specifications.sizes.map((size) => (
                      <Badge key={size} variant="outline">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--gray-700)' }}>
                    Packaging Options
                  </h4>
                  <ul className="space-y-2">
                    {product.specifications.packaging.map((pkg) => (
                      <li key={pkg} className="flex items-center gap-2">
                        <Check className="w-4 h-4" style={{ color: 'var(--fresh-green)' }} />
                        <span style={{ color: 'var(--gray-700)' }}>{pkg}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                Seasonal Availability Timeline
              </h3>
              
              <div className="flex gap-1 mb-6">
                {MONTHS.map((month, index) => (
                  <div
                    key={month}
                    className="flex-1 h-16 flex flex-col items-center justify-center rounded text-xs font-medium transition-all"
                    style={{
                      backgroundColor: product.availability[MONTH_KEYS[index]]
                        ? 'var(--fresh-green)'
                        : 'var(--gray-200)',
                      color: product.availability[MONTH_KEYS[index]]
                        ? 'white'
                        : 'var(--gray-500)',
                      outline: index === currentMonth ? '2px solid var(--trust-blue)' : 'none',
                      outlineOffset: '2px',
                    }}
                  >
                    <span>{month}</span>
                    {product.availability[MONTH_KEYS[index]] && (
                      <Check className="w-3 h-3 mt-1" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--fresh-green)' }} />
                  <span style={{ color: 'var(--gray-700)' }}>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--gray-200)' }} />
                  <span style={{ color: 'var(--gray-700)' }}>Not Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border-2" style={{ borderColor: 'var(--trust-blue)' }} />
                  <span style={{ color: 'var(--gray-700)' }}>Current Month</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                Shipping & Storage Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--gray-700)' }}>
                    Storage Requirements
                  </h4>
                  <p style={{ color: 'var(--gray-600)' }}>
                    {product.specifications.storage}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--gray-700)' }}>
                    Shelf Life
                  </h4>
                  <p style={{ color: 'var(--gray-600)' }}>
                    {product.specifications.shelfLife}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--gray-700)' }}>
                    Delivery Timeline
                  </h4>
                  <p style={{ color: 'var(--gray-600)' }}>
                    Fresh harvest to export in 48 hours. Cold chain management ensures peak freshness throughout transport.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--gray-700)' }}>
                    Quality Assurance
                  </h4>
                  <p style={{ color: 'var(--gray-600)' }}>
                    All products undergo rigorous quality checks and are ISO 9001 and Global G.A.P certified.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--gray-900)' }}>
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} onClick={() => navigate('product-detail', { slug: relatedProduct.slug })}>
                  <ProductCard {...relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        )}
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

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    citrus: 'var(--citrus-orange)',
    vegetables: 'var(--fresh-green)',
    berries: 'var(--berry-red)',
    lemons: 'var(--lemon-yellow)',
    grapes: 'var(--grape-purple)',
  };
  return colors[category] || 'var(--gray-500)';
}

function getSeasonColor(season: string) {
  const colors: Record<string, string> = {
    'peak': 'var(--citrus-orange)',
    'in-season': 'var(--fresh-green)',
    'coming-soon': 'var(--lemon-yellow)',
    'last-weeks': 'var(--berry-red)',
  };
  return colors[season] || 'var(--gray-500)';
}

function getSeasonText(season: string) {
  const texts: Record<string, string> = {
    'peak': '⭐ Peak Season',
    'in-season': '🟢 In Season',
    'coming-soon': '🟡 Coming Soon',
    'last-weeks': '🔔 Last Weeks',
  };
  return texts[season] || season;
}
