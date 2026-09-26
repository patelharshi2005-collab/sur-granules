import React, { useState } from 'react';
import { usePlant } from '../context/PlantContext';
import { Logo } from '../components/Logo';
import { livePolymerPrices } from '../data/initialData';
import heroPlantBgImg from '../assets/images/hero_plant_bg_1790415154146.jpg';

export const HomePage: React.FC = () => {
  const { setCurrentPage, products, settings, totalStockTonnes, openProductDetail, openQuoteModal } =
    usePlant();

  // Quick estimator state in hero supporting all 4 polymer grades
  const [quickPolymer, setQuickPolymer] = useState<'HDPE' | 'PP' | 'WASHED' | 'GRANULES'>('HDPE');
  const [quickQty, setQuickQty] = useState('10');
  const [quickApp, setQuickApp] = useState('Blow Moulding');

  const getQuickRate = () => {
    switch (quickPolymer) {
      case 'WASHED':
        return 77;
      case 'HDPE':
        return 80;
      case 'PP':
        return 77;
      case 'GRANULES':
        return 92;
      default:
        return 80;
    }
  };

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProduct =
      products.find((p) => {
        if (quickPolymer === 'HDPE') return p.code === 'SG-HDPE-02';
        if (quickPolymer === 'PP') return p.code === 'SG-PP-02';
        if (quickPolymer === 'WASHED') return p.code === 'SG-WASH-01';
        if (quickPolymer === 'GRANULES') return p.code === 'SG-PREM-92';
        return true;
      }) || products[0];
    openQuoteModal(targetProduct);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Live Plant Stock Notification Banner */}
      {settings.liveNoticeBanner && (
        <div className="w-full bg-[#174a78] text-white px-4 py-2 text-xs font-mono text-center flex items-center justify-center gap-2 border-b border-white/10 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wide">{settings.liveNoticeBanner}</span>
        </div>
      )}

      {/* Hero Section with 2nd Photo Background */}
      <section className="relative w-full py-16 lg:py-24 px-6 lg:px-12 border-b border-slate-200/80 overflow-hidden text-white">
        {/* Background photo (compounding extrusion line) with high-clarity industrial grading */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100 transition-transform duration-1000"
          style={{ backgroundImage: `url(${heroPlantBgImg})` }}
        />
        {/* Deep Industrial Gradient Overlay for High Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001e38]/95 via-[#002d4f]/90 to-[#001424]/85" />
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Direct Dispatch • Ramnagar, Ankleshwar GIDC
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Engineering-Grade Recycled <span className="text-emerald-300">HDPE &amp; PP Granules</span>
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl">
              Consistently calibrated to <strong>0.2 Melt Flow Index (MFI)</strong>. Manufactured in Ankleshwar for reliable high-speed extrusion, chemical container blow moulding, and heavy industrial injection manufacturing.
            </p>

            {/* Live Stock & Turnaround Highlight Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 max-w-xl">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xs">
                <span className="text-[10px] font-mono uppercase font-bold text-blue-200 block">
                  Ready Lot In-Stock
                </span>
                <span className="text-xl font-display font-extrabold text-white">
                  {totalStockTonnes} MT Ready
                </span>
                <span className="text-[11px] text-emerald-300 block mt-0.5 font-medium">
                  5 - 10 MT Batches
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xs">
                <span className="text-[10px] font-mono uppercase font-bold text-blue-200 block">
                  MFI Calibration
                </span>
                <span className="text-xl font-display font-extrabold text-white">
                  0.2 ± 0.05
                </span>
                <span className="text-[11px] text-blue-200 block mt-0.5">
                  ASTM D1238 Verified
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xs col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase font-bold text-blue-200 block">
                  Dispatch Lead
                </span>
                <span className="text-xl font-display font-extrabold text-emerald-300">
                  24–48 Hours
                </span>
                <span className="text-[11px] text-blue-200 block mt-0.5">
                  Direct Highway NH-48
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentPage('products')}
                className="h-12 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-display text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:shadow-xl active:scale-95"
              >
                <span>Browse Products &amp; Pricing</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <a
                href="https://wa.me/919925712098?text=Hello%20Jaimik%20Sur%2C%20I%20am%20inquiring%20about%20immediate%20recycled%20granules%20dispatch."
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-6 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl font-display text-sm font-bold shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px] text-emerald-400">chat</span>
                <span>WhatsApp: 9925712098</span>
              </a>
            </div>
          </div>

          {/* Right Hero: Quick RFQ Configurator Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-[#00335a] text-white p-5 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-bold block mb-0.5">
                    Fast B2B Procurement Desk
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    Instant Lot Allocation Calculator
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-xl">calculate</span>
                </div>
              </div>

              <form onSubmit={handleQuickEstimate} className="p-6 space-y-4 text-sm">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-600">
                      Polymer &amp; Grade Selection
                    </label>
                    <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Live: ₹{getQuickRate()} / kg
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickPolymer('HDPE')}
                      className={`py-2 px-2.5 rounded-lg font-display text-xs font-bold border transition-colors cursor-pointer text-left flex flex-col ${
                        quickPolymer === 'HDPE'
                          ? 'bg-[#174a78] text-white border-[#174a78]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-bold">HDPE (0.2 MFI)</span>
                      <span className={quickPolymer === 'HDPE' ? 'text-emerald-300 text-[11px]' : 'text-slate-500 text-[11px]'}>
                        ₹80 / kg
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickPolymer('PP')}
                      className={`py-2 px-2.5 rounded-lg font-display text-xs font-bold border transition-colors cursor-pointer text-left flex flex-col ${
                        quickPolymer === 'PP'
                          ? 'bg-[#174a78] text-white border-[#174a78]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-bold">PP (0.2 MFI)</span>
                      <span className={quickPolymer === 'PP' ? 'text-emerald-300 text-[11px]' : 'text-slate-500 text-[11px]'}>
                        ₹77 / kg
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickPolymer('WASHED')}
                      className={`py-2 px-2.5 rounded-lg font-display text-xs font-bold border transition-colors cursor-pointer text-left flex flex-col ${
                        quickPolymer === 'WASHED'
                          ? 'bg-[#174a78] text-white border-[#174a78]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-bold">Washed Flakes</span>
                      <span className={quickPolymer === 'WASHED' ? 'text-emerald-300 text-[11px]' : 'text-slate-500 text-[11px]'}>
                        ₹77 / kg
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickPolymer('GRANULES')}
                      className={`py-2 px-2.5 rounded-lg font-display text-xs font-bold border transition-colors cursor-pointer text-left flex flex-col ${
                        quickPolymer === 'GRANULES'
                          ? 'bg-[#174a78] text-white border-[#174a78]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-bold">Reprocessed</span>
                      <span className={quickPolymer === 'GRANULES' ? 'text-emerald-300 text-[11px]' : 'text-slate-500 text-[11px]'}>
                        ₹92 / kg
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                      Required Tonnage
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="3"
                        max="100"
                        value={quickQty}
                        onChange={(e) => setQuickQty(e.target.value)}
                        className="w-full h-10 px-3 pr-10 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="absolute right-3 top-2.5 text-xs font-mono font-bold text-slate-500">
                        MT
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                      Application
                    </label>
                    <select
                      value={quickApp}
                      onChange={(e) => setQuickApp(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Blow Moulding">Blow Moulding</option>
                      <option value="Injection Moulding">Injection Moulding</option>
                      <option value="Extrusion">Extrusion Conduits</option>
                      <option value="Carboys & Drums">Carboys &amp; Drums</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Base Raw Material Cost:</span>
                    <strong className="text-[#00335a] font-mono">
                      ₹{((Number(quickQty) || 10) * getQuickRate() * 1000).toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Standard Lot Allocation:</span>
                    <strong className="text-slate-800 font-mono">5.0 to 10.0 Tonnes</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Dispatch Depot:</span>
                    <strong className="text-emerald-700">Ramnagar, Ankleshwar GIDC</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-[#174a78] hover:bg-[#00335a] text-white rounded-xl font-display text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span className="material-symbols-outlined text-[18px]">request_quote</span>
                  <span>Calculate Formal B2B Quotation</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Official Live Spot Polymer Price Board (Washed: 77, HDPE: 80, PP: 77, Granules: 92) */}
      <section className="w-full bg-[#f4f7fa] py-12 px-6 lg:px-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Live Industrial Spot Rates • Ankleshwar Ex-Plant
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#00335a] tracking-tight mt-1.5">
                Daily Polymer Pricing Board
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Current factory-direct dispatch prices for washed regrind and engineered granules. Transparent bulk rates with ready laboratory test certificates.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage('request-a-quote')}
                className="h-10 px-4 bg-[#00335a] text-white rounded-lg font-display text-xs font-bold flex items-center gap-1.5 hover:bg-[#174a78] transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">calculate</span>
                <span>Open Freight &amp; GST Estimator</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {livePolymerPrices.map((item) => (
              <div
                key={item.key}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-emerald-600 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Ready Lot
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#00335a]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5 line-clamp-1">
                    {item.polymer}
                  </p>

                  <div className="my-4 p-3.5 bg-blue-50/60 rounded-xl border border-blue-100">
                    <div className="text-[10px] font-mono uppercase font-bold text-slate-500">
                      Factory Dispatch Rate
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl font-display font-extrabold text-[#00335a]">
                        ₹{item.price}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-600">
                        / kg
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>Ex-Works Ankleshwar</span>
                      <span className="font-semibold text-slate-700 font-mono">MOQ: {item.moq}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.application}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      const matched = products.find((p) => p.code.toLowerCase().includes(item.key) || p.polymer.toLowerCase().includes(item.key));
                      openQuoteModal(matched || products[0]);
                    }}
                    className="w-full h-9 bg-[#174a78] hover:bg-[#00335a] text-white rounded-lg font-display text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                    <span>Lock In Rate @ ₹{item.price}/kg</span>
                  </button>
                  <a
                    href={`https://wa.me/919925712098?text=Hello%20SUR%20GRANULES%2C%20inquiring%20about%20${encodeURIComponent(item.title)}%20at%20Rs%20${item.price}%2Fkg%20for%20immediate%20dispatch.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-8 bg-[#00532b] hover:bg-[#003a1c] text-white rounded-lg font-display text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">chat</span>
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Scale & Credibility Bar */}
      <section className="w-full bg-[#00335a] text-white py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {settings.monthlyCapacity}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-200">
              Monthly Processing Capacity
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-300">
              40+ MT / Day
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-200">
              Plant Dispatch Capacity
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              ASTM Calibrated
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-200">
              D1238 / D792 Tested Lots
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-300">
              Ramnagar GIDC
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-200">
              Ankleshwar Polymer Hub
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section (Matching Stitch Image 2) */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-700 font-bold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Verified Commercial Polymer Grades
            </div>
            <h2 className="font-display text-3xl font-extrabold text-[#00335a] tracking-tight">
              Recycled Plastic Granules Catalog
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Strictly pre-sorted, washed, continuous-screen filtered, and laboratory analyzed for consistent melt flow and impact tolerance.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('products')}
            className="text-xs font-display font-bold uppercase tracking-wider text-[#174a78] hover:text-[#00335a] inline-flex items-center gap-1.5 self-start md:self-end cursor-pointer"
          >
            <span>View Complete Specifications</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-200"
            >
              <div>
                {/* Visual Banner */}
                <div className="relative h-64 bg-slate-100 overflow-hidden group">
                  <img
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00335a]/90 via-[#00335a]/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-[#a2f5b9] text-[#00210e] font-mono text-xs font-bold px-3 py-1 rounded shadow-xs uppercase tracking-wider">
                      IN STOCK: {product.stockTonnes} TONNES
                    </span>
                    <span className="bg-amber-400 text-slate-950 font-mono text-xs font-black px-3 py-1 rounded shadow-xs uppercase tracking-wide flex items-center gap-1">
                      <span className="text-[10px] font-bold">SPOT:</span> ₹{product.pricePerKg} / kg
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-blue-200 uppercase tracking-wider block">
                        Product Code: {product.code}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white">
                        {product.name}
                      </h3>
                    </div>
                    <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-[#00335a] text-right shadow-xs">
                      <div className="font-mono text-[9px] uppercase font-bold text-slate-500">
                        Dispatched From
                      </div>
                      <div className="font-display text-xs font-bold">Ankleshwar GIDC</div>
                    </div>
                  </div>
                </div>

                {/* Specs Sub-Grid */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                        Polymer Base
                      </span>
                      <div className="font-display text-xs font-bold text-[#00335a] mt-0.5">
                        {product.polymerBase}
                      </div>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                        MFI / Grade
                      </span>
                      <div className="font-display text-xs font-bold text-[#00335a] mt-0.5">
                        {product.mfi}
                      </div>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                        Dispatch Lead
                      </span>
                      <div className="font-display text-xs font-bold text-emerald-700 mt-0.5">
                        {product.dispatchLead}
                      </div>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                        Min Bulk Order
                      </span>
                      <div className="font-display text-xs font-bold text-[#00335a] mt-0.5">
                        {product.minBulkOrder}
                      </div>
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold uppercase tracking-wider text-slate-500">
                        Available Color Pigments &amp; Swatches
                      </span>
                      <span className="font-mono text-blue-700 font-bold">5 Formulations</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {product.colors.map((color) => (
                        <div
                          key={color}
                          className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700"
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

                  {/* Packaging */}
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#174a78] text-xl mt-0.5">
                      shield
                    </span>
                    <span className="text-xs text-slate-700 leading-relaxed">
                      {product.packaging}
                    </span>
                  </div>

                  {/* Applications */}
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                      Engineered Applications
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.applications.map((app) => (
                        <span
                          key={app}
                          className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => openProductDetail(product)}
                    className="h-11 px-4 bg-white hover:bg-slate-100 text-[#00335a] border border-slate-300 rounded-lg font-display text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">description</span>
                    <span>View Product Details</span>
                  </button>
                  <button
                    onClick={() => openQuoteModal(product)}
                    className="h-11 px-4 bg-[#00335a] hover:bg-[#174a78] text-white rounded-lg font-display text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">request_quote</span>
                    <span>Request B2B Quote</span>
                  </button>
                </div>
                <a
                  href={`https://wa.me/919925712098?text=Hello%20SUR%20GRANULES%2C%20I%20am%20interested%20in%20your%20${product.name}.%20Required%20quantity%3A%205-10%20tonnes.%20Please%20share%20price%20and%20availability.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-4 bg-[#00532b] hover:bg-[#003a1c] text-white rounded-lg font-display text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp: 9925712098 • Instant Quote</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Identity & Core Pillars Section */}
      <section className="w-full bg-gradient-to-b from-white via-blue-50/40 to-slate-50 py-16 px-6 lg:px-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Logo Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl blur-md opacity-25 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 flex flex-col items-center text-center">
                <Logo variant="full" size="lg" className="w-full" />
                <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Registered Mark</span>
                  <span className="font-bold text-[#00335a]">Ankleshwar, Gujarat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Pillars Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-100/70 text-[#00335a] font-mono text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-[#174a78]">eco</span>
              Brand Philosophy &amp; Engineering Creed
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#00335a] tracking-tight leading-tight">
              Recycle • Reprocess • Rebuild
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              At <strong>SUR GRANULES</strong>, our trademark reflects our complete closed-loop manufacturing cycle: from hot-washed polymer flakes to laboratory-calibrated 0.2 MFI granules engineered for high-throughput blow moulding and structural extrusion lines across India.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
                <span className="font-mono text-xs font-extrabold text-blue-700 uppercase tracking-wider block">
                  01. Recycle
                </span>
                <strong className="text-sm font-bold text-[#00335a] block">Pure Feedstock</strong>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Rigorous optical &amp; density segregation preventing polymer cross-contamination.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
                <span className="font-mono text-xs font-extrabold text-emerald-700 uppercase tracking-wider block">
                  02. Reprocess
                </span>
                <strong className="text-sm font-bold text-[#00335a] block">0.2 MFI Precision</strong>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dual vacuum degassing and 120-mesh screen melt filtration for pure melt flow.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
                <span className="font-mono text-xs font-extrabold text-[#00335a] uppercase tracking-wider block">
                  03. Rebuild
                </span>
                <strong className="text-sm font-bold text-[#00335a] block">Industrial Supply</strong>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Direct dispatch lots of 5 to 50 MT with ready certificates from Ankleshwar GIDC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closed-Loop Reprocessing Workflow */}
      <section className="w-full bg-slate-50 py-16 px-6 lg:px-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
              Ankleshwar Engineering Standards
            </span>
            <h2 className="font-display text-3xl font-extrabold text-[#00335a] tracking-tight">
              6-Stage Precision Reprocessing &amp; Pelletizing
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every batch undergoes strict density separation, high-temperature alkaline decontamination, continuous melt filtration, and ASTM D1238 laboratory calibration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center font-bold font-mono">
                01
              </div>
              <h3 className="font-display text-base font-bold text-[#00335a]">
                Polymer Segregation &amp; Optical Sorting
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Raw post-consumer and post-industrial feedstocks are segregated by polymer family (HDPE vs PP) and sorted by color shade to ensure minimal cross-contamination.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center font-bold font-mono">
                02
              </div>
              <h3 className="font-display text-base font-bold text-[#00335a]">
                Alkaline Hot Wash &amp; Hydro-Cleaning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-stage friction wash with alkaline surfactant dissolves adhesives, paper labels, and oil residues before high-speed centrifugal drying removes surface moisture.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center font-bold font-mono">
                03
              </div>
              <h3 className="font-display text-base font-bold text-[#00335a]">
                Twin-Screw Extrusion &amp; Degassing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-torque continuous extruder with dual vacuum vent ports extracts volatile organic compounds (VOCs) and moisture to stabilize polymer melt viscosity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center font-bold font-mono">
                04
              </div>
              <h3 className="font-display text-base font-bold text-[#00335a]">
                120-Mesh Continuous Screen Filtration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dual-piston hydraulic screen changer filters out microscopic particulate down to 120 mesh, guaranteeing zero nozzle clogging during high-speed moulding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center font-bold font-mono">
                05
              </div>
              <h3 className="font-display text-base font-bold text-[#00335a]">
                Strand &amp; Underwater Pelletizing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rotary micro-pelletizers form uniform, dust-free cylindrical polymer granules. Granules pass through vibrating classification screens to eliminate fines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center font-bold font-mono">
                06
              </div>
              <h3 className="font-display text-base font-bold text-[#00335a]">
                ASTM QA Verification &amp; 50kg Packing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Each batch is sampled for MFI (ASTM D1238) and density (ASTM D792). Accepted lots are heat-sealed inside 50 kg heavy-duty woven bags with moisture liners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Leadership Banner (Matching Stitch Image 2) */}
      <section className="w-full bg-[#00335a] text-white py-16 px-6 lg:px-12 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#174a78] px-3 py-1 rounded text-blue-100 font-mono text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-emerald-300">verified</span>
              Direct Owner Channel
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Need Bulk Volume or Custom Composite Formulation?
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
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
              href="https://wa.me/919925712098?text=Hello%20Jaimik%20Sur%2C%20I%20am%20inquiring%20about%20a%20bulk%20polymer%20consignment."
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
