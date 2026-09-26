import React, { useState, useMemo, useEffect } from 'react';
import { usePlant } from '../context/PlantContext';
import { useAuth } from '../context/AuthContext';

export const QuoteCalculatorPage: React.FC = () => {
  const { products, settings, addNewInquiry } = usePlant();
  const { user, dbUser } = useAuth();

  const [selectedPolymer, setSelectedPolymer] = useState<'HDPE' | 'PP' | 'WASHED' | 'GRANULES'>('HDPE');
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [tonnes, setTonnes] = useState(10);
  const [destinationRegion, setDestinationRegion] = useState('gujarat');
  const [buyerName, setBuyerName] = useState(user?.displayName || dbUser?.name || '');
  const [companyName, setCompanyName] = useState(dbUser?.company || '');
  const [buyerPhone, setBuyerPhone] = useState(dbUser?.phone || '');
  const [buyerEmail, setBuyerEmail] = useState(user?.email || '');
  const [additionalNotes, setAdditionalNotes] = useState('');

  useEffect(() => {
    if (user) {
      if (!buyerName) setBuyerName(user.displayName || dbUser?.name || '');
      if (!buyerEmail) setBuyerEmail(user.email || '');
    }
  }, [user, dbUser]);

  // Official factory rates: Washed: ₹77/kg, HDPE: ₹80/kg, PP: ₹77/kg, Granules: ₹92/kg
  const polymerMeta: Record<
    'HDPE' | 'PP' | 'WASHED' | 'GRANULES',
    { label: string; ratePerKg: number; ratePerMT: number; desc: string; mfi: string }
  > = {
    HDPE: {
      label: 'Recycled HDPE Granules',
      ratePerKg: 80,
      ratePerMT: 80000,
      desc: 'Blow moulding carboys/drums & extrusion lines',
      mfi: '0.2 g/10min',
    },
    PP: {
      label: 'Recycled PP Granules',
      ratePerKg: 77,
      ratePerMT: 77000,
      desc: 'Injection moulding crates, battery casings & pails',
      mfi: '0.2 Melt Flow',
    },
    WASHED: {
      label: 'Hot-Washed Polymer Flakes',
      ratePerKg: 77,
      ratePerMT: 77000,
      desc: 'High purity washed flakes ready for compounding & extruder feed',
      mfi: '0.2 - 0.4 g/10min',
    },
    GRANULES: {
      label: 'Premium Reprocessed Granules',
      ratePerKg: 92,
      ratePerMT: 92000,
      desc: 'Ultra-clean compounded pellets with high gloss & dimensional tolerance',
      mfi: '0.2 ± 0.03 g/10min',
    },
  };

  const currentPolymer = polymerMeta[selectedPolymer];
  const baseRatePerMT = currentPolymer.ratePerMT;

  // Freight estimates from Ankleshwar per MT
  const freightRates: Record<string, { label: string; ratePerMT: number; transitHours: string }> = {
    gujarat: { label: 'Gujarat Industrial Belt (Surat/Dahej/Baroda/Ahmd)', ratePerMT: 1200, transitHours: '12 – 24 Hours' },
    maharashtra: { label: 'Maharashtra & Mumbai (Bhiwandi/Palghar/Pune)', ratePerMT: 2200, transitHours: '24 – 36 Hours' },
    rajasthan_mp: { label: 'Rajasthan & Madhya Pradesh (Indore/Jaipur)', ratePerMT: 3400, transitHours: '36 – 48 Hours' },
    north: { label: 'North India & Delhi NCR Corridor', ratePerMT: 4600, transitHours: '48 – 72 Hours' },
    south: { label: 'South India Hub (Hyderabad/Bangalore/Chennai)', ratePerMT: 5200, transitHours: '60 – 80 Hours' },
  };

  const selectedFreight = freightRates[destinationRegion] || freightRates.gujarat;

  const calculations = useMemo(() => {
    const rawMaterialTotal = tonnes * baseRatePerMT;
    const freightTotal = tonnes * selectedFreight.ratePerMT;
    const subtotal = rawMaterialTotal + freightTotal;
    const gst18 = Math.round(subtotal * 0.18);
    const landedTotal = subtotal + gst18;
    const landedPerKg = (landedTotal / (tonnes * 1000)).toFixed(2);

    return {
      rawMaterialTotal,
      freightTotal,
      subtotal,
      gst18,
      landedTotal,
      landedPerKg,
    };
  }, [tonnes, baseRatePerMT, selectedFreight]);

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (buyerName && companyName && buyerPhone) {
      addNewInquiry({
        buyerName,
        companyName,
        email: buyerEmail || 'not-provided@b2b.com',
        phone: buyerPhone,
        product: `Recycled ${selectedPolymer} Granules`,
        grade: '0.2',
        quantity: tonnes,
        unit: 'MT',
        colors: [selectedColor],
        application: 'Calculated Commercial Allocation',
        deliveryCity: selectedFreight.label,
        notes: `Estimated Landed: ₹${calculations.landedTotal.toLocaleString('en-IN')} (approx ₹${calculations.landedPerKg}/kg). ${additionalNotes}`,
      });
    }

    const text = encodeURIComponent(
      `*COMMERCIAL RFQ - SUR GRANULES*\n` +
      `-----------------------------------\n` +
      `*Buyer:* ${buyerName || 'Buyer'}\n` +
      `*Company:* ${companyName || 'Industrial Firm'}\n` +
      `*Phone:* ${buyerPhone || 'N/A'}\n` +
      `*Polymer:* Recycled ${selectedPolymer} Granules (0.2 MFI)\n` +
      `*Color:* ${selectedColor}\n` +
      `*Quantity:* ${tonnes} Metric Tonnes (MT)\n` +
      `*Destination:* ${selectedFreight.label}\n` +
      `*Est. Freight:* ₹${calculations.freightTotal.toLocaleString('en-IN')} (${selectedFreight.transitHours})\n` +
      `*Est. Landed Total (incl 18% GST):* ₹${calculations.landedTotal.toLocaleString('en-IN')} (~₹${calculations.landedPerKg}/kg)\n` +
      (additionalNotes ? `*Notes:* ${additionalNotes}\n` : '') +
      `-----------------------------------\n` +
      `Please provide final formal proforma invoice & lot dispatch confirmation.`
    );

    window.open(`https://wa.me/919925712098?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Banner */}
      <section className="w-full bg-[#ecf4ff] py-12 px-6 lg:px-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#d9e4f0] px-3 py-1 rounded text-slate-700 font-mono text-[11px] font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00532b]" />
            B2B Procurement &amp; Freight Model
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#00335a] tracking-tight">
            Commercial Quotation &amp; Freight Estimator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Configure order tonnage, pellet color, and destination transit corridors to calculate estimated landed prices including GST and road freight from Ankleshwar GIDC.
          </p>
        </div>
      </section>

      {/* Calculator Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-display text-xl font-bold text-[#00335a] border-b border-slate-100 pb-3">
              1. Polymer &amp; Lot Specifications
            </h2>

            {/* Polymer Type */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-2">
                Polymer Base &amp; Melt Index
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPolymer('HDPE')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPolymer === 'HDPE'
                      ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/20 text-[#00335a]'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <strong className="block text-sm font-bold">Recycled HDPE (0.2 MFI)</strong>
                    <span className="font-mono text-xs font-extrabold text-[#00335a] bg-blue-100/80 px-2 py-0.5 rounded">
                      ₹80 / kg
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-1">For drums, carboys &amp; pipe extrusion</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPolymer('PP')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPolymer === 'PP'
                      ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/20 text-[#00335a]'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <strong className="block text-sm font-bold">Recycled PP (0.2 MFI)</strong>
                    <span className="font-mono text-xs font-extrabold text-[#00335a] bg-blue-100/80 px-2 py-0.5 rounded">
                      ₹77 / kg
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-1">For injection moulding, battery cases &amp; crates</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPolymer('WASHED')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPolymer === 'WASHED'
                      ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/20 text-[#00335a]'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <strong className="block text-sm font-bold">Washed Polymer Flakes</strong>
                    <span className="font-mono text-xs font-extrabold text-[#00335a] bg-blue-100/80 px-2 py-0.5 rounded">
                      ₹77 / kg
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-1">Clean regrind ready for extrusion feed</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPolymer('GRANULES')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPolymer === 'GRANULES'
                      ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/20 text-[#00335a]'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <strong className="block text-sm font-bold">Premium Reprocessed</strong>
                    <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      ₹92 / kg
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-1">Multi-filtered high-gloss granules</span>
                </button>
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-2">
                Pellet Color Variant
              </label>
              <div className="flex flex-wrap gap-2">
                {['Blue', 'White', 'Off-White', 'Transparent', 'Greyish'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      selectedColor === c
                        ? 'bg-[#174a78] text-white border-[#174a78]'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Tonnage Slider / Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-600">
                  Order Quantity (Metric Tonnes)
                </label>
                <span className="font-mono text-sm font-extrabold text-[#00335a]">
                  {tonnes} MT ({tonnes * 20} Bags of 50kg)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={tonnes}
                onChange={(e) => setTonnes(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#174a78]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                <span>5 MT (Min Lot)</span>
                <span>10 MT</span>
                <span>25 MT (Full Trailer)</span>
                <span>50 MT</span>
              </div>
            </div>

            {/* Destination Hub */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-2">
                Destination Transit Corridor (From Ankleshwar GIDC)
              </label>
              <select
                value={destinationRegion}
                onChange={(e) => setDestinationRegion(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
              >
                {Object.entries(freightRates).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label} (Est: ₹{val.ratePerMT}/MT)
                  </option>
                ))}
              </select>
            </div>

            <h2 className="font-display text-xl font-bold text-[#00335a] border-t border-slate-100 pt-4">
              2. Consignee Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Buyer Name
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. Rajesh Patel"
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Company / Factory Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Plastics"
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Mobile / WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="+91 99257..."
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Work Email (Optional)
                </label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="purchase@factory.com"
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                Custom Processing Requirements / Mesh Requirements
              </label>
              <textarea
                rows={2}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="State any specific ash content tolerance, melt temperature constraints, or packaging request..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Right Summary Breakdown Box (5 Cols) */}
          <div className="lg:col-span-5 bg-[#00335a] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-emerald-300">
                Commercial Landed Estimate
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                Proforma Estimation Slip
              </h3>
              <p className="text-xs text-blue-200 mt-1">
                FOB Ramnagar, Ankleshwar GIDC to {selectedFreight.label}
              </p>
            </div>

            <div className="space-y-3 border-y border-white/15 py-4 text-xs">
              <div className="flex items-center justify-between text-white/80">
                <span>Base Raw Material ({tonnes} MT @ ₹{baseRatePerMT.toLocaleString('en-IN')}/MT):</span>
                <span className="font-mono font-semibold text-white">
                  ₹{calculations.rawMaterialTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-white/80">
                <span>
                  Road Freight ({selectedFreight.transitHours}):
                </span>
                <span className="font-mono font-semibold text-white">
                  ₹{calculations.freightTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-white/80">
                <span>Subtotal (Ex-Works + Transport):</span>
                <span className="font-mono font-semibold text-white">
                  ₹{calculations.subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-emerald-300">
                <span>Applicable GST (18% Input Credit Eligible):</span>
                <span className="font-mono font-semibold">
                  + ₹{calculations.gst18.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-4 bg-white/10 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-bold text-blue-200">
                  Estimated Landed Value
                </span>
                <span className="text-2xl font-display font-extrabold text-white">
                  ₹{calculations.landedTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-[11px] text-emerald-300 font-mono text-right">
                Approx ₹{calculations.landedPerKg} per KG (all inclusive)
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full h-12 bg-[#00532b] hover:bg-[#003a1c] text-white rounded-xl font-display text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Send Estimate to Jaimik Sur via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full h-10 bg-white/10 hover:bg-white/20 text-white rounded-xl font-display text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">print</span>
                <span>Print Quotation Slip</span>
              </button>
            </div>

            <p className="text-[11px] text-white/60 leading-relaxed text-center">
              Estimates are indicative based on spot raw material indices. Actual invoices issued in GST compliant invoice format by SUR GRANULES, Ankleshwar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
