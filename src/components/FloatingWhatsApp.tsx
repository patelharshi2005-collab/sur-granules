import React from 'react';
import { usePlant } from '../context/PlantContext';

export const FloatingWhatsApp: React.FC = () => {
  const { settings, totalStockTonnes } = usePlant();

  const message = encodeURIComponent(
    `Hello ${settings.ownerName} (${settings.companyName}), I am inquiring about recycled HDPE / PP granules immediate dispatch from your Ankleshwar facility. Available stock referenced: ${totalStockTonnes} MT.`
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <a
        href={`https://wa.me/919925712098?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Quick WhatsApp Enquiry"
        className="flex items-center gap-2 bg-[#00532b] hover:bg-[#003a1c] text-white shadow-xl px-4 py-3 rounded-full transition-all duration-200 border border-emerald-400/40 hover:scale-105 active:scale-95 group"
      >
        <span className="material-symbols-outlined text-[20px] text-emerald-300">chat</span>
        <span className="font-display text-xs font-bold whitespace-nowrap">Quick WhatsApp Enquiry</span>
      </a>
    </div>
  );
};
