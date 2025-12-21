import { useEffect, useState } from 'react';
import { Card } from '../components/ui/card';
import { useLanguage } from '../lib/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { usePageContent } from '../hooks/usePageContent';
import { client, getImageUrl } from '../lib/sanity';
import { serviceBySlugQuery } from '../lib/queries';

interface ServiceData {
  _id: string;
  name: string;
  description: string;
  features: string[];
  image?: any;
}

export function SortingPage() {
  const { language } = useLanguage();
  const { t: siteT } = useSiteSettings(language);
  const { content: pageT } = usePageContent('sorting', language);

  const t = { ...siteT, ...pageT };
  const [service, setService] = useState<ServiceData | null>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await client.fetch(serviceBySlugQuery, { slug: 'sorting', lang: language });
        setService(data);
      } catch (error) {
        console.error('Failed to fetch service:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [language]);

  // Fallback image - using your uploaded sorting photo
  const fallbackImage = '/sorting.jpg';
  const imageUrl = (service?.image ? getImageUrl(service.image) : null) || fallbackImage;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--citrus-orange)] to-[var(--citrus-orange-hover)] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h1 className="text-4xl font-bold text-white mb-4">{service?.name || t.sorting}</h1>
          <p className="text-xl text-white/90">{t.processing}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--gray-900)' }}>
              {service?.name || t.sorting}
            </h2>

            <Card className="p-6 mb-6">
              <p className="text-lg mb-4" style={{ color: 'var(--gray-700)' }}>
                {service?.description || t.sortingDesc}
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--citrus-orange)' }}>
                    {t.sortingStage1Title}
                  </h3>
                  <p style={{ color: 'var(--gray-600)' }}>
                    {t.sortingStage1Desc}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--citrus-orange)' }}>
                    {t.sortingStage2Title}
                  </h3>
                  <p style={{ color: 'var(--gray-600)' }}>
                    {t.sortingStage2Desc}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--citrus-orange)' }}>
                    {t.sortingStage3Title}
                  </h3>
                  <p style={{ color: 'var(--gray-600)' }}>
                    {t.sortingStage3Desc}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-[var(--citrus-orange-bg)]">
              <h3 className="font-semibold text-lg mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.sortingKeyBenefits}
              </h3>
              <ul className="space-y-2">
                {service?.features?.length ? (
                  service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                      <span style={{ color: 'var(--gray-700)' }}>{feature}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                      <span style={{ color: 'var(--gray-700)' }}>{t.sortingBenefit1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                      <span style={{ color: 'var(--gray-700)' }}>{t.sortingBenefit2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                      <span style={{ color: 'var(--gray-700)' }}>{t.sortingBenefit3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                      <span style={{ color: 'var(--gray-700)' }}>{t.sortingBenefit4}</span>
                    </li>
                  </>
                )}
              </ul>
            </Card>
          </div>

          {/* Image */}
          <div className="lg:sticky lg:top-24">
            <Card className="overflow-hidden">
              <img
                src={imageUrl}
                alt={service?.name || 'Sorting Process'}
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-[var(--gray-50)]">
                <p className="text-sm text-center" style={{ color: 'var(--gray-600)' }}>
                  {t.sortingImageCaption}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
