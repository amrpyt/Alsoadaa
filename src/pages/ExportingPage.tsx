import { Card } from '../components/ui/card';
import { useLanguage } from '../lib/LanguageContext';
import { Globe, Ship, Award, CheckCircle2 } from 'lucide-react';

export function ExportingPage() {
  const { t } = useLanguage();

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
                Al Soadaa Import and Export Company offers high-quality services from the finest Egyptian agricultural crops.
              </p>

              <p className="text-lg mb-4" style={{ color: 'var(--gray-700)' }}>
                Al Soadaa Company relies on exporting all types of fruits and vegetables. By your contact with us, we promise you the best services, the finest and highest-quality products of all.
              </p>

              <p className="text-lg font-semibold" style={{ color: 'var(--trust-blue)' }}>
                We are ready to export our products to any place in the world, in collaboration with the world's greatest shipping lines.
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
                      Global Reach
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      Export to 50+ countries worldwide
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
                      Top Shipping Lines
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      Partnership with leading carriers
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
                      Premium Quality
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      Finest Egyptian agricultural crops
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
                      Reliable Service
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      Trusted by international clients
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-[var(--trust-blue-bg)]">
              <h3 className="font-semibold text-lg mb-3" style={{ color: 'var(--gray-900)' }}>
                Export Capabilities
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--trust-blue)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>All types of fruits and vegetables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--trust-blue)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>Worldwide shipping coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--trust-blue)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>Collaboration with top shipping lines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--trust-blue)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>ISO 9001 & Global G.A.P certified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--trust-blue)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>15+ years of export experience</span>
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
                  Global export operations with world-class shipping partners
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
