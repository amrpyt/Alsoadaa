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
  ChevronRight,
  Loader2
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../components/ui/carousel";
import { useRouter } from '../lib/router';
import { useLanguage } from '../lib/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { usePageContent } from '../hooks/usePageContent';
import { client } from '../lib/sanity';
import { allProductsQuery } from '../lib/queries';
import { FadeIn } from '../components/FadeIn';

export function HomePage() {
  const { navigate } = useRouter();
  const { language, dir } = useLanguage();
  const { t: siteT, loading: siteLoading } = useSiteSettings(language);
  const { content: pageT, loading: pageLoading } = usePageContent('/', language);
  const { content: calendarT, loading: calendarLoading } = usePageContent('calendar', language);

  // All hooks MUST be called before any conditional returns
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrollRotation, setScrollRotation] = useState(0);
  const citrusRef = useRef<HTMLDivElement>(null);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(allProductsQuery, { lang: language });
        setFeaturedProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      if (citrusRef.current) {
        const rect = citrusRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;

        const scrollProgress = Math.max(0, Math.min(1,
          1 - ((elementTop - windowHeight * 0.2) / (windowHeight * 0.8))
        ));

        const movePercent = 20 * (1 - scrollProgress);
        setScrollRotation(movePercent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Merge translations
  const t = { ...siteT, ...pageT, ...calendarT };
  const loading = siteLoading || pageLoading || calendarLoading;

  // Now we can do conditional returns AFTER all hooks
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const testimonials = [
    {
      quote: t.testimonial1Quote,
      author: t.testimonial1Author,
      company: t.testimonial1Company,
      country: t.testimonial1Country,
    },
    {
      quote: t.testimonial2Quote,
      author: t.testimonial2Author,
      company: t.testimonial2Company,
      country: t.testimonial2Country,
    },
    {
      quote: t.testimonial3Quote,
      author: t.testimonial3Author,
      company: t.testimonial3Company,
      country: t.testimonial3Country,
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
            <div className="w-[180px] md:w-[280px] flex-shrink-0">
              <img
                src="/lime.png"
                alt="Fresh Lime"
                className="w-full h-auto"
              />
            </div>
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
          <FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                <Clock className="w-12 h-12 mx-auto mb-3 transition-transform group-hover:scale-110" style={{ color: 'var(--citrus-orange)' }} />
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--gray-900)' }}>15+</div>
                <div className="text-sm" style={{ color: 'var(--gray-600)' }}>{t.yearsExporting}</div>
              </div>
              <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                <Globe className="w-12 h-12 mx-auto mb-3 transition-transform group-hover:scale-110" style={{ color: 'var(--citrus-orange)' }} />
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--gray-900)' }}>50+</div>
                <div className="text-sm" style={{ color: 'var(--gray-600)' }}>{t.countriesServed}</div>
              </div>
              <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                <ShieldCheck className="w-12 h-12 mx-auto mb-3 transition-transform group-hover:scale-110" style={{ color: 'var(--citrus-orange)' }} />
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--gray-900)' }}>100%</div>
                <div className="text-sm" style={{ color: 'var(--gray-600)' }}>{t.certified}</div>
              </div>
              <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                <Truck className="w-12 h-12 mx-auto mb-3 transition-transform group-hover:scale-110" style={{ color: 'var(--citrus-orange)' }} />
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--gray-900)' }}>1000+</div>
                <div className="text-sm" style={{ color: 'var(--gray-600)' }}>{t.containersPerYear}</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                {t.ourPremiumProducts}
              </h2>
              <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
                {t.freshCertifiedDelivered}
              </p>
            </div>
          </FadeIn>

          {productsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--citrus-orange)]" />
            </div>
          ) : (
            <div className="relative px-4 md:px-12">
              <FadeIn delay={200}>
                <Carousel
                  setApi={setApi}
                  opts={{
                    align: "start",
                    loop: true,
                    direction: dir,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {featuredProducts.map((product) => (
                      <CarouselItem key={product._id || product.id} className="pl-4 basis-[75%] md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <div className="h-full cursor-pointer" onClick={() => navigate('product-detail', { slug: product.slug.current || product.slug })}>
                          <ProductCard
                            name={product.title || product.name}
                            image={product.image}
                            category={product.category}
                            season={product.season}
                            certifications={product.certifications}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex -left-12 rtl:-left-auto rtl:-right-12 border-[var(--citrus-orange)] text-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-bg)] hover:text-[var(--citrus-orange)]" />
                  <CarouselNext className="hidden md:flex -right-12 rtl:-right-auto rtl:-left-12 border-[var(--citrus-orange)] text-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-bg)] hover:text-[var(--citrus-orange)]" />
                </Carousel>
                <div className="py-2 text-center text-sm text-muted-foreground md:hidden">
                  <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: count }).map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${index + 1 === current ? "bg-[var(--citrus-orange)] w-8" : "bg-gray-400 w-2"
                          }`}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-3 text-xs font-medium text-[var(--citrus-orange)] opacity-80 animate-pulse">
                    <span>{t.swipeToExplore}</span>
                    <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                  </div>
                </div>
              </FadeIn>
            </div>
          )}

          <FadeIn delay={400}>
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-[var(--citrus-orange)] text-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-bg)] transition-all duration-300 hover:scale-105"
                onClick={() => navigate('products')}
              >
                {t.viewAllProducts}
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                {t.whyChooseUs}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={100} className="h-full">
              <Card className="p-8 text-center bg-white border-none shadow-md h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transform transition-transform group-hover:scale-110" style={{ backgroundColor: 'var(--trust-blue-bg)' }}>
                  <Award className="w-8 h-8" style={{ color: 'var(--trust-blue)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                  {t.qualityCertified}
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  {t.qualityCertifiedDesc}
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={200} className="h-full">
              <Card className="p-8 text-center bg-white border-none shadow-md h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transform transition-transform group-hover:scale-110" style={{ backgroundColor: 'var(--fresh-green-bg)' }}>
                  <Truck className="w-8 h-8" style={{ color: 'var(--fresh-green)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                  {t.reliableDelivery}
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  {t.reliableDeliveryDesc}
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={300} className="h-full">
              <Card className="p-8 text-center bg-white border-none shadow-md h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transform transition-transform group-hover:scale-110" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--citrus-orange)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                  {t.freshGuarantee}
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  {t.freshGuaranteeDesc}
                </p>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Seasonal Calendar Preview */}
      <section id="calendar" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                {t.seasonalAvailability || 'Seasonal Availability'}
              </h2>
              <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
                {t.planAheadCalendar || 'Plan your imports with our harvest calendar'}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white border-none shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold" style={{ color: 'var(--gray-900)' }}>
                    {t.october || 'October'} 2025
                  </h3>
                  <Calendar className="w-6 h-6" style={{ color: 'var(--citrus-orange)' }} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
                    <div className="text-2xl mb-2">🍊</div>
                    <div className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>{t.oranges || 'Oranges'}</div>
                    <div className="text-xs flex items-center gap-1">
                      <span>⭐</span>
                      <span style={{ color: 'var(--citrus-orange)' }}>{t.peakSeason || 'Peak Season'}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--grape-purple-bg)' }}>
                    <div className="text-2xl mb-2">🍇</div>
                    <div className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>{t.grapes || 'Grapes'}</div>
                    <div className="text-xs flex items-center gap-1">
                      <span>🟢</span>
                      <span style={{ color: 'var(--fresh-green)' }}>{t.inSeason || 'In Season'}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--berry-red-bg)' }}>
                    <div className="text-2xl mb-2">🍓</div>
                    <div className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>{t.pomegranates || 'Pomegranates'}</div>
                    <div className="text-xs flex items-center gap-1">
                      <span>🟢</span>
                      <span style={{ color: 'var(--fresh-green)' }}>{t.inSeason || 'In Season'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    variant="outline"
                    className="border-[var(--citrus-orange)] text-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-bg)]"
                    onClick={() => navigate('calendar')}
                  >
                    {t.viewFullCalendar || 'View Full Calendar'}
                  </Button>
                </div>
              </Card>
            </div>
          </FadeIn>
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
                {testimonials[currentTestimonial]?.quote}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                    {testimonials[currentTestimonial]?.author}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    {testimonials[currentTestimonial]?.company} • {testimonials[currentTestimonial]?.country}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--gray-300)]"
                  style={{ backgroundColor: 'var(--gray-200)' }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
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
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--gray-300)]"
                  style={{ backgroundColor: 'var(--gray-200)' }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 rtl:rotate-180" />
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
