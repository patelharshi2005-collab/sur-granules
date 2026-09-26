import React, { useState } from 'react';
import { usePlant } from '../context/PlantContext';

export const ApplicationsPage: React.FC = () => {
  const { openQuoteModal, setCurrentPage } = usePlant();

  // Interactive advisor state
  const [selectedProcess, setSelectedProcess] = useState<'blow' | 'injection' | 'extrusion'>('blow');
  const [targetArticle, setTargetArticle] = useState('Industrial Carboy / Drum (20L - 210L)');
  const [targetStrength, setTargetStrength] = useState<'high-impact' | 'balanced' | 'rigid'>('high-impact');

  const recommendation = selectedProcess === 'blow'
    ? {
        polymer: 'Recycled HDPE Granules (0.2 MFI)',
        code: 'SG-HDPE-02',
        escr: 'Excellent (ESCR > 400 hrs)',
        barrelTemp: '175°C – 195°C',
        coolingTime: '22 – 28 seconds (calibrated parison)',
        reason: 'Low MFI (0.2) delivers outstanding parison stability and zero sag during large-volume blow moulding, with high stress-crack resistance against aggressive agro-chemicals and industrial solvents.',
      }
    : selectedProcess === 'extrusion'
    ? {
        polymer: 'Recycled HDPE Granules (0.2 MFI)',
        code: 'SG-HDPE-02',
        escr: 'Superior ring stiffness & hoop stress',
        barrelTemp: '180°C – 205°C',
        coolingTime: 'Continuous vacuum water bath',
        reason: 'High molecular weight distribution gives smooth bore finish, consistent wall thickness, and high circumferential crush resistance in electrical conduit and corrugated drainage pipe lines.',
      }
    : {
        polymer: 'Recycled PP Granules (0.2 Melt Flow)',
        code: 'SG-PP-02',
        escr: 'High Flexural Modulus & Heat Deflection',
        barrelTemp: '190°C – 220°C',
        coolingTime: '14 – 18 seconds (fast cycle)',
        reason: 'High rigidity, crisp mold replication, and high yield tensile strength make it ideal for stackable heavy-duty fruit/bottle crates, battery enclosures, and structural automotive components.',
      };

  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="w-full bg-[#ecf4ff] py-12 px-6 lg:px-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#d9e4f0] px-3 py-1 rounded text-slate-700 font-mono text-[11px] font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00532b]" />
            Industrial Processing Matrix
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#00335a] tracking-tight">
            Engineered Applications &amp; Machine Parameters
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            SUR GRANULES compounds are formulated specifically to match standard industrial machinery settings across blow moulding, twin-screw extrusion, and high-pressure injection plants.
          </p>
        </div>
      </section>

      {/* 4 Core Application Pillars */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Blow Moulding */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">oil_barrel</span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#00335a]">Blow Moulding</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Engineered for large hollow containers requiring zero wall thinning and excellent chemical barrier properties.
            </p>
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="font-semibold text-slate-800">Target Products:</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                <li>20L to 210L Chemical Drums</li>
                <li>Industrial Jerrycans &amp; Carboys</li>
                <li>Agrochemical Storage Bottles</li>
              </ul>
            </div>
          </div>

          {/* Injection Moulding */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">layers</span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#00335a]">Injection Moulding</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High tensile stiffness and predictable shrinkage rate for uniform dimension stability in multi-cavity moulds.
            </p>
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="font-semibold text-slate-800">Target Products:</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                <li>Heavy Stackable Industrial Crates</li>
                <li>Automotive Battery Casings</li>
                <li>Pails, Tubs &amp; Paint Containers</li>
              </ul>
            </div>
          </div>

          {/* Extrusion Lines */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">view_stream</span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#00335a]">Extrusion Profile</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Continuous melt homogeneity prevents die buildup and eliminates wall inclusions in high-speed extrusion lines.
            </p>
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="font-semibold text-slate-800">Target Products:</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                <li>Corrugated Electrical Conduits</li>
                <li>Agricultural Irrigation Pipes</li>
                <li>Protective Cable Sleeves</li>
              </ul>
            </div>
          </div>

          {/* Caps & Household */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#00335a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">token</span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#00335a]">Caps &amp; Closures</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tight dimensional tolerance prevents thread stripping and guarantees consistent torque on bottling capping lines.
            </p>
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="font-semibold text-slate-800">Target Products:</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                <li>Threaded Industrial Caps</li>
                <li>Tamper-Evident Ring Closures</li>
                <li>Household Utility Articles</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Machine & Grade Compatibility Advisor */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-blue-700">
              Technical Decision Support
            </span>
            <h2 className="font-display text-2xl font-bold text-[#00335a] mt-1">
              Interactive Machine &amp; Grade Compatibility Advisor
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select your manufacturing methodology to simulate expected barrel temperature profiles, cycle times, and the optimum SUR GRANULES product match.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-2">
                  Select Machine Process
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'blow', label: 'Blow Moulding' },
                    { id: 'injection', label: 'Injection Moulding' },
                    { id: 'extrusion', label: 'Pipe Extrusion' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProcess(p.id as any)}
                      className={`py-3 px-3 rounded-lg font-display text-xs font-bold border transition-colors cursor-pointer text-center ${
                        selectedProcess === p.id
                          ? 'bg-[#174a78] text-white border-[#174a78]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Target Product Article
                </label>
                <input
                  type="text"
                  value={targetArticle}
                  onChange={(e) => setTargetArticle(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-2">
                  Desired Mechanical Characteristic
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'high-impact', label: 'High Impact / Drop Resistance' },
                    { id: 'balanced', label: 'Balanced ESCR & Rigidity' },
                    { id: 'rigid', label: 'Maximum Rigidity & Flex' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setTargetStrength(s.id as any)}
                      className={`p-2 rounded-lg font-medium text-[11px] border transition-colors text-center ${
                        targetStrength === s.id
                          ? 'bg-blue-50 border-blue-400 text-[#00335a] font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Recommended Configuration Box */}
            <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-mono text-xs uppercase font-bold text-slate-500">
                  Recommended Formulation
                </span>
                <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase">
                  Verified Lot Match
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-[#00335a]">
                  {recommendation.polymer}
                </h3>
                <span className="font-mono text-xs text-blue-700 font-bold block mt-0.5">
                  Code: {recommendation.code}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{recommendation.reason}</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold font-mono text-slate-400 block">
                    Recommended Melt Temp
                  </span>
                  <strong className="text-sm text-[#00335a] font-mono">
                    {recommendation.barrelTemp}
                  </strong>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold font-mono text-slate-400 block">
                    Cycle Dynamic
                  </span>
                  <strong className="text-sm text-emerald-700 font-mono">
                    {recommendation.coolingTime}
                  </strong>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => openQuoteModal()}
                  className="flex-1 h-11 bg-[#00335a] hover:bg-[#174a78] text-white rounded-lg font-display text-xs font-bold transition-colors shadow-xs"
                >
                  Request Commercial Quotation
                </button>
                <a
                  href={`https://wa.me/919925712098?text=${encodeURIComponent(
                    `Hello Jaimik Sur, I used the Machine Advisor for ${recommendation.polymer} (${recommendation.code}) for ${targetArticle}. Please share availability.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 h-11 bg-[#00532b] hover:bg-[#003a1c] text-white rounded-lg font-display text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
