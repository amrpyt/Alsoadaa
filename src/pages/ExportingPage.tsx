import { Card } from '../components/ui/card';
import { useLanguage } from '../lib/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { usePageContent } from '../hooks/usePageContent';
import { Globe, Ship, Award, CheckCircle2 } from 'lucide-react';

export function ExportingPage() {
  const { language } = useLanguage();
  const { t: siteT } = useSiteSettings(language);
  const { content: pageT } = usePageContent('exporting', language);

  const t = { ...siteT, ...pageT };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--trust-blue)] to-[var(--trust-blue-hover)] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h1 className="text-4xl font-bold text-white mb-4">{t.exporting}</h1>
          <p className="text-xl text-white/90">{t.processing}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--gray-900)' }}>
              {t.exporting}
            </h2>

            <Card className="p-6 mb-6">
              <p className="text-lg mb-4" style={{ color: 'var(--gray-700)' }}>
                {t.exportingDesc1}
              </p>

              <p className="text-lg mb-4" style={{ color: 'var(--gray-700)' }}>
                {t.exportingDesc2}
              </p>

              <p className="text-lg font-semibold" style={{ color: 'var(--trust-blue)' }}>
                {t.exportingDesc3}
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--trust-blue-bg)' }}>
                    <Globe className="w-5 h-5" style={{ color: 'var(--trust-blue)' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                      {t.exportingFeature1Title}
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      {t.exportingFeature1Desc}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--fresh-green-bg)' }}>
                    <Ship className="w-5 h-5" style={{ color: 'var(--fresh-green)' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                      {t.exportingFeature2Title}
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      {t.exportingFeature2Desc}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
                    <Award className="w-5 h-5" style={{ color: 'var(--citrus-orange)' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                      {t.exportingFeature3Title}
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      {t.exportingFeature3Desc}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--berry-red-bg)' }}>
                    <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--berry-red)' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                      {t.exportingFeature4Title}
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      {t.exportingFeature4Desc}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-[var(--trust-blue-bg)]">
              <h3 className="font-semibold text-lg mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.exportingCapabilities}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--trust-blue)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>{t.exportingCap1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--trust-blue)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>{t.exportingCap2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--trust-blue)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>{t.exportingCap3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--trust-blue)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>{t.exportingCap4}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--trust-blue)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>{t.exportingCap5}</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Image */}
          <div className="lg:sticky lg:top-24">
            <Card className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80"
                alt="Exporting Process"
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-[var(--gray-50)]">
                <p className="text-sm text-center" style={{ color: 'var(--gray-600)' }}>
                  {t.exportingImageCaption}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
