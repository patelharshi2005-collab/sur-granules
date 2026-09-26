import React, { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PlantProvider, usePlant } from './context/PlantContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteModal } from './components/QuoteModal';
import { StockReportModal } from './components/StockReportModal';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { QualityProcessPage } from './pages/QualityProcessPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { QuoteCalculatorPage } from './pages/QuoteCalculatorPage';
import { AdminHubPage } from './pages/AdminHubPage';

const AppContent: React.FC = () => {
  const { currentPage, toastMessage } = usePlant();

  // Scroll to top whenever page route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'applications':
        return <ApplicationsPage />;
      case 'quality-process':
        return <QualityProcessPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      case 'request-a-quote':
        return <QuoteCalculatorPage />;
      case 'admin':
        return <AdminHubPage />;
      default:
        return <ProductsPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9ff] text-[#131d25] font-sans antialiased selection:bg-blue-100 selection:text-[#00335a]">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 animate-in slide-in-from-top-3 fade-in duration-200">
          <div className="bg-[#00335a] text-white px-4 py-3 rounded-xl shadow-xl border border-blue-400/30 flex items-center gap-3 text-xs font-medium max-w-md">
            <span className="material-symbols-outlined text-emerald-400 text-lg">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Content View with top offset for fixed navbar */}
      <main className="flex-1 w-full pt-[80px] md:pt-[116px]">
        {renderCurrentPage()}
      </main>

      {/* Persistent Footer (Shown on all pages) */}
      <Footer />

      {/* Persistent Floating WhatsApp Quick Button */}
      <FloatingWhatsApp />

      {/* Modals */}
      <ProductDetailModal />
      <QuoteModal />
      <StockReportModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PlantProvider>
        <AppContent />
      </PlantProvider>
    </AuthProvider>
  );
}
