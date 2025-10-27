import { useState } from 'react';
import { QuoteRequestForm } from '../components/QuoteRequestForm';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { useRouter } from '../lib/router';

export function ContactPage() {
  const { navigate } = useRouter();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--trust-blue)] to-[var(--trust-blue-hover)] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-white/90">We're here to help with your export needs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        {!showForm ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Options */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--gray-900)' }}>
                  How Can We Help You?
                </h2>
                <p className="text-lg mb-8" style={{ color: 'var(--gray-600)' }}>
                  Choose the best way to reach us. Our team is ready to assist with your inquiries.
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
                      Request a Quote
                    </h3>
                    <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                      Get a customized quote for your specific needs. Fill out our multi-step form and we'll respond within 24 hours.
                    </p>
                    <Button className="bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)]">
                      Start Quote Request →
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
                      Call Us Directly
                    </h3>
                    <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                      Speak with our export specialists immediately.
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
                      Email Us
                    </h3>
                    <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                      Send us a detailed inquiry at your convenience.
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
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                        Head Office
                      </h4>
                      <p style={{ color: 'var(--gray-600)' }}>
                        Cairo, Egypt<br />
                        Export Processing Zone
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                        Phone Numbers
                      </h4>
                      <p style={{ color: 'var(--gray-600)' }}>
                        Main: +20 123 456 7890<br />
                        WhatsApp: +20 123 456 7891
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                        Email Addresses
                      </h4>
                      <p style={{ color: 'var(--gray-600)' }}>
                        General: info@alsoadaa.com<br />
                        Sales: sales@alsoadaa.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                        Business Hours
                      </h4>
                      <p style={{ color: 'var(--gray-600)' }}>
                        Sunday - Thursday: 9:00 AM - 6:00 PM (Cairo Time)<br />
                        Friday - Saturday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--gray-900)' }}>
                  Why Choose Al Soadaa?
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
              ← Back to Contact Options
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
