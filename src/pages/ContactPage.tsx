import React, { useState } from 'react';
import { usePlant } from '../context/PlantContext';

export const ContactPage: React.FC = () => {
  const { settings, addNewInquiry } = usePlant();

  // Form states
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [productRequired, setProductRequired] = useState('Recycled HDPE Granules');
  const [gradeSpec, setGradeSpec] = useState('0.2');
  const [quantity, setQuantity] = useState('5');
  const [unit, setUnit] = useState<'MT' | 'KG'>('MT');
  const [selectedColours, setSelectedColours] = useState<string[]>(['Blue']);
  const [intendedApplication, setIntendedApplication] = useState('Blow Moulding');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [message, setMessage] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const availableColours = ['Blue', 'White', 'Off-White', 'Transparent', 'Greyish'];

  const toggleColour = (col: string) => {
    setSelectedColours((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const buildWhatsAppText = () => {
    let msg = `*NEW B2B ENQUIRY - SUR GRANULES*\n`;
    msg += `-----------------------------------\n`;
    msg += `*Buyer:* ${fullName || 'N/A'}\n`;
    msg += `*Company:* ${companyName || 'N/A'}\n`;
    msg += `*Contact:* ${phone || 'N/A'}\n`;
    if (whatsappNumber) msg += `*WhatsApp:* ${whatsappNumber}\n`;
    msg += `*Product:* ${productRequired}\n`;
    msg += `*Quantity:* ${quantity || 'Unspecified'} ${unit}\n`;
    msg += `*Grade Spec:* ${gradeSpec}\n`;
    msg += `*Colours:* ${selectedColours.length ? selectedColours.join(', ') : 'Standard'}\n`;
    msg += `*Application:* ${intendedApplication}\n`;
    msg += `*Delivery To:* ${deliveryLocation || 'N/A'}\n`;
    if (message) {
      msg += `*Notes:* ${message}\n`;
    }
    msg += `-----------------------------------\n`;
    msg += `Sent via SUR GRANULES B2B Portal`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppClick = () => {
    const text = buildWhatsAppText();
    window.open(`https://wa.me/919925712098?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addNewInquiry({
      buyerName: fullName,
      companyName,
      email,
      phone,
      whatsappNumber: whatsappNumber || phone,
      product: productRequired,
      grade: gradeSpec,
      quantity: Number(quantity) || 5,
      unit,
      colors: selectedColours.length ? selectedColours : ['Standard'],
      application: intendedApplication,
      deliveryCity: deliveryLocation,
      notes: message,
    });

    setSubmittedMessage(
      'Inquiry logged successfully! Our proprietor, Jaimik Sur, will contact you within 30 minutes with TDS sheets, spot pricing, and dispatch schedule.'
    );

    setTimeout(() => {
      handleWhatsAppClick();
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner (Matching Stitch Image 6) */}
      <section className="w-full bg-[#ecf4ff] py-10 px-6 lg:px-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#cfe5ff] text-[#001d33] px-3 py-1 rounded-full font-mono text-[11px] font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#00532b] animate-pulse" />
              Industrial Polymer Procurement Division
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#00335a] tracking-tight">
              Contact SUR GRANULES
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Have a product requirement or B2B enquiry? Get in touch with us directly for guaranteed polymer specs, batch validation, and bulk dispatch schedules.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl shadow-xs border border-slate-200/80">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#00335a]">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <span className="block font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Fast Turnaround
              </span>
              <span className="font-display text-xs sm:text-sm font-bold text-[#00335a]">
                &lt; 30 Mins Commercial Quotation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Direct Desk (Left) & Inquiry Form (Right) */}
      <section className="w-full py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] font-bold uppercase bg-slate-100 text-[#00335a] px-2.5 py-1 rounded tracking-wider">
                  Immediate Executive Desk
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Lines Active
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-[#00335a] tracking-tight mb-2">
                Direct Leadership &amp; Factory Contact
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Direct contact with business owner for instant pricing, lot verification, and dispatch schedule.
              </p>

              {/* Jaimik Sur Profile Card */}
              <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-xl mb-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#174a78] text-white flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-[28px]">badge</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-blue-700 block">
                    Proprietor &amp; Head of Operations
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#00335a]">
                    {settings.ownerName}
                  </h3>
                  <p className="text-xs text-slate-600">SUR GRANULES • Ankleshwar Works</p>
                </div>
              </div>

              {/* Communication Links */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-200/70 text-[#00335a] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">call</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                        Direct Phone
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                        {settings.primaryPhone}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`tel:${settings.primaryPhone}`}
                    className="inline-flex items-center gap-1 bg-[#00335a] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#174a78] transition-colors"
                  >
                    Call
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#a2f5b9] text-[#00210e] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                        WhatsApp Direct
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                        {settings.whatsappPhone}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/919925712098?text=Hello%20Jaimik%20bhai,%20I%20am%20inquiring%20about%20SUR%20GRANULES%20recycled%20polymers.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-[#00532b] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#003a1c] transition-colors"
                  >
                    Chat
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-9 h-9 rounded-lg bg-slate-200/70 text-[#00335a] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                        Commercial Email
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate block">
                        {settings.officialEmail}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:${settings.officialEmail}?subject=B2B%20Polymer%20Enquiry%20-%20SUR%20GRANULES`}
                    className="inline-flex items-center gap-1 bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0"
                  >
                    Email
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-9 h-9 rounded-lg bg-slate-200/70 text-[#00335a] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">location_on</span>
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                        Factory &amp; Registered Works
                      </span>
                      <span className="text-xs text-slate-800 font-medium block truncate">
                        {settings.factoryAddress}
                      </span>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Ramnagar,+Ankleshwar,+Gujarat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0"
                  >
                    Directions
                  </a>
                </div>
              </div>

              {/* Plant Dispatch Windows */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Plant Dispatch Windows
                  </span>
                  <span className="font-mono text-[10px] font-bold bg-[#cfe5ff] text-[#001d33] px-2 py-0.5 rounded">
                    6 Days / Week
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 text-xs sm:text-sm font-semibold">
                  <span className="material-symbols-outlined text-blue-700 text-[18px]">
                    schedule
                  </span>
                  <span>{settings.dispatchWindows}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Emergency production lots and round-the-clock trailer loading coordinated on scheduled contract orders.
                </p>
              </div>
            </div>

            {/* Bulk Logistics Readiness Card */}
            <div className="bg-[#00335a] text-white rounded-xl p-6 shadow-md border border-slate-700 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-300 text-[24px]">
                    local_shipping
                  </span>
                  <h3 className="font-display text-lg font-bold">Bulk Logistics Readiness</h3>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Direct access to Golden Corridor NH-48 &amp; Western Dedicated Freight Corridor (DFC). Safe transit assurance across Pan-India delivery hubs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-300 block">
                    Daily Truckload
                  </span>
                  <span className="font-display text-base font-bold text-white">10 – 30 MT</span>
                </div>
                <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                  <span className="font-mono text-[10px] uppercase font-bold text-blue-200 block">
                    Packaging
                  </span>
                  <span className="font-display text-base font-bold text-white">50kg Bags / Jumbo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Send a B2B Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-10 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-blue-700 block mb-0.5">
                    Direct Procurement Desk
                  </span>
                  <h2 className="font-display text-2xl font-bold text-[#00335a]">
                    Send a B2B Inquiry
                  </h2>
                </div>
                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                  Fields marked (*) required
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Rajesh Patel"
                      className="w-full h-11 px-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Company / Factory Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g., Apex Polymers Ltd."
                      className="w-full h-11 px-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="purchase@company.com"
                      className="w-full h-11 px-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-11 px-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+91 99257..."
                      className="w-full h-11 px-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  <div className="md:col-span-6 space-y-1.5">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Product Required *
                    </label>
                    <select
                      value={productRequired}
                      onChange={(e) => setProductRequired(e.target.value)}
                      className="w-full h-11 px-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                    >
                      <option value="Recycled HDPE Granules">Recycled HDPE Granules</option>
                      <option value="Recycled PP Granules">Recycled PP Granules</option>
                      <option value="Both HDPE & PP Granules">Both HDPE &amp; PP Granules</option>
                      <option value="Custom Engineering Grade Batch">Custom Reprocessed Compound</option>
                    </select>
                  </div>
                  <div className="md:col-span-6 space-y-1.5">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Grade / Specification
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={gradeSpec}
                        onChange={(e) => setGradeSpec(e.target.value)}
                        className="w-full h-11 px-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="absolute right-3 top-2.5 font-mono text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                        Default Grade
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
                  <div className="md:col-span-7 space-y-1.5">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Required Order Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 5"
                      className="w-full h-11 px-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="md:col-span-5 space-y-1.5">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Metric Unit
                    </label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as 'MT' | 'KG')}
                      className="w-full h-11 px-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                    >
                      <option value="MT">Metric Tonnes (MT)</option>
                      <option value="KG">Kilograms (KG)</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Pellet Colour Checkboxes */}
                <div className="space-y-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                    Preferred Pellet Colour (Select Multiple)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {availableColours.map((col) => {
                      const isChecked = selectedColours.includes(col);
                      return (
                        <label
                          key={col}
                          onClick={() => toggleColour(col)}
                          className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer border transition-colors select-none ${
                            isChecked
                              ? 'bg-blue-50 border-blue-400 text-[#00335a]'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-4 h-4 text-[#00335a] rounded"
                          />
                          <span
                            className={`w-3.5 h-3.5 rounded-full border border-slate-300 ${
                              col === 'Blue'
                                ? 'bg-blue-600'
                                : col === 'White'
                                ? 'bg-white'
                                : col === 'Off-White'
                                ? 'bg-amber-100'
                                : col === 'Transparent'
                                ? 'bg-sky-50'
                                : 'bg-slate-400'
                            }`}
                          />
                          <span className="text-xs font-medium">{col}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Intended Application *
                    </label>
                    <select
                      value={intendedApplication}
                      onChange={(e) => setIntendedApplication(e.target.value)}
                      className="w-full h-11 px-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                    >
                      <option value="Blow Moulding">Blow Moulding (Carboys / Cans)</option>
                      <option value="Injection Moulding">Injection Moulding (Crates / Pails)</option>
                      <option value="Extrusion">Extrusion (Pipes / Sheets / Profile)</option>
                      <option value="Household Utensils / Molds">Household Moulded Articles</option>
                      <option value="Industrial Component Manufacturing">
                        Industrial Component Manufacturing
                      </option>
                      <option value="Other">Other Custom Application</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Delivery City &amp; PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      placeholder="e.g. Vapi / Bhiwandi, 396195"
                      className="w-full h-11 px-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                    Additional Requirements / Target MFI / Ash Content Limits
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="State your exact processing machine details, filter mesh standard, or current sample requirements..."
                    className="w-full p-3 bg-[#ecf4ff]/50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {submittedMessage && (
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm space-y-1 animate-in fade-in">
                    <div className="flex items-center gap-2 font-bold">
                      <span className="material-symbols-outlined text-[20px] text-emerald-600">
                        check_circle
                      </span>
                      <span>Inquiry logged successfully!</span>
                    </div>
                    <p className="text-xs text-emerald-800">{submittedMessage}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#00335a] text-white py-3.5 px-6 rounded-lg font-display text-xs font-bold hover:bg-[#174a78] transition-all shadow-md cursor-pointer active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Submit B2B Inquiry</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="inline-flex items-center justify-center gap-2 bg-[#00532b] text-white py-3.5 px-6 rounded-lg font-display text-xs font-bold hover:bg-[#003a1c] transition-all shadow-md cursor-pointer active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Send via WhatsApp</span>
                  </button>
                </div>

                <p className="text-xs text-slate-500 text-center sm:text-left">
                  Confidentiality Guaranteed • Quotes include GST invoice format and transport freight estimates.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Ankleshwar GIDC Industrial Corridor Map & Logistics Transit Timeline (Matching Stitch Image 6) */}
      <section className="w-full py-12 px-6 lg:px-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-blue-700 font-bold">
                Manufacturing Hub &amp; Connectivity
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#00335a] mt-0.5">
                Ankleshwar GIDC Industrial Corridor Map
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
              Situated at Gujarat's chemical &amp; polymer epicentre with unhindered freight road transport to major processing clusters across Western &amp; Northern India.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Map visual */}
            <div className="lg:col-span-8 overflow-hidden rounded-xl shadow-xs border border-slate-200 bg-white relative">
              <div
                className="w-full h-80 lg:h-full min-h-[340px] bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOKM6AzP0x4A6w99I4m4iUY-l-WNzhMXNzTwv8Pv-Ws2RYl-Uq1jSfwAdEVOJPfj8IlVnPJKmmYn_7CVGbsOrH1bIhWycwSmYV7ZvBtoqhV-K2ZTBG-E3WD6ZyoGsWohjL7QVzTyqJ76jblQaTxFcqxPxnGVY6phYs8vvttH4SkwC1W9gT3SehVzKj0dfZI10CgX_SKZ8qa6R_fywLXsUOfilbahRQnIoac-Ew5y0lI5c3mWpsDP-osg')`,
                }}
              />
              <div className="absolute bottom-4 left-4 bg-[#00335a] text-white p-3 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
                <span className="material-symbols-outlined text-emerald-300 text-[24px]">factory</span>
                <div>
                  <p className="font-display text-xs font-bold leading-tight">
                    SUR GRANULES Facility
                  </p>
                  <p className="text-[11px] text-white/80">Ramnagar Industrial Zone, Ankleshwar</p>
                </div>
              </div>
            </div>

            {/* Logistics Timeline Card */}
            <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-xs border border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-display text-base font-bold text-[#00335a]">
                  Logistics Transit Timeline
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">
                        Gujarat Industrial Belt
                      </span>
                      <span className="font-mono text-[10px] font-bold bg-[#cfe5ff] text-[#001d33] px-1.5 py-0.5 rounded">
                        Same Day / 24h
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Surat, Bharuch, Vadodara, Ahmedabad, Vapi, Valsad industrial clusters.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">
                        Maharashtra &amp; Mumbai Hub
                      </span>
                      <span className="font-mono text-[10px] font-bold bg-[#cfe5ff] text-[#001d33] px-1.5 py-0.5 rounded">
                        24 – 36 Hours
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Direct NH-48 trucking to Bhiwandi, Palghar, Vasai, Pune, Nashik.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">
                        Rajasthan, MP &amp; North India
                      </span>
                      <span className="font-mono text-[10px] font-bold bg-[#cfe5ff] text-[#001d33] px-1.5 py-0.5 rounded">
                        48 – 72 Hours
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Indore, Jaipur, Delhi NCR container trailer lines via Western Corridor.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Ramnagar,+Ankleshwar,+Gujarat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#00335a] py-3 rounded-lg font-display text-xs font-bold transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">map</span>
                  <span>Open in Google Maps Navigation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
