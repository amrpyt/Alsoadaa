import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RouterProvider, useRouter } from './lib/router';
import { LanguageProvider } from './lib/LanguageContext';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CalendarPage } from './pages/CalendarPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SortingPage } from './pages/SortingPage';
import { PackingPage } from './pages/PackingPage';
import { ExportingPage } from './pages/ExportingPage';

function AppContent() {
  const { currentPage } = useRouter();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'sorting':
        return <SortingPage />;
      case 'packing':
        return <PackingPage />;
      case 'exporting':
        return <ExportingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </LanguageProvider>
  );
}
