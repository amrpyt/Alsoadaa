import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--gray-900)', color: 'var(--gray-300)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--citrus-orange)' }}>
                <span className="text-xl">🍊</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Al Soadaa</h3>
            </div>
            <p className="text-sm mb-4">
              Premium Egyptian agricultural exporter since 2009. Delivering fresh, certified products to markets worldwide.
            </p>
            <div className="flex gap-3">
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

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="hover:text-[var(--citrus-orange)] transition-colors">Products</a></li>
              <li><a href="#calendar" className="hover:text-[var(--citrus-orange)] transition-colors">Seasonal Calendar</a></li>
              <li><a href="#about" className="hover:text-[var(--citrus-orange)] transition-colors">About Us</a></li>
              <li><a href="#certifications" className="hover:text-[var(--citrus-orange)] transition-colors">Certifications</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[var(--citrus-orange)] transition-colors">🍊 Citrus Fruits</a></li>
              <li><a href="#" className="hover:text-[var(--citrus-orange)] transition-colors">🥬 Fresh Vegetables</a></li>
              <li><a href="#" className="hover:text-[var(--citrus-orange)] transition-colors">🍇 Grapes</a></li>
              <li><a href="#" className="hover:text-[var(--citrus-orange)] transition-colors">🍓 Pomegranates</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                <span>Cairo, Egypt</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                <a href="tel:+20123456789" className="hover:text-[var(--citrus-orange)] transition-colors">
                  +20 123 456 789
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--citrus-orange)' }} />
                <a href="mailto:info@alsoadaa.com" className="hover:text-[var(--citrus-orange)] transition-colors">
                  info@alsoadaa.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8" style={{ borderColor: 'var(--gray-700)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2025 Al Soadaa Export. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[var(--citrus-orange)] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--citrus-orange)] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
