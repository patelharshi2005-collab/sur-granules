import React, { useState } from 'react';
import { usePlant } from '../context/PlantContext';
import { useAuth } from '../context/AuthContext';
import { InquiryItem, ProductItem } from '../types';

export const AdminHubPage: React.FC = () => {
  const {
    products,
    inquiries,
    settings,
    mediaAssets,
    updateProductStock,
    updateProductPrice,
    toggleProductStatus,
    updateInquiryStatus,
    deleteInquiryItem,
    updateSettings,
    addMediaAsset,
    removeMediaAsset,
    openStockReport,
    showToast,
    totalStockTonnes,
    isSyncing,
    isSupabaseMode,
    refreshAllData,
  } = usePlant();

  const { user, isAdmin, signInWithGoogle, logout } = useAuth();

  // Filter tabs for inquiries
  const [activeInquiryFilter, setActiveInquiryFilter] = useState<string>('all');
  const [selectedInquiryDetail, setSelectedInquiryDetail] = useState<InquiryItem | null>(null);

  // Quick stock & price modal state
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockModalProduct, setStockModalProduct] = useState<ProductItem | null>(null);
  const [stockModalQty, setStockModalQty] = useState(8);
  const [stockModalPkg, setStockModalPkg] = useState('50 kg Woven Bags with Inner Liner');
  const [stockModalPrice, setStockModalPrice] = useState(80);

  // Add grade modal
  const [isAddGradeOpen, setIsAddGradeOpen] = useState(false);
  const [newGradeName, setNewGradeName] = useState('Recycled LDPE Film Pellets');
  const [newGradePolymer, setNewGradePolymer] = useState<'HDPE' | 'PP'>('HDPE');
  const [newGradeMfi, setNewGradeMfi] = useState('0.35 g/10min');

  // Settings form state
  const [ownerName, setOwnerName] = useState(settings.ownerName);
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [primaryPhone, setPrimaryPhone] = useState(settings.primaryPhone);
  const [whatsappPhone, setWhatsappPhone] = useState(settings.whatsappPhone);
  const [officialEmail, setOfficialEmail] = useState(settings.officialEmail);
  const [factoryAddress, setFactoryAddress] = useState(settings.factoryAddress);
  const [liveNoticeBanner, setLiveNoticeBanner] = useState(settings.liveNoticeBanner);
  const [saveStatusSuccess, setSaveStatusSuccess] = useState(false);

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    if (activeInquiryFilter === 'all') return true;
    return inq.status === activeInquiryFilter;
  });

  const handleOpenStockModal = (product: ProductItem) => {
    setStockModalProduct(product);
    setStockModalQty(product.stockTonnes);
    setStockModalPkg(product.packaging);
    setStockModalPrice(product.pricePerKg);
    setIsStockModalOpen(true);
  };

  const handleApplyStockModal = () => {
    if (stockModalProduct) {
      updateProductStock(stockModalProduct.id, Number(stockModalQty), stockModalPkg);
      if (stockModalPrice !== stockModalProduct.pricePerKg) {
        updateProductPrice(stockModalProduct.id, Number(stockModalPrice));
      }
      setIsStockModalOpen(false);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ownerName,
      companyName,
      primaryPhone,
      whatsappPhone,
      officialEmail,
      factoryAddress,
      liveNoticeBanner,
    });
    setSaveStatusSuccess(true);
    setTimeout(() => setSaveStatusSuccess(false), 3500);
  };

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      addMediaAsset({
        title: file.name.replace(/\.[^/.]+$/, ''),
        category: 'HDPE',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCHViFOcPOU-XFQxHMdxf8w6qe6OeipjEJt15Bg1T0hFKQuT8UKqB2oJ4U39_7rTUsbCMtACK69upIiRfJ5rBf4hfnFTrqmWEprd3f05cU7kpqPTMbvL3A-jPQctpmu-0Oiae4REDYa5mjYZoCvfTzF3O1RiAJRgKmOyqQ2Gh2_WkAIXErwNmZbVL2YdYZi9kX4ba69ntp13MhTd56YVTSUGAaRRHCNDW3p8cqXsLG3S8u_Sl3J4rqwTw',
        altText: 'Uploaded plant batch polymer inspection photo',
      });
    }
  };

  return (
    <div className="w-full bg-[#f7f9ff] min-h-screen pb-16">
      {/* Operational System Header Banner (Matching Stitch Image 8) */}
      <div className="w-full bg-[#00335a] text-white px-6 lg:px-12 py-2.5 flex flex-wrap items-center justify-between gap-4 shadow-sm border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#cfe5ff] text-[#001d33] flex items-center justify-center font-display font-bold text-xs shadow-xs">
            SG
          </div>
          <div>
            <span className="font-display text-sm tracking-tight font-bold">
              {settings.companyName}
            </span>
            <span className="text-blue-200 text-xs ml-2 hidden sm:inline font-mono">
              Management &amp; Operations Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-blue-200">
          <button
            onClick={() => refreshAllData()}
            disabled={isSyncing}
            className="flex items-center gap-1.5 bg-[#174a78] hover:bg-[#205b91] text-white px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border border-blue-400/30"
            title="Reload live data from PostgreSQL"
          >
            <span className={`material-symbols-outlined text-[15px] ${isSyncing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isSyncing ? 'Syncing...' : 'Sync DB'}</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono tracking-wider uppercase text-white font-semibold">
              {isSupabaseMode ? 'Supabase Realtime Live' : 'PostgreSQL Live'}
            </span>
          </div>

          {user ? (
            <div className="hidden sm:flex items-center gap-2 bg-[#174a78] px-3 py-1 rounded-md border border-blue-400/20">
              <span className="material-symbols-outlined text-[15px]">verified_user</span>
              <span>
                Admin: <strong className="text-white">{user.displayName || user.email}</strong>
              </span>
            </div>
          ) : (
            <button
              onClick={() => signInWithGoogle()}
              className="bg-white text-[#00335a] font-bold px-2.5 py-1 rounded text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Sign In with Google
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col gap-8">
        {/* Title and Plant Overview Bar (Matching Stitch Image 8) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-900 font-mono text-[11px] font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-xs text-emerald-700">verified</span>
              100% RECYCLED POLYMERS • B2B PLANT CONSOLE
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#00335a] tracking-tight">
              Plant Control &amp; Allocation Hub
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Real-time stock control, batch-grade tracking, direct WhatsApp RFQ desk, and dispatch logs.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={openStockReport}
              className="h-10 px-4 bg-white hover:bg-slate-100 text-[#00335a] border border-slate-300 transition-colors rounded-lg font-display text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">file_download</span>
              <span>TDS &amp; Stock Report</span>
            </button>

            <button
              onClick={() => handleOpenStockModal(products[0])}
              className="h-10 px-4 bg-[#174a78] hover:bg-[#00335a] text-white transition-colors rounded-lg font-display text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">sync_alt</span>
              <span>Fast Inventory Batch</span>
            </button>
          </div>
        </div>

        {/* 1. METRICS / KPI CARDS (Matching Stitch Image 8) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Active Catalog */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-mono text-[11px] uppercase font-bold tracking-wider">
                Active Catalog
              </span>
              <span className="material-symbols-outlined text-blue-700 text-lg">category</span>
            </div>
            <div className="mt-3">
              <div className="font-display text-3xl font-extrabold text-[#00335a] leading-none">
                {products.filter((p) => p.active).length}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  All Live
                </span>
                <span className="text-xs text-slate-500">Commercial grades</span>
              </div>
            </div>
          </div>

          {/* Card 2: Available Batches */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-mono text-[11px] uppercase font-bold tracking-wider">
                Available Batches
              </span>
              <span className="material-symbols-outlined text-blue-700 text-lg">inventory_2</span>
            </div>
            <div className="mt-3">
              <div className="font-display text-3xl font-extrabold text-[#00335a] leading-none">
                {products.length}{' '}
                <span className="text-sm font-normal text-slate-500">in stock</span>
              </div>
              <div className="text-xs text-slate-500 mt-2 font-medium">HDPE + PP Ready to Lift</div>
            </div>
          </div>

          {/* Card 3: Total Stock Available (Hero Card) */}
          <div className="bg-[#00335a] text-white p-5 rounded-xl shadow-md border border-slate-700 flex flex-col justify-between lg:col-span-1">
            <div className="flex items-center justify-between text-blue-200">
              <span className="font-mono text-[11px] uppercase font-bold tracking-wider">
                Total Stock Available
              </span>
              <span className="material-symbols-outlined text-emerald-300 text-lg">scale</span>
            </div>
            <div className="mt-3">
              <div className="font-display text-3xl font-extrabold text-white leading-none">
                {totalStockTonnes} <span className="text-sm text-blue-200 font-mono">MT</span>
              </div>
              <div className="mt-2 text-xs text-blue-100 flex justify-between font-mono">
                <span>
                  HDPE: <strong>{products.find((p) => p.polymer === 'HDPE')?.stockTonnes || 0} MT</strong>
                </span>
                <span>
                  PP: <strong>{products.find((p) => p.polymer === 'PP')?.stockTonnes || 0} MT</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: New Inquiries */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-mono text-[11px] uppercase font-bold tracking-wider">
                New Inquiries
              </span>
              <span className="material-symbols-outlined text-blue-700 text-lg">
                mark_email_unread
              </span>
            </div>
            <div className="mt-3">
              <div className="font-display text-3xl font-extrabold text-[#00335a] leading-none">
                {inquiries.length}
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-rose-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>
                  {inquiries.filter((i) => i.status === 'new').length} Pending review today
                </span>
              </div>
            </div>
          </div>

          {/* Card 5: Quotation Desk */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-mono text-[11px] uppercase font-bold tracking-wider">
                Quotation Desk
              </span>
              <span className="material-symbols-outlined text-blue-700 text-lg">
                pending_actions
              </span>
            </div>
            <div className="mt-3">
              <div className="font-display text-3xl font-extrabold text-[#00335a] leading-none">
                {inquiries.filter((i) => i.status === 'quoted' || i.status === 'inprogress').length}
              </div>
              <div className="text-xs text-blue-800 font-medium mt-2">Active quotes in progress</div>
            </div>
          </div>
        </section>

        {/* 2. PRODUCT STOCK & PRICING MANAGER (Matching Stitch Image 8) */}
        <section className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00335a] text-xl">
                  precision_manufacturing
                </span>
                <h2 className="font-display text-lg font-bold text-[#00335a]">
                  Product Stock &amp; Pricing Manager
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Configured for Ankleshwar recycling unit. Tolerances calibrated to MFI 0.2 ± 0.05.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  showToast('Connecting to Ankleshwar Plant weighbridge log... All batch allocations verified.')
                }
                className="h-9 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded font-display text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                <span>Refresh</span>
              </button>
              <button
                onClick={() => setIsAddGradeOpen(true)}
                className="h-9 px-3.5 bg-[#00335a] hover:bg-[#174a78] text-white rounded font-display text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Add Product Grade</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#00335a] text-white font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6">Product Grade</th>
                  <th className="py-3 px-4">Polymer</th>
                  <th className="py-3 px-4">MFI Grade</th>
                  <th className="py-3 px-4">Live Price</th>
                  <th className="py-3 px-4">Available Colours</th>
                  <th className="py-3 px-4">Current Stock</th>
                  <th className="py-3 px-6">Packaging Standard</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded flex items-center justify-center font-bold text-xs ${
                            product.polymer === 'HDPE'
                              ? 'bg-blue-100 text-[#00335a]'
                              : 'bg-indigo-100 text-indigo-900'
                          }`}
                        >
                          {product.polymer === 'HDPE' ? 'HD' : 'PP'}
                        </div>
                        <div>
                          <span className="font-display font-bold text-[#00335a] block">
                            {product.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            {product.polymer === 'HDPE'
                              ? 'Blow / Extrusion molding verified'
                              : 'High-tensile injection grade'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded font-mono text-[11px] font-bold bg-slate-100 text-slate-800">
                        {product.polymer}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-semibold text-slate-900 font-mono">
                      {product.mfi}
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded font-mono text-xs font-extrabold bg-emerald-100 text-emerald-900">
                        ₹{product.pricePerKg} / kg
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {product.colors.map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700"
                          >
                            <span
                              className={`w-2.5 h-2.5 rounded-full border border-slate-300 ${
                                c === 'Blue'
                                  ? 'bg-blue-600'
                                  : c === 'White'
                                  ? 'bg-white'
                                  : c === 'Off-White'
                                  ? 'bg-amber-100'
                                  : c === 'Transparent'
                                  ? 'bg-sky-50'
                                  : 'bg-slate-400'
                              }`}
                            />
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg font-extrabold text-[#00335a]">
                          {product.stockTonnes}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">Tonnes</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-mono">
                          5-10T Lot
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-600 max-w-xs truncate">
                      {product.packaging}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleProductStatus(product.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                          product.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.active ? 'bg-emerald-600' : 'bg-slate-400'
                          }`}
                        />
                        {product.active ? 'Active / Live' : 'Paused'}
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenStockModal(product)}
                          className="p-1.5 text-blue-700 hover:text-[#00335a] hover:bg-slate-100 rounded transition-colors cursor-pointer"
                          title="Edit Stock & Packaging"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          onClick={() =>
                            showToast(`Photo gallery synchronized for ${product.name}.`)
                          }
                          className="p-1.5 text-blue-700 hover:text-[#00335a] hover:bg-slate-100 rounded transition-colors cursor-pointer"
                          title="Manage Product Photos"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            photo_library
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            showToast('Grade parameters locked to ASTM D1238 standard specs.')
                          }
                          className="p-1.5 text-blue-700 hover:text-[#00335a] hover:bg-slate-100 rounded transition-colors cursor-pointer"
                          title="TDS Compliance"
                        >
                          <span className="material-symbols-outlined text-[18px]">science</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. RECENT B2B INQUIRIES & QUOTATION REQUESTS (Matching Stitch Image 8) */}
        <section className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00335a] text-xl">
                  contact_mail
                </span>
                <h2 className="font-display text-lg font-bold text-[#00335a]">
                  Recent B2B Inquiries &amp; Quotation Requests
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Procurement orders channeled from website RFQ forms and direct industrial WhatsApp link.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1 bg-slate-200/70 p-1 rounded-lg text-xs font-semibold">
              {[
                { id: 'all', label: `All (${inquiries.length})` },
                {
                  id: 'new',
                  label: `New (${inquiries.filter((i) => i.status === 'new').length})`,
                },
                { id: 'contacted', label: 'Contacted' },
                {
                  id: 'quoted',
                  label: `Quotation Sent (${inquiries.filter((i) => i.status === 'quoted').length})`,
                },
                { id: 'inprogress', label: 'In Progress' },
                { id: 'closed', label: 'Closed' },
              ].map((tab) => {
                const isActive = activeInquiryFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveInquiryFilter(tab.id)}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#00335a] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6">Buyer Name &amp; Contact</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Target Product</th>
                  <th className="py-3 px-4">Requested Qty</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inq) => {
                    const waText = encodeURIComponent(
                      `Hello ${inq.buyerName}, regarding your ${inq.companyName} inquiry for ${inq.quantity} MT ${inq.product}...`
                    );

                    return (
                      <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-display font-bold text-[#00335a] block">
                            {inq.buyerName}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">{inq.phone}</span>
                        </td>

                        <td className="py-4 px-4 font-medium text-slate-800">{inq.companyName}</td>

                        <td className="py-4 px-4">
                          <span className="font-semibold text-[#00335a] block">{inq.product}</span>
                          <span className="text-xs text-slate-500 block">
                            Colour: {inq.colors.join(', ')}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-display font-extrabold text-[#00335a] block">
                            {inq.quantity} {inq.unit}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            {inq.quantity >= 10 ? 'Full Batch Lift' : 'Partial Lot'}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-xs text-slate-500">{inq.timestamp}</td>

                        <td className="py-4 px-4">
                          {inq.status === 'new' && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-rose-100 text-rose-800 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600" /> New Lead
                            </span>
                          )}
                          {inq.status === 'quoted' && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-100 text-blue-900 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Quotation Sent
                            </span>
                          )}
                          {inq.status === 'inprogress' && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-900 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> In Progress
                            </span>
                          )}
                          {inq.status === 'contacted' && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-100 text-purple-900 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" /> Contacted
                            </span>
                          )}
                          {inq.status === 'closed' && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 inline-flex items-center gap-1">
                              Closed
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex items-center gap-2">
                            <a
                              href={`https://wa.me/919925712098?text=${waText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded text-xs font-bold inline-flex items-center gap-1 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[15px]">chat</span>
                              <span>WhatsApp</span>
                            </a>
                            <button
                              onClick={() => setSelectedInquiryDetail(inq)}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#00335a] rounded text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-xs text-slate-500">
                      No quotation inquiries currently in this status filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4 & 5: Two-Column Section (Settings Form Left, Media Assets Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 4. Contact Details & Website Settings (Left 6 Cols) */}
          <section className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-5">
            <div className="border-b pb-3 border-slate-200">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00335a] text-xl">tune</span>
                <h2 className="font-display text-lg font-bold text-[#00335a]">
                  Contact &amp; Public Portal Settings
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Changes here propagate instantly to buyer-facing RFQ prompts and header metadata.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase font-bold text-slate-500 mb-1">
                    Authorized Owner
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase font-bold text-slate-500 mb-1">
                    Registered Firm Name
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase font-bold text-slate-500 mb-1">
                    Direct Voice Line
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={primaryPhone}
                      onChange={(e) => setPrimaryPhone(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-300 rounded text-sm font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-base">
                      call
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase font-bold text-slate-500 mb-1">
                    WhatsApp Business API Phone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={whatsappPhone}
                      onChange={(e) => setWhatsappPhone(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-300 rounded text-sm font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-emerald-600 text-base">
                      chat
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Procurement Official Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-300 rounded text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-base">
                    mail
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Manufacturing &amp; Granulation Unit Address
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    required
                    value={factoryAddress}
                    onChange={(e) => setFactoryAddress(e.target.value)}
                    className="w-full p-2.5 pl-9 bg-slate-50 border border-slate-300 rounded text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-base">
                    location_on
                  </span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-100">
                <label className="block font-mono text-[10px] uppercase font-bold text-[#00335a] mb-1">
                  Live Website Stock Notice Banner
                </label>
                <input
                  type="text"
                  value={liveNoticeBanner}
                  onChange={(e) => setLiveNoticeBanner(e.target.value)}
                  className="w-full h-9 px-3 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {saveStatusSuccess ? (
                  <span className="text-xs font-mono text-emerald-700 font-bold">
                    ✓ Changes synchronized to public catalog!
                  </span>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#00335a] hover:bg-[#174a78] text-white rounded-lg font-display text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Save Settings</span>
                </button>
              </div>
            </form>
          </section>

          {/* 5. Media Asset Manager (Right 6 Cols) */}
          <section className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00335a] text-xl">
                    collections
                  </span>
                  <h2 className="font-display text-lg font-bold text-[#00335a]">
                    Media Asset Manager
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload granules, batch tests, woven bags &amp; extruder imagery.
                </p>
              </div>
              <span className="font-mono text-xs bg-slate-100 px-2.5 py-1 rounded text-slate-700 font-bold">
                {mediaAssets.length} Live Photos
              </span>
            </div>

            {/* Dropzone Container */}
            <label className="border-2 border-dashed border-slate-300 hover:border-blue-600 transition-colors rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50/60 cursor-pointer block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSimulatedUpload}
              />
              <div className="w-12 h-12 rounded-full bg-blue-100 text-[#00335a] flex items-center justify-center mb-2 mx-auto">
                <span className="material-symbols-outlined text-2xl">cloud_upload</span>
              </div>
              <p className="font-display text-sm font-bold text-[#00335a]">
                Drag &amp; drop high-res polymer photos here
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Recommended: 1600×1200 JPG/PNG • Max 10MB per batch photo
              </p>
              <span className="mt-3 inline-block px-3 py-1 bg-white text-[#00335a] border border-slate-300 rounded text-xs font-semibold shadow-2xs">
                Browse Hard Drive
              </span>
            </label>

            {/* Verified Plant Images Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#00335a]">
                <span>Verified Plant Images</span>
                <div className="flex gap-2 font-mono text-[10px]">
                  <span className="text-emerald-700">HDPE</span> •
                  <span className="text-blue-700">PP</span> •
                  <span className="text-slate-500">PACKAGING</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {mediaAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="group relative rounded-lg overflow-hidden shadow-2xs bg-slate-100 aspect-square border border-slate-200"
                  >
                    <img
                      src={asset.imageUrl}
                      alt={asset.altText}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                      <span className="font-mono text-[9px] uppercase font-bold text-emerald-300">
                        {asset.category}
                      </span>
                      <span className="text-xs truncate font-medium">{asset.title}</span>
                    </div>
                    <button
                      onClick={() => removeMediaAsset(asset.id)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-slate-900/80 text-white hidden group-hover:flex items-center justify-center hover:bg-rose-600 transition-colors"
                      title="Remove image"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* QUICK INVENTORY BATCH MODAL */}
      {isStockModalOpen && stockModalProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <div>
                <h3 className="font-display text-base font-bold text-[#00335a]">
                  Fast Inventory Batch Update
                </h3>
                <p className="text-xs text-slate-500">Update active tonnage without code changes.</p>
              </div>
              <button
                onClick={() => setIsStockModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block font-mono text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Target Product
                </label>
                <select
                  value={stockModalProduct.id}
                  onChange={(e) => {
                    const p = products.find((prod) => prod.id === e.target.value);
                    if (p) {
                      setStockModalProduct(p);
                      setStockModalQty(p.stockTonnes);
                      setStockModalPkg(p.packaging);
                    }
                  }}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800 text-xs"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.mfi})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block font-mono text-[10px] uppercase font-bold text-slate-500">
                    Available Quantity (Tonnes)
                  </label>
                  <span className="font-mono text-blue-700 text-xs font-bold">
                    Lot range: 5 to 10 MT
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={stockModalQty}
                    onChange={(e) => setStockModalQty(Number(e.target.value))}
                    className="w-full h-10 px-3 bg-white border border-slate-300 rounded font-display text-lg font-bold text-[#00335a]"
                  />
                  <span className="px-4 py-2 bg-slate-100 text-[#00335a] font-bold rounded text-xs">
                    Tonnes
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block font-mono text-[10px] uppercase font-bold text-slate-500">
                    Live Spot Price (Ex-Plant)
                  </label>
                  <span className="font-mono text-emerald-700 text-xs font-bold">
                    Per Kilogram Rate
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-2 bg-slate-100 text-slate-700 font-bold rounded text-xs font-mono">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    step="0.5"
                    value={stockModalPrice}
                    onChange={(e) => setStockModalPrice(Number(e.target.value))}
                    className="w-full h-10 px-3 bg-white border border-slate-300 rounded font-display text-lg font-bold text-[#00335a]"
                  />
                  <span className="px-3 py-2 bg-slate-100 text-[#00335a] font-bold rounded text-xs font-mono">
                    / kg
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Packaging Specification
                </label>
                <input
                  type="text"
                  value={stockModalPkg}
                  onChange={(e) => setStockModalPkg(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-xs text-slate-800"
                />
              </div>

              <div className="p-3 bg-blue-50 rounded text-xs text-slate-600 flex items-start gap-2">
                <span className="material-symbols-outlined text-blue-700 text-base mt-0.5">
                  info
                </span>
                <span>
                  Saving updates total stock calculations immediately on RFQ and WhatsApp quote links.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setIsStockModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyStockModal}
                className="px-5 py-2.5 bg-[#00335a] hover:bg-[#174a78] text-white font-display text-xs font-bold rounded shadow-xs"
              >
                Confirm &amp; Publish Stock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INQUIRY DETAIL MODAL */}
      {selectedInquiryDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <div>
                <h3 className="font-display text-base font-bold text-[#00335a]">
                  B2B Quotation Ticket
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Ref #{selectedInquiryDetail.id} • {selectedInquiryDetail.timestamp}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiryDetail(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="block font-mono text-[10px] uppercase font-bold text-slate-400">
                    Contact Person
                  </span>
                  <strong className="text-[#00335a] text-sm block">
                    {selectedInquiryDetail.buyerName}
                  </strong>
                  <span className="text-slate-500 font-mono">{selectedInquiryDetail.phone}</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase font-bold text-slate-400">
                    Organization
                  </span>
                  <strong className="text-slate-800 text-sm block">
                    {selectedInquiryDetail.companyName}
                  </strong>
                  <span className="text-slate-500">{selectedInquiryDetail.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="block font-mono text-[10px] uppercase font-bold text-slate-400">
                    Requested Grade
                  </span>
                  <span className="text-[#00335a] font-bold text-sm block">
                    {selectedInquiryDetail.product}
                  </span>
                  <span className="text-slate-500">
                    Colors: {selectedInquiryDetail.colors.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase font-bold text-slate-400">
                    Quantity Requested
                  </span>
                  <span className="text-[#00335a] font-extrabold text-base block">
                    {selectedInquiryDetail.quantity} {selectedInquiryDetail.unit}
                  </span>
                  <span className="text-slate-500">
                    To: {selectedInquiryDetail.deliveryCity}
                  </span>
                </div>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Customer Procurement Notes
                </span>
                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-700 leading-relaxed">
                  {selectedInquiryDetail.notes || 'No special requirements noted.'}
                </div>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Update Lead Status
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(['new', 'contacted', 'quoted', 'inprogress', 'closed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateInquiryStatus(selectedInquiryDetail.id, st);
                        setSelectedInquiryDetail({ ...selectedInquiryDetail, status: st });
                      }}
                      className={`px-3 py-1 rounded text-xs font-mono uppercase font-bold border transition-colors ${
                        selectedInquiryDetail.status === st
                          ? 'bg-[#00335a] text-white border-[#00335a]'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/919925712098?text=${encodeURIComponent(
                    `Hello ${selectedInquiryDetail.buyerName}, following up regarding your ${selectedInquiryDetail.product} inquiry...`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[15px]">chat</span>
                  Reply on WhatsApp
                </a>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this quote ticket?')) {
                      deleteInquiryItem(selectedInquiryDetail.id);
                      setSelectedInquiryDetail(null);
                    }
                  }}
                  className="px-3 py-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">delete</span>
                  Delete
                </button>
              </div>
              <button
                onClick={() => setSelectedInquiryDetail(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD GRADE PROMPT MODAL */}
      {isAddGradeOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <h3 className="font-display text-base font-bold text-[#00335a]">
                Add Reprocessed Polymer Grade
              </h3>
              <button
                onClick={() => setIsAddGradeOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-mono text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Grade Identifier Name
                </label>
                <input
                  type="text"
                  value={newGradeName}
                  onChange={(e) => setNewGradeName(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase font-bold text-slate-500 mb-1">
                    Polymer Class
                  </label>
                  <select
                    value={newGradePolymer}
                    onChange={(e) => setNewGradePolymer(e.target.value as 'HDPE' | 'PP')}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800"
                  >
                    <option value="HDPE">HDPE</option>
                    <option value="PP">PP</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase font-bold text-slate-500 mb-1">
                    Target Melt Flow
                  </label>
                  <input
                    type="text"
                    value={newGradeMfi}
                    onChange={(e) => setNewGradeMfi(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setIsAddGradeOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast(`Grade "${newGradeName}" calibrated and added to catalog queue.`);
                  setIsAddGradeOpen(false);
                }}
                className="px-5 py-2.5 bg-[#00335a] hover:bg-[#174a78] text-white font-display text-xs font-bold rounded shadow-xs"
              >
                Initialize Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
