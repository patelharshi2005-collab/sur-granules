import React from 'react';
import { usePlant, PageRoute } from '../context/PlantContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { setCurrentPage, settings } = usePlant();

  const handleNav = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#00335a] text-white border-t border-slate-700/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          {/* Column 1: Brand & Capacity */}
          <div className="space-y-4">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs w-fit">
              <Logo variant="light" size="md" />
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Engineered Recycled HDPE &amp; PP Granules for reliable high-speed injection and
              extrusion manufacturing across India.
            </p>
            <div className="space-y-1 pt-1">
              <div className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                Capacity: {settings.monthlyCapacity}
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-white/70">
                Ankleshwar GIDC Industrial Unit
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-wider font-bold text-white border-b border-white/15 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-emerald-300 transition-colors text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-emerald-300 transition-colors text-left cursor-pointer"
                >
                  Products Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('applications')}
                  className="hover:text-emerald-300 transition-colors text-left cursor-pointer"
                >
                  Industrial Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quality-process')}
                  className="hover:text-emerald-300 transition-colors text-left cursor-pointer"
                >
                  Quality &amp; Process Controls
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-emerald-300 transition-colors text-left cursor-pointer"
                >
                  Facility Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-emerald-300 transition-colors text-left cursor-pointer"
                >
                  Contact &amp; Factory Visit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('request-a-quote')}
                  className="hover:text-emerald-300 transition-colors text-blue-200 font-semibold text-left cursor-pointer flex items-center gap-1"
                >
                  <span>Request a Quote</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Materials & Specs */}
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-wider font-bold text-white border-b border-white/15 pb-2">
              Materials &amp; Specs
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li className="flex items-center justify-between">
                <span className="font-medium text-white">Recycled HDPE</span>
                <span className="font-mono text-xs bg-white/15 px-2 py-0.5 rounded text-white">
                  Blow / Extrusion
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium text-white">Recycled PP</span>
                <span className="font-mono text-xs bg-white/15 px-2 py-0.5 rounded text-white">
                  0.2 Melt Flow
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium text-white">Grade 0.2 Standard</span>
                <span className="font-mono text-xs bg-white/15 px-2 py-0.5 rounded text-white">
                  High Density
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium text-white">Packaging</span>
                <span className="font-mono text-xs text-white/70">50kg HDPE Woven Bags</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium text-white">Bulk Lot Delivery</span>
                <span className="font-mono text-xs text-emerald-300 font-bold">5 - 10 MT Batches</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-wider font-bold text-white border-b border-white/15 pb-2">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-sm text-white/80">
              <p className="font-semibold text-white">Owner: {settings.ownerName}</p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-blue-200">call</span>
                <a href={`tel:${settings.primaryPhone}`} className="hover:text-white">
                  {settings.primaryPhone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-blue-200">mail</span>
                <a href={`mailto:${settings.officialEmail}`} className="hover:text-white">
                  {settings.officialEmail}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-blue-200 shrink-0 mt-0.5">
                  location_city
                </span>
                <span>{settings.factoryAddress}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href="https://wa.me/919925712098"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#00532b] hover:bg-[#003a1c] text-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">chat</span>
                WhatsApp
              </a>
              <a
                href={`tel:${settings.primaryPhone}`}
                className="inline-flex items-center gap-1.5 bg-[#174a78] hover:bg-[#00335a] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">call</span>
                Call
              </a>
              <a
                href={`mailto:${settings.officialEmail}`}
                className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">mail</span>
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>© 2024 SUR GRANULES. All Rights Reserved. Industrial Polymer Manufacturing &amp; Recycling Division.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Commercial Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Specification &amp; TDS Disclaimer</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Bulk Procurement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
