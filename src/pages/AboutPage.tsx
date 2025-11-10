import { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Award, Globe, TrendingUp, Users, Shield, Leaf, Loader2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { client } from '../lib/sanity';
import { pageBySlugQuery } from '../lib/queries';
import { PortableText } from '../components/PortableText';
import { certifications, companyStats } from '../lib/mockData';

export function AboutPage() {
  const { language } = useLanguage();
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError('Failed to load page content.');
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
          <p className="text-lg" style={{ color: 'var(--gray-600)' }}>Loading...</p>
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Al Soadaa</h1>
          <p className="text-xl md:text-2xl text-white/90">
            Trusted Egyptian Exporter Since 2009
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
              <div style={{ color: 'var(--gray-700)' }}>Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--fresh-green)' }}>
                {companyStats.countriesServed}+
              </div>
              <div style={{ color: 'var(--gray-700)' }}>Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--trust-blue)' }}>
                {companyStats.containersPerYear}+
              </div>
              <div style={{ color: 'var(--gray-700)' }}>Containers Annually</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--grape-purple)' }}>
                100%
              </div>
              <div style={{ color: 'var(--gray-700)' }}>Customer Satisfaction</div>
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
            Our Mission & Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
                <Award className="w-8 h-8" style={{ color: 'var(--citrus-orange)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                Quality First
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                We never compromise on quality. Every product undergoes rigorous inspection to meet international standards.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--trust-blue-bg)' }}>
                <Globe className="w-8 h-8" style={{ color: 'var(--trust-blue)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                Global Reach
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Serving customers across Europe, Asia, and the Middle East with reliable logistics and timely delivery.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--fresh-green-bg)' }}>
                <Leaf className="w-8 h-8" style={{ color: 'var(--fresh-green)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                Sustainability
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                We promote sustainable farming practices that protect the environment for future generations.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--grape-purple-bg)' }}>
                <Users className="w-8 h-8" style={{ color: 'var(--grape-purple)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                Partnership
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                We build long-term relationships with farmers, ensuring fair prices and sustainable livelihoods.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--berry-red-bg)' }}>
                <TrendingUp className="w-8 h-8" style={{ color: 'var(--berry-red)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                Innovation
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Continuously improving our processes and adopting new technologies to serve you better.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--lemon-yellow-bg)' }}>
                <Shield className="w-8 h-8" style={{ color: 'var(--lemon-yellow-active)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
                Trust & Reliability
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Transparency in all our dealings and consistent delivery on our promises.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: 'var(--gray-900)' }}>
            Our Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert) => (
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
            Our Journey
          </h2>

          <div className="space-y-8">
            {[
              { year: '2009', title: 'Company Founded', description: 'Al Soadaa Export begins operations with a focus on citrus fruits.' },
              { year: '2012', title: 'ISO 9001 Certification', description: 'Achieved ISO 9001 certification, establishing quality management systems.' },
              { year: '2015', title: 'Global G.A.P Certified', description: 'Obtained Global G.A.P certification for sustainable agricultural practices.' },
              { year: '2018', title: 'Expanded Product Range', description: 'Added vegetables and pomegranates to our export portfolio.' },
              { year: '2021', title: '50 Countries Milestone', description: 'Reached the milestone of exporting to 50+ countries worldwide.' },
              { year: '2025', title: 'Digital Transformation', description: 'Launched modern website and digital platform for better customer service.' },
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
