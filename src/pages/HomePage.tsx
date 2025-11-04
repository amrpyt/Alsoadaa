import { useState, useEffect, useRef } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Award, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Globe, 
  ShieldCheck,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { products, testimonials } from '../lib/mockData';
import { useRouter } from '../lib/router';
import { useLanguage } from '../lib/LanguageContext';

export function HomePage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrollRotation, setScrollRotation] = useState(0);
  const citrusRef = useRef<HTMLDivElement>(null);

  // Featured products: Navel Orange, Grapefruit, Pomegranates, Fresh Grapes
  const featuredProducts = [
    products[0], // Navel Orange
    products[6], // Grapefruit
    products[1], // Pomegranates
    products[2], // Fresh Grapes
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (citrusRef.current) {
        const rect = citrusRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate scroll progress when element is in viewport (0 to 1)
        // Start at 20% when element enters viewport, reach 0% when fully scrolled
        const scrollProgress = Math.max(0, Math.min(1, 
          1 - ((elementTop - windowHeight * 0.2) / (windowHeight * 0.8))
        ));
        
        // Calculate percentage movement (20% to 0%)
        const movePercent = 20 * (1 - scrollProgress);
        setScrollRotation(movePercent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.MOV" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="text-lg px-8 py-6 bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)] text-white"
              onClick={() => navigate('contact')}
            >
              {t.requestQuote}
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              onClick={() => navigate('products')}
            >
              {t.viewProducts}
            </Button>
          </div>
        </div>
      </section>

      {/* Citrus Showcase */}
      <section ref={citrusRef} className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div 
            className="flex items-center justify-center gap-6 md:gap-8"
            style={{
              willChange: 'transform',
              transform: `translate3d(0px, ${scrollRotation * 0.6}%, 0px)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.05s ease-out'
            }}
          >
            {/* Left Orange - Moves right (away from center) */}
            <div 
              className="w-[180px] md:w-[280px] flex-shrink-0"
              style={{
                willChange: 'transform',
                transform: `translate3d(${scrollRotation}%, 0px, 0px)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.05s ease-out'
              }}
            >
              <img 
                src="/orange.png" 
                alt="Fresh Orange" 
                className="w-full h-auto"
                style={{
                  willChange: 'transform',
                  transform: `translate3d(0px, ${scrollRotation * 0.2}%, 0px)`,
                  transformStyle: 'preserve-3d'
                }}
              />
            </div>
            {/* Center Lime - Stays in place */}
            <div className="w-[180px] md:w-[280px] flex-shrink-0">
              <img 
                src="/lime.png" 
                alt="Fresh Lime" 
                className="w-full h-auto"
              />
            </div>
            {/* Right Lemon - Moves left (away from center) */}
            <div 
              className="w-[180px] md:w-[280px] flex-shrink-0"
              style={{
                willChange: 'transform',
                transform: `translate3d(-${scrollRotation}%, 0px, 0px)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.05s ease-out'
              }}
            >
              <img 
                src="/lemon.png" 
                alt="Fresh Lemon" 
                className="w-full h-auto"
                style={{
                  willChange: 'transform',
                  transform: `translate3d(0px, ${scrollRotation * 0.2}%, 0px)`,
                  transformStyle: 'preserve-3d'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Strip */}
      <section className="py-12 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--citrus-orange)' }} />
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--gray-900)' }}>15+</div>
              <div className="text-sm" style={{ color: 'var(--gray-600)' }}>{t.yearsExporting}</div>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--citrus-orange)' }} />
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--gray-900)' }}>50+</div>
              <div className="text-sm" style={{ color: 'var(--gray-600)' }}>{t.countriesServed}</div>
            </div>
            <div className="text-center">
              <ShieldCheck className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--citrus-orange)' }} />
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--gray-900)' }}>100%</div>
              <div className="text-sm" style={{ color: 'var(--gray-600)' }}>{t.certified}</div>
            </div>
            <div className="text-center">
              <Truck className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--citrus-orange)' }} />
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--gray-900)' }}>1000+</div>
              <div className="text-sm" style={{ color: 'var(--gray-600)' }}>{t.containersPerYear}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              {t.ourPremiumProducts}
            </h2>
            <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
              {t.freshCertifiedDelivered}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id} onClick={() => navigate('product-detail', { slug: product.slug })}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="border-[var(--citrus-orange)] text-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-bg)]"
              onClick={() => navigate('products')}
            >
              {t.viewAllProducts}
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              {t.whyChooseUs}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-white border-none shadow-md">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--trust-blue-bg)' }}>
                <Award className="w-8 h-8" style={{ color: 'var(--trust-blue)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.qualityCertified}
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                {t.qualityCertifiedDesc}
              </p>
            </Card>

            <Card className="p-8 text-center bg-white border-none shadow-md">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--fresh-green-bg)' }}>
                <Truck className="w-8 h-8" style={{ color: 'var(--fresh-green)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.reliableDelivery}
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                {t.reliableDeliveryDesc}
              </p>
            </Card>

            <Card className="p-8 text-center bg-white border-none shadow-md">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--citrus-orange)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.freshGuarantee}
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                {t.freshGuaranteeDesc}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Seasonal Calendar Preview */}
      <section id="calendar" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              {t.seasonalAvailability}
            </h2>
            <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
              {t.planAheadCalendar}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-white border-none shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold" style={{ color: 'var(--gray-900)' }}>
                  October 2025
                </h3>
                <Calendar className="w-6 h-6" style={{ color: 'var(--citrus-orange)' }} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
                  <div className="text-2xl mb-2">🍊</div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>Oranges</div>
                  <div className="text-xs flex items-center gap-1">
                    <span>⭐</span>
                    <span style={{ color: 'var(--citrus-orange)' }}>{t.peakSeason}</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--grape-purple-bg)' }}>
                  <div className="text-2xl mb-2">🍇</div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>Grapes</div>
                  <div className="text-xs flex items-center gap-1">
                    <span>🟢</span>
                    <span style={{ color: 'var(--fresh-green)' }}>{t.inSeason}</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--berry-red-bg)' }}>
                  <div className="text-2xl mb-2">🍓</div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>Pomegranates</div>
                  <div className="text-xs flex items-center gap-1">
                    <span>🟢</span>
                    <span style={{ color: 'var(--fresh-green)' }}>{t.inSeason}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  variant="outline"
                  className="border-[var(--citrus-orange)] text-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-bg)]"
                  onClick={() => navigate('calendar')}
                >
                  {t.viewFullCalendar}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              {t.whatClientsSay}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12 bg-white border-none shadow-lg relative">
              <div className="text-6xl mb-6" style={{ color: 'var(--citrus-orange)', opacity: 0.2 }}>
                "
              </div>
              
              <p className="text-xl mb-8 italic" style={{ color: 'var(--gray-700)' }}>
                {testimonials[currentTestimonial].quote}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    {testimonials[currentTestimonial].company} • {testimonials[currentTestimonial].country}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'var(--gray-200)' }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className="w-2 h-2 rounded-full transition-all"
                      style={{
                        backgroundColor: index === currentTestimonial ? 'var(--citrus-orange)' : 'var(--gray-300)',
                      }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'var(--gray-200)' }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, var(--citrus-orange) 0%, var(--citrus-orange-hover) 100%)',
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.readyToImport}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t.getCustomizedQuote}
          </p>
          <Button 
            size="lg"
            className="text-lg px-8 py-6 bg-white hover:bg-gray-100"
            style={{ color: 'var(--citrus-orange)' }}
            onClick={() => navigate('contact')}
          >
            {t.getYourQuoteToday}
          </Button>
        </div>
      </section>
    </div>
  );
}
