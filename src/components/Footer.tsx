import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

import { useLanguage } from '../lib/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';

export function Footer() {
  const { language } = useLanguage();
  const { t } = useSiteSettings(language);
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Company Info & Contact */}
          <div className="space-y-8 text-center lg:text-start">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                <img
                  src="/logo.png"
                  alt="Al Soadaa"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <p className="text-sm mb-6 text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                {t.footerDescription}
              </p>
              <div className="flex gap-3 justify-center lg:justify-start">
                <a
                  href={t.social_facebook || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white border border-gray-200 hover:border-[var(--citrus-orange)] hover:text-[var(--citrus-orange)] text-gray-500 shadow-sm"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={t.social_instagram || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white border border-gray-200 hover:border-[var(--citrus-orange)] hover:text-[var(--citrus-orange)] text-gray-500 shadow-sm"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={t.social_linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white border border-gray-200 hover:border-[var(--citrus-orange)] hover:text-[var(--citrus-orange)] text-gray-500 shadow-sm"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-4 text-lg">{t.contact}</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3 justify-center lg:justify-start">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[var(--citrus-orange)]" />
                  <span>{t.cairoEgypt || t.address}</span>
                </li>
                <li className="flex items-start gap-3 justify-center lg:justify-start">
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-[var(--citrus-orange)]" />
                  <div className="flex flex-col">
                    <a href={`tel:${t.phone || '+201007478669'}`} dir="ltr" className="hover:text-[var(--citrus-orange)] transition-colors font-medium">
                      {t.phone || '+20 100 747 8669'}
                    </a>
                    {t.whatsapp && (
                      <a href={`tel:${t.whatsapp}`} dir="ltr" className="hover:text-[var(--citrus-orange)] transition-colors font-medium">
                        {t.whatsapp}
                      </a>
                    )}
                  </div>
                </li>
                <li className="flex items-start gap-3 justify-center lg:justify-start">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-[var(--citrus-orange)]" />
                  <a href={`mailto:${t.email || 'info@alsoadaa.com'}`} className="hover:text-[var(--citrus-orange)] transition-colors font-medium">
                    {t.email || 'info@alsoadaa.com'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="h-full min-h-[300px] rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d55026.24534800622!2d30.757870999999998!3d30.460463!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145897556d1c1ef1%3A0x26036a1309babc65!2z2LTYsdmD2Ycg2KfZhNiz2LnYr9in2KEg2YTZhNin2LPYqtmK2LHYp9ivINmI2KfZhNiq2LXYr9mK2LEgQWxzb2FkYWEgY29tcGFueSBmb3IgaW1wb3J0IGFuZCBleHBvcnQ!5e0!3m2!1sar!2seg!4v1764759592322!5m2!1sar!2seg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p> {new Date().getFullYear()} {t.companyName}. {t.privacyPolicy ? t.privacyPolicy === 'سياسة الخصوصية' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.' : 'All rights reserved.'}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--citrus-orange)] transition-colors">{t.privacyPolicy}</a>
            <a href="#" className="hover:text-[var(--citrus-orange)] transition-colors">{t.termsOfService}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
