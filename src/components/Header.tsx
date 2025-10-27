import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from '../lib/router';

export function Header() {
  const { navigate, currentPage } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Products', page: 'products' },
    { label: 'Seasonal Calendar', page: 'calendar' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--citrus-orange)' }}>
                <span className="text-2xl">🍊</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold" style={{ color: 'var(--gray-900)' }}>Al Soadaa</h1>
                <p className="text-xs" style={{ color: 'var(--gray-500)' }}>Premium Egyptian Exports</p>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.page)}
                className="font-medium transition-colors hover:text-[var(--citrus-orange)]"
                style={{
                  color: currentPage === item.page ? 'var(--citrus-orange)' : 'var(--gray-700)',
                  fontWeight: currentPage === item.page ? 600 : 500,
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={() => navigate('contact')}
              className="bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)] text-white"
            >
              Request Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" style={{ color: 'var(--gray-700)' }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: 'var(--gray-700)' }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className="font-medium py-2 transition-colors hover:text-[var(--citrus-orange)] text-left"
                style={{
                  color: currentPage === item.page ? 'var(--citrus-orange)' : 'var(--gray-700)',
                }}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => {
                navigate('contact');
                setMobileMenuOpen(false);
              }}
              className="bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)] text-white w-full mt-2"
            >
              Request Quote
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
