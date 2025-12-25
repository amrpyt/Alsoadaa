import { useState, useEffect } from 'react';
import { QuoteRequestForm } from '../components/QuoteRequestForm';
import { Button } from '../components/ui/button';
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowRight, Globe, ShieldCheck } from 'lucide-react';
import { useRouter } from '../lib/router';
import { useLanguage } from '../lib/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { usePageContent } from '../hooks/usePageContent';

export function ContactPage() {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const { t: siteT, loading: siteLoading } = useSiteSettings(language);
  const { content: pageT, loading: pageLoading } = usePageContent('contact', language);

  // All hooks MUST be called before conditional returns
  const [showForm, setShowForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const t = { ...siteT, ...pageT };

  if (siteLoading || pageLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Hero Section with Parallax-like feel */}
      <div className="relative overflow-hidden bg-[#0F172A] pb-32 pt-24 lg:pt-32">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[var(--trust-blue)] opacity-20 blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--citrus-orange)] opacity-10 blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] rounded-full bg-[var(--fresh-green)] opacity-10 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6 backdrop-blur-sm">
              {t.contactInformation || "Global Reach, Local Touch"}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              {t.getInTouch}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t.contactDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 -mt-24 relative z-20 pb-20">
        {!showForm ? (
          <div className="space-y-16">
            {/* Main Contact Cards - Floating Glass Effect */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Request Quote Card - Featured */}
              <div
                className={`group relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-slate-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: '100ms' }}
                onClick={() => setShowForm(true)}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--citrus-orange)] to-[var(--citrus-orange-light)]" />
                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--citrus-orange-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-8 h-8 text-[var(--citrus-orange)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[var(--citrus-orange)] transition-colors">
                    {t.requestAQuote}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {t.getCustomizedQuoteDesc}
                  </p>
                  <div className="flex items-center text-[var(--citrus-orange)] font-semibold group-hover:gap-2 transition-all">
                    {t.startQuoteRequest} <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </div>

              {/* Call Us Card */}
              <div
                className={`group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-slate-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--fresh-green)] to-[var(--fresh-green-light)]" />
                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--fresh-green-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-8 h-8 text-[var(--fresh-green)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[var(--fresh-green)] transition-colors">
                    {t.callUsDirectly}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {t.speakWithSpecialists}
                  </p>
                  <a href={`tel:${t.phone || '+201007478669'}`} dir="ltr" className="text-lg font-bold text-slate-900 hover:text-[var(--fresh-green)] transition-colors block">
                    {t.phone || '+20 100 747 8669'}
                  </a>
                  {t.whatsapp && (
                    <a href={`tel:${t.whatsapp}`} dir="ltr" className="text-lg font-bold text-slate-900 hover:text-[var(--fresh-green)] transition-colors block mt-1">
                      {t.whatsapp}
                    </a>
                  )}
                  <a href={`https://wa.me/${(t.phone || '+201007478669').replace(/[^0-9]/g, '')}`} className="text-sm font-medium text-slate-500 hover:text-[var(--fresh-green)] transition-colors mt-2 block">
                    {t.whatsappAvailable}
                  </a>
                </div>
              </div>

              {/* Email Us Card */}
              <div
                className={`group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-slate-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--trust-blue)] to-[var(--trust-blue-light)]" />
                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--trust-blue-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-8 h-8 text-[var(--trust-blue)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[var(--trust-blue)] transition-colors">
                    {t.emailUs}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {t.sendDetailedInquiry}
                  </p>
                  <a href={`mailto:${t.email || 'info@alsoadaa.com'}`} className="text-lg font-bold text-slate-900 hover:text-[var(--trust-blue)] transition-colors block">
                    {t.email || 'info@alsoadaa.com'}
                  </a>
                  <a href={`mailto:sales@${(t.email || 'info@alsoadaa.com').split('@')[1] || 'alsoadaa.com'}`} className="text-sm font-medium text-slate-500 hover:text-[var(--trust-blue)] transition-colors mt-2 block">
                    sales@{(t.email || 'info@alsoadaa.com').split('@')[1] || 'alsoadaa.com'}
                  </a>
                </div>
              </div>
            </div>

            {/* Detailed Info Section */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '400ms' }}>

              {/* Left Column: Map/Location Visual */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] group">
                {/* Placeholder for Map - In a real app, embed Google Maps here */}
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                  <div className="relative z-10 text-center p-8">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                      <MapPin className="w-10 h-10 text-[var(--citrus-orange)]" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{t.headOffice}</h3>
                    <p className="text-xl text-slate-300">{t.locationMenoufia}</p>
                    <p className="text-slate-400 mt-2">{t.exportProcessingZone}</p>

                    <Button
                      className="mt-8 bg-white text-slate-900 hover:bg-slate-100 border-0"
                      onClick={() => window.open('https://www.google.com/maps/place/%D8%B4%D8%B1%D9%83%D9%87+%D8%A7%D9%84%D8%B3%D8%B9%D8%AF%D8%A7%D8%A1+%D9%84%D9%84%D8%A7%D8%B3%D8%AA%D9%8A%D8%B1%D8%A7%D8%AF+%D9%88%D8%A7%D9%84%D8%AA%D8%B5%D8%AF%D9%8A%D8%B1+Alsoadaa+company+for+import+and+export/@30.460463,30.757871,15z', '_blank')}
                    >
                      {t.viewOnGoogleMaps}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column: Additional Info & Trust Indicators */}
              <div className="space-y-8 lg:pt-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.contactInformation}</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {t.contactAssistMessage}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <Clock className="w-8 h-8 text-[var(--trust-blue)] mb-4" />
                    <h4 className="font-bold text-slate-900 mb-2">{t.businessHours}</h4>
                    <p className="text-sm text-slate-600">{t.businessHoursValue}</p>
                    <p className="text-xs text-slate-400 mt-1">{t.cairoTimeZone}</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <Globe className="w-8 h-8 text-[var(--fresh-green)] mb-4" />
                    <h4 className="font-bold text-slate-900 mb-2">{t.globalReachTitle}</h4>
                    <p className="text-sm text-slate-600">{t.serving50Countries}</p>
                    <p className="text-xs text-slate-400 mt-1">{t.worldwideLogistics}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{t.whyChooseUs}</h3>
                  <ul className="space-y-4">
                    {[
                      t.experience15Years,
                      t.isoCertified,
                      t.harvestToExport48,
                      t.reliableColdChain
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-[var(--fresh-green-bg)] flex items-center justify-center flex-shrink-0">
                          <ShieldCheck className="w-3 h-3 text-[var(--fresh-green)]" />
                        </div>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <Button
              variant="ghost"
              onClick={() => setShowForm(false)}
              className="mb-8 hover:bg-slate-100 text-slate-600"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              {t.backToContactOptions}
            </Button>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
              <QuoteRequestForm onClose={() => {
                setShowForm(false);
                navigate('home');
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
