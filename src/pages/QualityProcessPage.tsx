import React, { useState } from 'react';
import { usePlant } from '../context/PlantContext';
import { tdsMatrixData } from '../data/initialData';

export const QualityProcessPage: React.FC = () => {
  const { openStockReport, settings } = usePlant();
  const [selectedBatch, setSelectedBatch] = useState<'HDPE-02' | 'PP-02'>('HDPE-02');

  return (
    <div className="flex flex-col w-full">
      {/* Banner */}
      <section className="w-full bg-[#ecf4ff] py-12 px-6 lg:px-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#d9e4f0] px-3 py-1 rounded text-slate-700 font-mono text-[11px] font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00532b]" />
            ISO 9001:2015 &amp; ASTM Calibrated Laboratory
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#00335a] tracking-tight">
            Quality Assurance &amp; Reprocessing Controls
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Our Ankleshwar granulation unit operates on closed-loop thermal and rheological stabilization, ensuring strict adherence to Melt Flow Index tolerances (MFI 0.2 ± 0.05).
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-16">
        {/* Lab Testing Standards Cards */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase font-bold tracking-wider text-blue-700">
                Diagnostic Protocol
              </span>
              <h2 className="font-display text-2xl font-bold text-[#00335a]">
                ASTM Analytical Test Methods
              </h2>
            </div>
            <button
              onClick={openStockReport}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#00335a] hover:bg-[#174a78] text-white rounded-lg font-display text-xs font-bold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Generate Official TDS &amp; Stock Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                ASTM D1238
              </span>
              <h3 className="font-display text-base font-bold text-[#00335a]">
                Melt Flow Index (MFI)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extrusion plastometer testing at 190°C / 2.16kg load. Tested every 2 MT of production to guarantee batch-to-batch flow consistency within ± 4%.
              </p>
              <div className="text-xs font-mono font-bold text-[#00335a] pt-1">
                Calibrated Target: 0.20 g/10 min
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                ASTM D792
              </span>
              <h3 className="font-display text-base font-bold text-[#00335a]">
                Specific Gravity / Density
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Analytical electronic balance with Archimedean displacement verifies pure polymer crystallinity and excludes high-density mineral contamination.
              </p>
              <div className="text-xs font-mono font-bold text-[#00335a] pt-1">
                Range: 0.945 – 0.955 g/cm³
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                ASTM D638
              </span>
              <h3 className="font-display text-base font-bold text-[#00335a]">
                Tensile Modulus &amp; Yield
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Universal Testing Machine (UTM) testing ensures molded sample bars withstand the hoop stress required for 210-liter chemical drums and carboys.
              </p>
              <div className="text-xs font-mono font-bold text-[#00335a] pt-1">
                Standard: ≥ 22 MPa (HDPE)
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                INTERNAL SENSOR
              </span>
              <h3 className="font-display text-base font-bold text-[#00335a]">
                Karl Fischer Moisture
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-packaging halogen infrared moisture analyzer confirms pellets contain under 0.08% surface and cellular moisture before entering 50kg bags.
              </p>
              <div className="text-xs font-mono font-bold text-emerald-700 pt-1">
                Limit: &lt; 0.08% Pre-Dried
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Certificate of Analysis (COA) Inspector */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-blue-700">
                Batch Traceability Viewer
              </span>
              <h2 className="font-display text-2xl font-bold text-[#00335a] mt-0.5">
                Simulated Certificate of Analysis (COA)
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedBatch('HDPE-02')}
                className={`px-3 py-1.5 rounded-md font-display text-xs font-bold transition-colors cursor-pointer ${
                  selectedBatch === 'HDPE-02'
                    ? 'bg-white text-[#00335a] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lot SG-HDPE-02 (Blow Grade)
              </button>
              <button
                onClick={() => setSelectedBatch('PP-02')}
                className={`px-3 py-1.5 rounded-md font-display text-xs font-bold transition-colors cursor-pointer ${
                  selectedBatch === 'PP-02'
                    ? 'bg-white text-[#00335a] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lot SG-PP-02 (Injection Grade)
              </button>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/80 space-y-4 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3 text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Batch Number:</span>
                <strong className="text-slate-900 text-sm">
                  {selectedBatch === 'HDPE-02' ? 'ANK-HDPE-2026-B81' : 'ANK-PP-2026-B94'}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Testing Date:</span>
                <strong className="text-slate-900">September 2026 (Live Lot)</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Inspected By:</span>
                <strong className="text-slate-900">{settings.ownerName} / QC Lab</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">QC Status:</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
                  PASS - DISPATCH READY
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 bg-white rounded border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase">
                  Melt Flow Ratio (MFI)
                </span>
                <span className="text-sm font-bold text-[#00335a]">
                  {selectedBatch === 'HDPE-02' ? '0.205 g/10 min' : '0.218 g/10 min'}
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">
                  Within ± 0.05 limit
                </span>
              </div>
              <div className="p-3 bg-white rounded border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase">
                  Measured Density
                </span>
                <span className="text-sm font-bold text-[#00335a]">
                  {selectedBatch === 'HDPE-02' ? '0.948 g/cm³' : '0.904 g/cm³'}
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">Calibrated Range</span>
              </div>
              <div className="p-3 bg-white rounded border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase">Moisture Content</span>
                <span className="text-sm font-bold text-emerald-700">0.048%</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Passes limit (&lt; 0.08%)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Matrix Table */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-[#00335a]">
            Comparative Tolerance Matrix
          </h2>
          <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#00335a] text-white font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6">Physical &amp; Thermal Properties</th>
                  <th className="py-3 px-6">Test Method</th>
                  <th className="py-3 px-6">Recycled HDPE (0.2)</th>
                  <th className="py-3 px-6">Recycled PP (0.2)</th>
                  <th className="py-3 px-6">Tolerance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {tdsMatrixData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3.5 px-6 font-semibold text-[#00335a]">{row.property}</td>
                    <td className="py-3.5 px-6 font-mono text-xs text-slate-500">{row.testMethod}</td>
                    <td className="py-3.5 px-6 font-mono font-medium">{row.hdpe}</td>
                    <td className="py-3.5 px-6 font-mono font-medium">{row.pp}</td>
                    <td className="py-3.5 px-6 font-semibold text-emerald-700 text-xs">
                      {row.tolerance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
