import React, { useState, useMemo } from 'react';
import { usePlant } from '../context/PlantContext';
import { ProductItem } from '../types';
import { tdsMatrixData } from '../data/initialData';

export const ProductsPage: React.FC = () => {
  const {
    products,
    openProductDetail,
    openQuoteModal,
    openStockReport,
    setCurrentPage,
    settings,
    totalStockTonnes,
  } = usePlant();

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [materialFilter, setMaterialFilter] = useState<'all' | 'hdpe' | 'pp' | 'washed' | 'granules'>('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');
  const [packagingFilter, setPackagingFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.active) return false;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const text = `${product.name} ${product.code} ${product.polymerBase} ${product.packaging} ${product.applications.join(
          ' '
        )} ${product.colors.join(' ')}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      // Material
      if (materialFilter === 'hdpe' && product.code !== 'SG-HDPE-02') return false;
      if (materialFilter === 'pp' && product.code !== 'SG-PP-02') return false;
      if (materialFilter === 'washed' && product.code !== 'SG-WASH-01') return false;
      if (materialFilter === 'granules' && product.code !== 'SG-PREM-92') return false;

      // Color
      if (colorFilter !== 'all') {
        const matched = product.colors.some(
          (c) => c.toLowerCase() === colorFilter.toLowerCase()
        );
        if (!matched) return false;
      }

      return true;
    });
  }, [products, searchQuery, materialFilter, gradeFilter, colorFilter, packagingFilter, stockFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setMaterialFilter('all');
    setGradeFilter('all');
    setColorFilter('all');
    setPackagingFilter('all');
    setStockFilter('all');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Header Banner (Matching Stitch Image 2) */}
      <section className="w-full bg-[#ecf4ff] py-10 px-6 lg:px-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#d9e4f0] px-3 py-1 rounded text-slate-700 font-mono text-[11px] font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#00532b] animate-pulse" />
              Direct Dispatch • Ramnagar, Ankleshwar GIDC
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#00335a] tracking-tight">
              Recycled Plastic Granules
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Explore our recycled HDPE and PP granules for high-performance blow moulding, extrusion, and industrial injection manufacturing.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-xs border border-slate-200/80">
            <div className="w-12 h-12 rounded-lg bg-[#ecf4ff] flex items-center justify-center text-[#00335a]">
              <span className="material-symbols-outlined text-[28px]">inventory_2</span>
            </div>
            <div>
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Immediate Lot Availability
              </div>
              <div className="font-display text-lg font-bold text-[#00335a]">
                {totalStockTonnes >= 5 ? '5 – 10 Tonnes In-Stock' : `${totalStockTonnes} Tonnes Ready`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar (Matching Stitch Image 2) */}
      <section className="w-full bg-white shadow-xs sticky top-20 z-30 px-6 lg:px-12 py-4 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specs, polymers (HDPE, PP), application types, or packaging..."
                className="w-full h-11 pl-11 pr-4 bg-[#ecf4ff]/70 text-slate-800 rounded-lg text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 border border-slate-200 shadow-inner transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleResetFilters}
                className="px-3.5 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-[#00335a] rounded-lg font-display text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                Reset
              </button>

              <a
                href="https://wa.me/919925712098?text=Hello%20SUR%20GRANULES%2C%20I%20need%20immediate%20assistance%20with%20grade%20selection."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 h-11 bg-[#00532b] text-white hover:bg-[#003a1c] rounded-lg font-display text-xs font-bold inline-flex items-center gap-2 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
                Plant Engineer Desk
              </a>
            </div>
          </div>

          {/* Filter Dropdowns Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Material
              </label>
              <select
                value={materialFilter}
                onChange={(e) => setMaterialFilter(e.target.value as any)}
                className="h-10 px-3 bg-[#ecf4ff]/80 border border-slate-200 rounded text-xs text-slate-800 outline-none cursor-pointer"
              >
                <option value="all">All Materials (4 Ready)</option>
                <option value="hdpe">Recycled HDPE (₹80/kg)</option>
                <option value="pp">Recycled PP (₹77/kg)</option>
                <option value="washed">Washed Flakes (₹77/kg)</option>
                <option value="granules">Reprocessed Granules (₹92/kg)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Grade
              </label>
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="h-10 px-3 bg-[#ecf4ff]/80 border border-slate-200 rounded text-xs text-slate-800 outline-none cursor-pointer"
              >
                <option value="all">Grade 0.2 (Standard MFI)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Color Variant
              </label>
              <select
                value={colorFilter}
                onChange={(e) => setColorFilter(e.target.value)}
                className="h-10 px-3 bg-[#ecf4ff]/80 border border-slate-200 rounded text-xs text-slate-800 outline-none cursor-pointer"
              >
                <option value="all">All Available Colors</option>
                <option value="blue">Blue</option>
                <option value="white">White</option>
                <option value="off-white">Off-White</option>
                <option value="transparent">Transparent</option>
                <option value="greyish">Greyish</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Packaging Format
              </label>
              <select
                value={packagingFilter}
                onChange={(e) => setPackagingFilter(e.target.value)}
                className="h-10 px-3 bg-[#ecf4ff]/80 border border-slate-200 rounded text-xs text-slate-800 outline-none cursor-pointer"
              >
                <option value="all">50 kg HDPE Bags</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
              <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Inventory Status
              </label>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="h-10 px-3 bg-[#ecf4ff]/80 border border-slate-200 rounded text-xs text-slate-800 outline-none cursor-pointer"
              >
                <option value="all">In Stock (5–10 Tonnes)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Listing Section */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-bold text-[#00335a]">Catalog Listing</span>
            <span className="bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded font-mono text-[11px] font-bold">
              {filteredProducts.length} Product{filteredProducts.length === 1 ? '' : 's'} Verified
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px] font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00532b]" />
            ISO 9001:2015 Tested Lots
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProducts.map((product) => {
              const waUrl = `https://wa.me/919925712098?text=${encodeURIComponent(
                `Hello SUR GRANULES, I am interested in your ${product.name}. Required quantity: 5-10 tonnes. Please share price and availability.`
              )}`;

              return (
                <article
                  key={product.id}
                  className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
                >
                  <div>
                    {/* Visual Card Header */}
                    <div className="relative h-64 bg-slate-100">
                      <img
                        src={product.imageUrl}
                        alt={product.imageAlt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00335a]/90 via-[#00335a]/30 to-transparent" />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="bg-[#a2f5b9] text-[#00210e] font-mono text-xs font-bold px-3 py-1 rounded shadow-xs tracking-wider uppercase">
                          IN STOCK: {product.stockTonnes} TONNES
                        </span>
                        <span className="bg-amber-400 text-slate-950 font-mono text-xs font-black px-3 py-1 rounded shadow-xs uppercase tracking-wide flex items-center gap-1">
                          <span className="text-[10px] font-bold">SPOT:</span> ₹{product.pricePerKg} / kg
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <span className="font-mono text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
                            Product Code: {product.code}
                          </span>
                          <h2 className="font-display text-2xl font-bold text-white">
                            {product.name}
                          </h2>
                        </div>
                        <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-[#00335a] text-right shadow-xs">
                          <div className="font-mono text-[10px] uppercase font-bold text-slate-500">
                            Dispatched From
                          </div>
                          <div className="font-display text-xs font-bold">Ankleshwar GIDC</div>
                        </div>
                      </div>
                    </div>

                    {/* Technical Parameter Chips */}
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#ecf4ff]/60 p-4 rounded-lg border border-blue-100">
                        <div className="space-y-0.5">
                          <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                            Polymer Base
                          </span>
                          <div className="font-display text-xs font-bold text-[#00335a]">
                            {product.polymerBase}
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                            MFI / Grade
                          </span>
                          <div className="font-display text-xs font-bold text-[#00335a]">
                            {product.mfi}
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                            Dispatch Lead
                          </span>
                          <div className="font-display text-xs font-bold text-emerald-700">
                            {product.dispatchLead}
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                            Min Bulk Order
                          </span>
                          <div className="font-display text-xs font-bold text-[#00335a]">
                            {product.minBulkOrder}
                          </div>
                        </div>
                      </div>

                      {/* Official Spot Commercial Pricing Box */}
                      <div className="flex items-center justify-between p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200">
                        <div>
                          <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 block">
                            Official Factory Direct Rate
                          </span>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-2xl font-display font-extrabold text-emerald-950">
                              ₹{product.pricePerKg}
                            </span>
                            <span className="text-xs font-mono font-bold text-emerald-700">/ kg</span>
                            <span className="text-[11px] text-slate-500 ml-1">(Ex-Works Ankleshwar)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                            Standard 5 MT Lot
                          </span>
                          <span className="font-mono text-xs font-extrabold text-[#00335a]">
                            ₹{(product.pricePerKg * 5000).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Swatches */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold uppercase tracking-wider text-slate-500">
                            Available Color Pigments &amp; Natural Swatches
                          </span>
                          <span className="font-mono text-blue-700 font-bold">5 Formulations</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {product.colors.map((color) => (
                            <div
                              key={color}
                              className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs text-slate-800 shadow-2xs"
                            >
                              <span
                                className={`w-3.5 h-3.5 rounded-full border border-slate-300 ${
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

                      {/* Packaging Architecture */}
                      <div className="space-y-1.5">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Packaging Architecture
                        </span>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                          <span className="material-symbols-outlined text-[#174a78] text-[24px]">
                            shield
                          </span>
                          <span className="text-xs text-slate-700 leading-relaxed">
                            {product.packaging}
                          </span>
                        </div>
                      </div>

                      {/* Engineered Applications */}
                      <div className="space-y-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Engineered Applications
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.applications.map((app) => (
                            <span
                              key={app}
                              className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded font-medium"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => openProductDetail(product)}
                        className="h-11 px-4 bg-white hover:bg-slate-100 text-[#00335a] border border-slate-300 rounded-lg font-display text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">description</span>
                        <span>View Product Details</span>
                      </button>
                      <button
                        onClick={() => openQuoteModal(product)}
                        className="h-11 px-4 bg-[#00335a] text-white hover:bg-[#174a78] rounded-lg font-display text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">request_quote</span>
                        <span>Request B2B Quote</span>
                      </button>
                    </div>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-4 bg-[#00532b] text-white hover:bg-[#003a1c] rounded-lg font-display text-xs font-bold inline-flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>WhatsApp: 9925712098 • Instant Quote</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center space-y-4 bg-white rounded-xl border border-slate-200 shadow-xs">
            <span className="material-symbols-outlined text-[48px] text-slate-400">search_off</span>
            <h3 className="font-display text-xl font-bold text-[#00335a]">
              No Matching Formulations Found
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Adjust your search parameters or speak directly with our Ankleshwar plant laboratory for custom recycled polymer compounds.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#00335a] text-white rounded-lg font-display text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>Reset Catalog Filters</span>
            </button>
          </div>
        )}
      </section>

      {/* Industrial Procurement Guidelines (Matching Stitch Image 2) */}
      <section className="w-full bg-slate-100 py-12 px-6 lg:px-12 my-4 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-blue-700 font-bold">
                Industrial Procurement Guidelines
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#00335a] mt-0.5">
                Bulk Purchase &amp; Packaging Specification
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-2xs">
              <span className="material-symbols-outlined text-emerald-700 text-[20px]">
                local_shipping
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-700 font-bold">
                Daily Plant Dispatch Capacity: 40+ MT
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">inventory_2</span>
              </div>
              <h3 className="font-display text-base font-bold text-[#00335a]">Standard Supply</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Packed strictly in 50 kg heavy-gauge woven HDPE bags with inner moisture locks to prevent atmospheric hydration.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">scale</span>
              </div>
              <h3 className="font-display text-base font-bold text-[#00335a]">MOQ / Batch Lots</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard lot sizing: <strong>5 to 10 tonnes</strong> per order for immediate loading and dispatch from our ready inventory.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">hub</span>
              </div>
              <h3 className="font-display text-base font-bold text-[#00335a]">Logistics Hub</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                FOB Ramnagar, Ankleshwar (GIDC Industrial Hub), strategically connected to Western dedicated freight corridors.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">handshake</span>
              </div>
              <h3 className="font-display text-base font-bold text-[#00335a]">Annual Contracts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flexible standing purchase agreements and custom composite formulations reserved for long-term industrial processors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Material Specification Matrix (Grade 0.2) (Matching Stitch Image 2) */}
      <section className="w-full bg-white py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                Comparative Quality Control
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#00335a]">
                Material Specification Matrix (Grade 0.2)
              </h2>
            </div>
            <button
              onClick={openStockReport}
              className="inline-flex items-center gap-2 text-blue-700 hover:text-[#00335a] font-display text-xs font-bold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download Official Laboratory TDS Sheets</span>
            </button>
          </div>

          <div className="w-full overflow-x-auto rounded-xl shadow-xs border border-slate-200">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#00335a] text-white font-mono text-xs uppercase tracking-wider">
                  <th className="py-4 px-6">Physical &amp; Thermal Properties</th>
                  <th className="py-4 px-6">Test Method</th>
                  <th className="py-4 px-6">Recycled HDPE (Grade 0.2)</th>
                  <th className="py-4 px-6">Recycled PP (Grade 0.2)</th>
                  <th className="py-4 px-6">Testing Tolerance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {tdsMatrixData.map((row, idx) => (
                  <tr
                    key={row.property}
                    className={`transition-colors ${idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'} hover:bg-blue-50/50`}
                  >
                    <td className="py-4 px-6 font-semibold text-[#00335a]">{row.property}</td>
                    <td className="py-4 px-6 text-slate-500 font-mono text-xs uppercase">
                      {row.testMethod}
                    </td>
                    <td className="py-4 px-6 font-mono font-medium text-slate-900">{row.hdpe}</td>
                    <td className="py-4 px-6 font-mono font-medium text-slate-900">{row.pp}</td>
                    <td className="py-4 px-6 text-[#00532b] font-semibold text-xs">{row.tolerance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Direct Owner Channel CTA Section (Matching Stitch Image 2) */}
      <section className="w-full bg-[#00335a] text-white py-16 px-6 lg:px-12 my-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#174a78] px-3 py-1 rounded text-blue-100 font-mono text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-emerald-300">verified</span>
              Direct Owner Channel
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white">
              Need Bulk Volume or Custom Composite Formulation?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Contact <strong>{settings.ownerName}</strong> directly for contract supply pricing, test samples dispatch, or immediate plant pickup scheduling at Ramnagar, Ankleshwar.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-white/90">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-300 text-[20px]">
                  phone_in_talk
                </span>
                <span>Direct Desk: {settings.primaryPhone}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-300 text-[20px]">
                  mark_email_read
                </span>
                <span>{settings.officialEmail}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            <a
              href="https://wa.me/919925712098?text=Hello%20Jaimik%20Sur%2C%20I%20am%20reviewing%20the%20SUR%20GRANULES%20product%20catalog%20and%20require%20immediate%20commercial%20terms%20for%20a%20bulk%20consignment."
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-8 bg-[#00532b] hover:bg-[#003a1c] text-white rounded-xl font-display text-sm font-bold inline-flex items-center justify-center gap-3 shadow-lg transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[24px]">chat</span>
              <span>WhatsApp Direct: 9925712098</span>
            </a>
            <button
              onClick={() => setCurrentPage('request-a-quote')}
              className="h-14 px-8 bg-white hover:bg-slate-100 text-[#00335a] rounded-xl font-display text-sm font-bold inline-flex items-center justify-center gap-3 shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">calculate</span>
              <span>Calculate B2B Quote</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
