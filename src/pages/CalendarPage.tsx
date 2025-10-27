import { SeasonalCalendar } from '../components/SeasonalCalendar';

export function CalendarPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--fresh-green)] to-[var(--fresh-green-hover)] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h1 className="text-4xl font-bold text-white mb-4">Seasonal Availability</h1>
          <p className="text-xl text-white/90">Plan your procurement with our interactive calendar</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <SeasonalCalendar />
      </div>
    </div>
  );
}
