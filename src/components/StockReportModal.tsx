import React from 'react';
import { usePlant } from '../context/PlantContext';
import { tdsMatrixData } from '../data/initialData';

export const StockReportModal: React.FC = () => {
  const { isStockReportOpen, closeStockReport, products, settings, totalStockTonnes } = usePlant();

  if (!isStockReportOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 print:p-0 print:bg-white"
      onClick={closeStockReport}
    >
      <div
        className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-300 print:shadow-none print:border-none print:max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Printable Certificate & Report Header */}
        <div className="bg-[#00335a] text-white p-6 print:bg-white print:text-slate-900 print:border-b-2 print:border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-300 print:text-slate-600">
                Official Plant Certification &amp; Inventory Report
              </div>
              <h2 className="font-display text-2xl font-bold mt-1 text-white print:text-slate-900">
                SUR GRANULES • ANKLESHWAR WORKS
              </h2>
              <p className="text-xs text-blue-200 print:text-slate-500 mt-0.5">
                Ramnagar Industrial Area, Ankleshwar GIDC, Gujarat - 393002 | ISO 9001:2015 Unit
              </p>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 print:bg-slate-100 print:text-slate-900 border border-emerald-400/30 px-2.5 py-1 rounded text-xs font-mono font-bold uppercase">
                Ready Dispatch: {totalStockTonnes} MT
              </span>
              <button
                onClick={closeStockReport}
                className="print:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto print:max-h-none print:overflow-visible">
          {/* Metadata bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block uppercase font-mono text-[10px]">
                Report Date
              </span>
              <strong className="text-slate-800">September 26, 2026</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-mono text-[10px]">
                Plant Authority
              </span>
              <strong className="text-slate-800">{settings.ownerName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-mono text-[10px]">
                Quality Standard
              </span>
              <strong className="text-slate-800">ASTM D1238 Calibrated</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-mono text-[10px]">
                Dispatch Readiness
              </span>
              <strong className="text-emerald-700">Immediate Carrier Loading</strong>
            </div>
          </div>

          {/* Current Batch Allocations Table */}
          <div>
            <h3 className="text-sm font-display font-bold uppercase text-[#00335a] mb-2">
              1. Current Available Stock &amp; Packaging Breakdown
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#00335a] text-white font-mono uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Grade Code</th>
                    <th className="py-2.5 px-3">Polymer Base</th>
                    <th className="py-2.5 px-3">Standard MFI</th>
                    <th className="py-2.5 px-3">Allocated Stock</th>
                    <th className="py-2.5 px-3">Packaging</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{p.code}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{p.name}</td>
                      <td className="py-2.5 px-3 font-mono">{p.mfi}</td>
                      <td className="py-2.5 px-3 font-bold text-blue-900">{p.stockTonnes} MT</td>
                      <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate">{p.packaging}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Live Ready
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Technical Data Sheet ASTM Properties */}
          <div>
            <h3 className="text-sm font-display font-bold uppercase text-[#00335a] mb-2">
              2. Verified Laboratory Specification Matrix (Grade 0.2 Standard)
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-800 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="py-2 px-3">Property</th>
                    <th className="py-2 px-3">Test Method</th>
                    <th className="py-2 px-3">Recycled HDPE (0.2)</th>
                    <th className="py-2 px-3">Recycled PP (0.2)</th>
                    <th className="py-2 px-3">Batch Tolerance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tdsMatrixData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-medium text-slate-800">{row.property}</td>
                      <td className="py-2 px-3 font-mono text-slate-500 uppercase">{row.testMethod}</td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-900">{row.hdpe}</td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-900">{row.pp}</td>
                      <td className="py-2 px-3 font-mono text-emerald-700">{row.tolerance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quality Disclaimer & Signature */}
          <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-4 text-xs text-slate-600">
            <div>
              <p className="font-semibold text-slate-800 mb-1">Testing Conditions &amp; Moisture:</p>
              <p>
                Samples tested according to standard ASTM conditioning parameters. Material dried below
                0.08% moisture and packed in heavy-duty polyethylene lined moisture-barrier woven bags.
              </p>
            </div>
            <div className="text-right">
              <div className="inline-block border-t border-slate-400 pt-1 mt-6">
                <span className="font-bold text-slate-900 block font-display">Jaimik Sur</span>
                <span className="text-[11px] text-slate-500">Authorized Technical In-Charge</span>
                <span className="text-[10px] text-slate-400 block">SUR GRANULES • Ankleshwar Unit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between print:hidden">
          <span className="text-xs text-slate-500">
            Direct Plant Line: <strong>+91 9925712098</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={closeStockReport}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
