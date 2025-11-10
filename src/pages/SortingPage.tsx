import { Card } from '../components/ui/card';
import { useLanguage } from '../lib/LanguageContext';

export function SortingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--citrus-orange)] to-[var(--citrus-orange-hover)] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h1 className="text-4xl font-bold text-white mb-4">{t.sorting}</h1>
          <p className="text-xl text-white/90">{t.processing}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--gray-900)' }}>
              {t.sorting}
            </h2>
            
            <Card className="p-6 mb-6">
              <p className="text-lg mb-4" style={{ color: 'var(--gray-700)' }}>
                Sorting process is done through several stages.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--citrus-orange)' }}>
                    The First stage:
                  </h3>
                  <p style={{ color: 'var(--gray-600)' }}>
                    At this stage, broken and damaged fruits are excluded.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--citrus-orange)' }}>
                    The Second stage:
                  </h3>
                  <p style={{ color: 'var(--gray-600)' }}>
                    This stage comes after washing the fruits using drinking water. In this stage, all physiological and mechanical defects are excluded.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--citrus-orange)' }}>
                    The Third stage:
                  </h3>
                  <p style={{ color: 'var(--gray-600)' }}>
                    This stage is after the waxing process. In this stage, a checking of all the previously mentioned steps is done. The sorting process is executed by a group of skillful workers highly experienced in the field of sorting agricultural crops.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-[var(--citrus-orange-bg)]">
              <h3 className="font-semibold text-lg mb-3" style={{ color: 'var(--gray-900)' }}>
                Key Benefits
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>Multi-stage quality control process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>Highly experienced sorting team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>Ensures only premium quality fruits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                  <span style={{ color: 'var(--gray-700)' }}>Advanced washing and waxing process</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Image */}
          <div className="lg:sticky lg:top-24">
            <Card className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                alt="Sorting Process"
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-[var(--gray-50)]">
                <p className="text-sm text-center" style={{ color: 'var(--gray-600)' }}>
                  Advanced sorting line ensuring premium quality
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
