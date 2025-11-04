import { useState } from 'react';
import { QuoteRequestForm } from '../components/QuoteRequestForm';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { useRouter } from '../lib/router';
import { useLanguage } from '../lib/LanguageContext';

export function ContactPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--trust-blue)] to-[var(--trust-blue-hover)] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h1 className="text-4xl font-bold text-white mb-4">{t.getInTouch}</h1>
          <p className="text-xl text-white/90">{t.contactDescription}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        {!showForm ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Options */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--gray-900)' }}>
                  {t.howCanWeHelp}
                </h2>
                <p className="text-lg mb-8" style={{ color: 'var(--gray-600)' }}>
                  {t.chooseWayToReach}
                </p>
              </div>

              <Card
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setShowForm(true)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--citrus-orange-bg)' }}>
                    <MessageSquare className="w-6 h-6" style={{ color: 'var(--citrus-orange)' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--gray-900)' }}>
                      {t.requestAQuote}
                    </h3>
                    <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                      {t.getCustomizedQuoteDesc}
                    </p>
                    <Button className="bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)]">
                      {t.startQuoteRequest}
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--fresh-green-bg)' }}>
                    <Phone className="w-6 h-6" style={{ color: 'var(--fresh-green)' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--gray-900)' }}>
                      {t.callUsDirectly}
                    </h3>
                    <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                      {t.speakWithSpecialists}
                    </p>
                    <a
                      href="tel:+201234567890"
                      className="text-lg font-semibold hover:underline"
                      style={{ color: 'var(--fresh-green)' }}
                    >
                      +20 123 456 7890
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--trust-blue-bg)' }}>
                    <Mail className="w-6 h-6" style={{ color: 'var(--trust-blue)' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--gray-900)' }}>
                      {t.emailUs}
                    </h3>
                    <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                      {t.sendDetailedInquiry}
                    </p>
                    <a
                      href="mailto:info@alsoadaa.com"
                      className="text-lg font-semibold hover:underline"
                      style={{ color: 'var(--trust-blue)' }}
                    >
                      info@alsoadaa.com
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--gray-900)' }}>
                  {t.contactInformation}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                        {t.headOffice}
                      </h4>
                      <p style={{ color: 'var(--gray-600)' }}>
                        Menoufia, Egypt<br />
                        Export Processing Zone
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                        {t.phoneNumbers}
                      </h4>
                      <p style={{ color: 'var(--gray-600)' }}>
                        Main: <a href="tel:+201007478669" className="hover:underline">+201007478669</a>
                      </p>
                      <a 
                        href="https://wa.me/201007478669" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 mt-2 hover:underline"
                        style={{ color: 'var(--fresh-green)' }}
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        WhatsApp: +201007478669
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                        {t.emailAddresses}
                      </h4>
                      <div className="space-y-1">
                        <p style={{ color: 'var(--gray-600)' }}>
                          General: <a href="mailto:info@alsoadaa.com" className="hover:underline" style={{ color: 'var(--trust-blue)' }}>info@alsoadaa.com</a>
                        </p>
                        <p style={{ color: 'var(--gray-600)' }}>
                          Sales: <a href="mailto:sales@alsoadaa.com" className="hover:underline" style={{ color: 'var(--trust-blue)' }}>sales@alsoadaa.com</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                        {t.businessHours}
                      </h4>
                      <div className="space-y-1">
                        <p style={{ color: 'var(--gray-600)' }}>
                          <span className="font-medium">Sunday - Thursday:</span> 9:00 AM - 6:00 PM
                        </p>
                        <p style={{ color: 'var(--gray-500)' }} className="text-sm">
                          (Cairo Time)
                        </p>
                        <p style={{ color: 'var(--gray-600)' }}>
                          <span className="font-medium">Friday - Saturday:</span> Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                  {t.whyChooseUs}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>15+ years of export experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>ISO 9001 & Global G.A.P certified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Serving 50+ countries worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>48-hour harvest to export</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--fresh-green)' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Reliable cold chain logistics</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        ) : (
          <div>
            <Button
              variant="ghost"
              onClick={() => setShowForm(false)}
              className="mb-6"
            >
              {t.backToContactOptions}
            </Button>
            <QuoteRequestForm onClose={() => {
              setShowForm(false);
              navigate('home');
            }} />
          </div>
        )}
      </div>
    </div>
  );
}
