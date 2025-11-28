import { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Award, Globe, TrendingUp, Users, Shield, Leaf, Loader2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { client } from '../lib/sanity';
import { pageBySlugQuery } from '../lib/queries';
import { PortableText } from '../components/PortableText';
import { companyStats } from '../lib/mockData';

export function AboutPage() {
  const { language, t } = useLanguage();
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(pageBySlugQuery, {
          slug: 'about',
          lang: language
        });
        setPageContent(data);
      } catch (err) {
        console.error('Failed to fetch about page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[var(--citrus-orange)] mx-auto mb-4" />
          <p className="text-lg" style={{ color: 'var(--gray-600)' }}>{t.loading}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div
        className="relative h-[40vh] min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1520123704147-ed3a34036262?w=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.aboutAlSoadaa}</h1>
          <p className="text-xl md:text-2xl text-white/90">
            {t.aboutHeroSubtitle}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="py-12" style={{ backgroundColor: 'var(--gray-50)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--citrus-orange)' }}>
                {companyStats.yearsExporting}+
              </div>
              <div style={{ color: 'var(--gray-700)' }}>{t.yearsOfExcellence}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--fresh-green)' }}>
                {companyStats.countriesServed}+
              </div>
              <div style={{ color: 'var(--gray-700)' }}>{t.countriesServed}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--trust-blue)' }}>
                {companyStats.containersPerYear}+
              </div>
              <div style={{ color: 'var(--gray-700)' }}>{t.containersAnnually}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--grape-purple)' }}>
                100%
              </div>
              <div style={{ color: 'var(--gray-700)' }}>{t.customerSatisfaction}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Content from Sanity */}
      {pageContent?.content && (
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-16">
            <PortableText value={pageContent.content} />
          </div>
        </div>
      )}

      {/* Mission & Values */}
      <div className="py-16" style={{ backgroundColor: 'var(--gray-50)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: 'var(--gray-900)' }}>
            {t.ourMissionAndValues}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
                <Award className="w-8 h-8" style={{ color: 'var(--citrus-orange)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.qualityFirst}
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                {t.qualityFirstDesc}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--trust-blue-bg)' }}>
                <Globe className="w-8 h-8" style={{ color: 'var(--trust-blue)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.globalReach}
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                {t.globalReachDesc}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--fresh-green-bg)' }}>
                <Leaf className="w-8 h-8" style={{ color: 'var(--fresh-green)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.sustainability}
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                {t.sustainabilityDesc}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--grape-purple-bg)' }}>
                <Users className="w-8 h-8" style={{ color: 'var(--grape-purple)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.partnership}
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                {t.partnershipDesc}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--berry-red-bg)' }}>
                <TrendingUp className="w-8 h-8" style={{ color: 'var(--berry-red)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.innovation}
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                {t.innovationDesc}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--lemon-yellow-bg)' }}>
                <Shield className="w-8 h-8" style={{ color: 'var(--lemon-yellow-active)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                {t.trustAndReliability}
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                {t.trustAndReliabilityDesc}
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: 'var(--gray-900)' }}>
            {t.ourCertifications}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'ISO 9001', description: t.iso9001Desc, icon: '🏆' },
              { name: 'Global G.A.P', description: t.globalGapDesc, icon: '🌱' },
              { name: 'HACCP', description: t.haccpDesc, icon: '✓' },
            ].map((cert) => (
              <Card key={cert.name} className="p-8 text-center">
                <div className="text-6xl mb-4">{cert.icon}</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                  {cert.name}
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  {cert.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16" style={{ backgroundColor: 'var(--gray-50)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-16">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: 'var(--gray-900)' }}>
            {t.ourJourney}
          </h2>

          <div className="space-y-8">
            {[
              { year: '2009', title: t.journey2009Title, description: t.journey2009Desc },
              { year: '2012', title: t.journey2012Title, description: t.journey2012Desc },
              { year: '2015', title: t.journey2015Title, description: t.journey2015Desc },
              { year: '2018', title: t.journey2018Title, description: t.journey2018Desc },
              { year: '2021', title: t.journey2021Title, description: t.journey2021Desc },
              { year: '2025', title: t.journey2025Title, description: t.journey2025Desc },
            ].map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: 'var(--citrus-orange)' }}
                  >
                    {milestone.year.slice(-2)}
                  </div>
                  {index < 5 && (
                    <div className="w-0.5 h-full mt-2" style={{ backgroundColor: 'var(--gray-300)' }} />
                  )}
                </div>
                <div className="pb-8">
                  <div className="font-semibold text-sm mb-1" style={{ color: 'var(--citrus-orange)' }}>
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                    {milestone.title}
                  </h3>
                  <p style={{ color: 'var(--gray-600)' }}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
