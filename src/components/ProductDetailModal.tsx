import React from 'react';
import { usePlant } from '../context/PlantContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, closeProductDetail, openQuoteModal, settings } = usePlant();

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;

  const waText = encodeURIComponent(
    `Hello SUR GRANULES, I am interested in your ${product.name} (${product.code}). Required quantity: 5-10 tonnes. Please share price and immediate availability from Ankleshwar.`
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={closeProductDetail}
    >
      <div
        className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#00335a] text-white p-6 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-blue-200 block mb-1">
              Technical Specification • {product.code}
            </span>
            <h3 className="font-display text-xl font-bold text-white">
              {product.name} ({product.mfi})
            </h3>
          </div>
          <button
            onClick={closeProductDetail}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Overview prose */}
          <p className="text-sm text-slate-700 leading-relaxed">{product.overview}</p>

          {/* Quick Technical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Target MFI
              </span>
              <div className="font-semibold text-[#00335a] text-sm mt-0.5">{product.mfi}</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Specific Density
              </span>
              <div className="font-semibold text-[#00335a] text-sm mt-0.5">{product.density}</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Tensile Modulus
              </span>
              <div className="font-semibold text-[#00335a] text-sm mt-0.5">
                {product.tensileStrength}
              </div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Izod Impact (23°C)
              </span>
              <div className="font-semibold text-[#00335a] text-sm mt-0.5">
                {product.izodImpact}
              </div>
            </div>
          </div>

          {/* Color Availability */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Calibrated Color Swatches
            </span>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-700"
                >
                  <span
                    className={`w-3 h-3 rounded-full border border-slate-300 ${
                      color === 'Blue'
                        ? 'bg-blue-600'
                        : color === 'White'
                        ? 'bg-white'
                        : color === 'Off-White'
                        ? 'bg-amber-100'
                        : color === 'Transparent'
                        ? 'bg-sky-50'
                        : 'bg-slate-400'
                    }`}
                  />
                  <span>{color}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Production Uses */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Certified Industrial Applications
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {product.applications.map((app) => (
                <li key={app} className="flex items-center gap-2 bg-blue-50/60 p-2 rounded">
                  <span className="material-symbols-outlined text-blue-700 text-sm">
                    check_circle
                  </span>
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Packaging Architecture */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
            <span className="material-symbols-outlined text-[#174a78] text-xl mt-0.5">
              shield
            </span>
            <div className="text-xs text-slate-700">
              <strong className="block text-[#00335a] font-medium mb-0.5">
                Moisture-Barrier Packaging:
              </strong>
              {product.packaging}
            </div>
          </div>

          {/* Official Factory Direct Pricing & Dispatch Metrics */}
          <div className="bg-emerald-50/90 border border-emerald-200/90 p-4 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-emerald-800">
                Official Factory Direct Rate
              </div>
              <div className="text-xl font-display font-extrabold text-emerald-950 mt-0.5">
                ₹{product.pricePerKg}{' '}
                <span className="text-xs font-mono font-bold text-emerald-700">/ kg (Ex-Works)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono font-bold uppercase text-slate-500">
                Immediate Lot Availability
              </div>
              <div className="text-base font-display font-bold text-[#00335a]">
                {product.stockTonnes} MT Ready ({product.dispatchedFrom})
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              closeProductDetail();
              openQuoteModal(product);
            }}
            className="px-4 py-2 bg-[#00335a] hover:bg-[#174a78] text-white rounded-lg font-display text-xs font-bold transition-colors cursor-pointer"
          >
            Calculate Formal B2B Quote
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={closeProductDetail}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-display text-xs font-semibold transition-colors cursor-pointer"
            >
              Close Window
            </button>
            <a
              href={`https://wa.me/919925712098?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#00532b] hover:bg-[#003a1c] text-white rounded-lg font-display text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
