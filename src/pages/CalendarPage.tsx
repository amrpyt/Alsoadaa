import { SeasonalCalendar } from '../components/SeasonalCalendar';
import { useLanguage } from '../lib/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { usePageContent } from '../hooks/usePageContent';

export function CalendarPage() {
  const { language } = useLanguage();
  const { t: siteT } = useSiteSettings(language);
  const { content: pageT } = usePageContent('calendar', language);

  const t = { ...siteT, ...pageT };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--fresh-green)] to-[var(--fresh-green-hover)] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h1 className="text-4xl font-bold text-white mb-4">{t.seasonalAvailability}</h1>
          <p className="text-xl text-white/90">{t.planAheadCalendar}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <SeasonalCalendar />
      </div>
    </div>
  );
}
