import { useEffect, useState } from 'react';
import { Card } from '../components/ui/card';
import { useLanguage } from '../lib/LanguageContext';
import { Package, Shield, Truck } from 'lucide-react';
import { client, getImageUrl } from '../lib/sanity';
import { serviceBySlugQuery } from '../lib/queries';

interface ServiceData {
  _id: string;
  name: string;
  description: string;
  features: string[];
  image?: any;
}

export function PackingPage() {
  const { t, language } = useLanguage();
  const [service, setService] = useState<ServiceData | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await client.fetch(serviceBySlugQuery, { slug: 'packing', lang: language });
        setService(data);
      } catch (error) {
        console.error('Failed to fetch service:', error);
      }
    };
    fetchService();
  }, [language]);

  const imageUrl = service?.image 
    ? getImageUrl(service.image) 
    : 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--fresh-green)] to-[var(--fresh-green-hover)] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h1 className="text-4xl font-bold text-white mb-4">{t.packing}</h1>
          <p className="text-xl text-white/90">{t.processing}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--gray-900)' }}>
              {t.packing}
            </h2>
            
            <Card className="p-6 mb-6">
              <p className="text-lg mb-4" style={{ color: 'var(--gray-700)' }}>
                {t.packingDesc1}
              </p>

              <p className="text-lg mb-4" style={{ color: 'var(--gray-700)' }}>
                {t.packingDesc2}
              </p>

              <p className="text-lg" style={{ color: 'var(--gray-700)' }}>
                {t.packingDesc3}
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--fresh-green-bg)' }}>
                  <Package className="w-6 h-6" style={{ color: 'var(--fresh-green)' }} />
                </div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                  {t.packingFeature1Title}
                </h4>
                <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                  {t.packingFeature1Desc}
                </p>
              </Card>

              <Card className="p-4 text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
                  <Shield className="w-6 h-6" style={{ color: 'var(--citrus-orange)' }} />
                </div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                  {t.packingFeature2Title}
                </h4>
                <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                  {t.packingFeature2Desc}
                </p>
              </Card>

              <Card className="p-4 text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--trust-blue-bg)' }}>
                  <Truck className="w-6 h-6" style={{ color: 'var(--trust-blue)' }} />
                </div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                  {t.packingFeature3Title}
                </h4>
                <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                  {t.packingFeature3Desc}
                </p>
              </Card>
            </div>

            <Card className="p-6 bg-[var(--fresh-green-bg)]">
              <h3 className="font-semibold text-lg mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.packingStandards}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>{t.packingStandard1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>{t.packingStandard2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>{t.packingStandard3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>{t.packingStandard4}</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Image */}
          <div className="lg:sticky lg:top-24">
            <Card className="overflow-hidden">
              <img
                src={imageUrl}
                alt={service?.name || 'Packing Process'}
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-[var(--gray-50)]">
                <p className="text-sm text-center" style={{ color: 'var(--gray-600)' }}>
                  {t.packingImageCaption}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
