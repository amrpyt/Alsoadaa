import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

import { useLanguage } from '../lib/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
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
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white border border-gray-200 hover:border-[var(--citrus-orange)] hover:text-[var(--citrus-orange)] text-gray-500 shadow-sm"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white border border-gray-200 hover:border-[var(--citrus-orange)] hover:text-[var(--citrus-orange)] text-gray-500 shadow-sm"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
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
                  <span>{t.cairoEgypt}</span>
                </li>
                <li className="flex items-start gap-3 justify-center lg:justify-start">
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-[var(--citrus-orange)]" />
                  <a href="tel:+20123456789" className="hover:text-[var(--citrus-orange)] transition-colors font-medium">
                    +20 123 456 789
                  </a>
                </li>
                <li className="flex items-start gap-3 justify-center lg:justify-start">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-[var(--citrus-orange)]" />
                  <a href="mailto:info@alsoadaa.com" className="hover:text-[var(--citrus-orange)] transition-colors font-medium">
                    info@alsoadaa.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="h-full min-h-[300px] rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.225449939156!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM5LjgiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sen!2seg!4v1635000000000!5m2!1sen!2seg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
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
