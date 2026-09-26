import React, { useState } from 'react';
import { usePlant } from '../context/PlantContext';
import { MediaAsset } from '../types';

export const GalleryPage: React.FC = () => {
  const { mediaAssets } = usePlant();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxAsset, setLightboxAsset] = useState<MediaAsset | null>(null);

  const categories = ['All', 'HDPE', 'PP', 'Facility', 'Packaging'];

  const filteredAssets = mediaAssets.filter((asset) => {
    if (activeCategory === 'All') return true;
    return asset.category === activeCategory;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Banner */}
      <section className="w-full bg-[#ecf4ff] py-12 px-6 lg:px-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#d9e4f0] px-3 py-1 rounded text-slate-700 font-mono text-[11px] font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00532b]" />
            Ankleshwar GIDC Plant Imagery
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#00335a] tracking-tight">
            Facility &amp; Polymer Pellet Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Authentic documentation of our granulation lines, polymer melt strands, classified pellet shapes, and 50 kg moisture-barrier packaging lots.
          </p>
        </div>
      </section>

      {/* Main Gallery */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg font-display text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#00335a] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setLightboxAsset(asset)}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={asset.imageUrl}
                  alt={asset.altText}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-display font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">zoom_in</span>
                    <span>Click to inspect pellet morphology</span>
                  </span>
                </div>
                <span className="absolute top-3 left-3 bg-[#00335a] text-white text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded shadow-xs">
                  {asset.category}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-display text-sm font-bold text-[#00335a]">{asset.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{asset.altText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxAsset && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxAsset(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/9 bg-slate-900">
              <img
                src={lightboxAsset.imageUrl}
                alt={lightboxAsset.altText}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setLightboxAsset(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 space-y-2 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-blue-700">
                  {lightboxAsset.category} • Certified Production Lot
                </span>
                <span className="text-xs text-slate-400 font-mono">Ramnagar Works, Ankleshwar</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#00335a]">
                {lightboxAsset.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lightboxAsset.altText}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
