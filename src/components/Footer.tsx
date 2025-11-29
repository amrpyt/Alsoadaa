import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

import { useLanguage } from '../lib/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{ backgroundColor: 'var(--gray-900)', color: 'var(--gray-300)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Company Info & Contact */}
          <div className="space-y-8 text-center lg:text-start">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--citrus-orange)' }}>
                  <span className="text-xl">🍊</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{t.companyName || 'Al Soadaa'}</h3>
              </div>
              <p className="text-sm mb-4">
                {t.footerDescription}
              </p>
              <div className="flex gap-3 justify-center lg:justify-start">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'var(--gray-700)' }}
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'var(--gray-700)' }}
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'var(--gray-700)' }}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-xl">{t.contact}</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 justify-center lg:justify-start">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                  <span>{t.cairoEgypt}</span>
                </li>
                <li className="flex items-start gap-2 justify-center lg:justify-start">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                  <a href="tel:+20123456789" className="hover:text-[var(--citrus-orange)] transition-colors">
                    +20 123 456 789
                  </a>
                </li>
                <li className="flex items-start gap-2 justify-center lg:justify-start">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                  <a href="mailto:info@alsoadaa.com" className="hover:text-[var(--citrus-orange)] transition-colors">
                    info@alsoadaa.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="flex flex-col justify-end">
            <h4 className="text-white font-semibold mb-4 text-xl text-center lg:text-start">{t.ourLocation}</h4>
            <div className="w-full rounded-lg overflow-hidden" style={{ height: '280px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d858.8379469433759!2d30.757723290927487!3d30.46078742951663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145897556d1c1ef1%3A0x26036a1309babc65!2z2LTYsdmD2Ycg2KfZhNiz2LnYr9in2KEg2YTZhNin2LPYqtmK2LHYp9ivINmI2KfZhNiq2LXYr9mK2LEgQWxzb2FkYWEgY29tcGFueSBmb3IgaW1wb3J0IGFuZCBleHBvcnQ!5e1!3m2!1sen!2seg!4v1762209910007!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.companyLocationTitle}
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8" style={{ borderColor: 'var(--gray-700)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>{t.copyright}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[var(--citrus-orange)] transition-colors">{t.privacyPolicy}</a>
              <a href="#" className="hover:text-[var(--citrus-orange)] transition-colors">{t.termsOfService}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
