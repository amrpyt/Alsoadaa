import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from '../lib/router';
import { useLanguage } from '../lib/LanguageContext';
import { Language } from '../lib/translations';

export function Header() {
  const { navigate, currentPage } = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [processingMenuOpen, setProcessingMenuOpen] = useState(false);

  const navItems = [
    { label: t.products, page: 'products' },
    { label: t.seasonalCalendar, page: 'calendar' },
    { label: t.aboutUs, page: 'about' },
    { label: t.contact, page: 'contact' },
  ];

  const processingItems = [
    { label: t.sorting, page: 'sorting' },
    { label: t.packing, page: 'packing' },
    { label: t.exporting, page: 'exporting' },
  ];

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇪🇬' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

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
            {navItems.slice(0, 2).map((item) => (
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

            {/* Processing Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProcessingMenuOpen(true)}
              onMouseLeave={() => setProcessingMenuOpen(false)}
            >
              <button
                className="font-medium transition-colors hover:text-[var(--citrus-orange)]"
                style={{
                  color: ['sorting', 'packing', 'exporting'].includes(currentPage) ? 'var(--citrus-orange)' : 'var(--gray-700)',
                  fontWeight: ['sorting', 'packing', 'exporting'].includes(currentPage) ? 600 : 500,
                }}
              >
                {t.processing}
              </button>

              {processingMenuOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-48 z-50"
                >
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {processingItems.map((item) => (
                      <button
                        key={item.page}
                        onClick={() => {
                          navigate(item.page);
                          setProcessingMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-start hover:bg-gray-100 transition-colors"
                        style={{
                          backgroundColor: currentPage === item.page ? 'var(--citrus-orange-bg)' : 'transparent',
                          color: currentPage === item.page ? 'var(--citrus-orange)' : 'var(--gray-700)',
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navItems.slice(2).map((item) => (
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

          {/* Language Selector & CTA - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                style={{ color: 'var(--gray-700)' }}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{currentLanguage?.flag} {currentLanguage?.name}</span>
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLanguageMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-start hover:bg-gray-100 transition-colors flex items-center gap-2"
                      style={{
                        backgroundColor: language === lang.code ? 'var(--citrus-orange-bg)' : 'transparent',
                        color: language === lang.code ? 'var(--citrus-orange)' : 'var(--gray-700)',
                      }}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={() => navigate('contact')}
              className="bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)] text-white"
            >
              {t.requestQuote}
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
          <nav className="flex flex-col px-6 py-4 gap-2">
            {/* All Navigation Items */}
            {navItems.slice(0, 2).map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className="font-medium py-3 transition-colors hover:text-[var(--citrus-orange)] text-start"
                style={{
                  color: currentPage === item.page ? 'var(--citrus-orange)' : 'var(--gray-700)',
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Processing Items - Same Level */}
            {processingItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  navigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className="font-medium py-3 transition-colors hover:text-[var(--citrus-orange)] text-start"
                style={{
                  color: currentPage === item.page ? 'var(--citrus-orange)' : 'var(--gray-700)',
                }}
              >
                {item.label}
              </button>
            ))}

            {navItems.slice(2).map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className="font-medium py-3 transition-colors hover:text-[var(--citrus-orange)] text-start"
                style={{
                  color: currentPage === item.page ? 'var(--citrus-orange)' : 'var(--gray-700)',
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Language Selector */}
            <div className="border-t border-gray-200 pt-4 mt-2">
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                    }}
                    className="flex-1 px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: language === lang.code ? 'var(--citrus-orange)' : 'var(--gray-100)',
                      color: language === lang.code ? 'white' : 'var(--gray-700)',
                    }}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-xs font-medium">{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => {
                navigate('contact');
                setMobileMenuOpen(false);
              }}
              className="bg-[var(--citrus-orange)] hover:bg-[var(--citrus-orange-hover)] text-white w-full mt-4"
            >
              {t.requestQuote}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
