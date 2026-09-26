import React, { useState, useEffect } from 'react';
import { usePlant } from '../context/PlantContext';
import { useAuth } from '../context/AuthContext';
import { ProductItem } from '../types';

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal, quoteModalProduct, products, addNewInquiry } = usePlant();
  const { user, dbUser } = useAuth();

  const [fullName, setFullName] = useState(user?.displayName || dbUser?.name || '');
  const [companyName, setCompanyName] = useState(dbUser?.company || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(dbUser?.phone || '');

  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.displayName || dbUser?.name || '');
      if (!email) setEmail(user.email || '');
    }
  }, [user, dbUser]);
  const [selectedProduct, setSelectedProduct] = useState(
    quoteModalProduct ? quoteModalProduct.name : products[0]?.name || 'Recycled HDPE Granules'
  );
  const [quantity, setQuantity] = useState(10);
  const [unit, setUnit] = useState<'MT' | 'KG'>('MT');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>(['White', 'Blue']);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isQuoteModalOpen) return null;

  const colorOptions = ['Blue', 'White', 'Off-White', 'Transparent', 'Greyish'];

  const toggleColor = (c: string) => {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addNewInquiry({
      buyerName: fullName,
      companyName,
      email,
      phone,
      whatsappNumber: phone,
      product: selectedProduct,
      grade: '0.2',
      quantity: Number(quantity),
      unit,
      colors: selectedColors.length ? selectedColors : ['Standard'],
      application: 'Industrial Procurement',
      deliveryCity,
      notes,
    });

    setSubmitted(true);

    const waMsg = encodeURIComponent(
      `*B2B QUOTE REQUEST - SUR GRANULES*\n` +
      `Buyer: ${fullName}\n` +
      `Company: ${companyName}\n` +
      `Phone: ${phone}\n` +
      `Product: ${selectedProduct}\n` +
      `Quantity: ${quantity} ${unit}\n` +
      `Colors: ${selectedColors.join(', ')}\n` +
      `Delivery To: ${deliveryCity}\n` +
      (notes ? `Notes: ${notes}\n` : '') +
      `Dispatch Hub: Ankleshwar GIDC`
    );

    setTimeout(() => {
      window.open(`https://wa.me/919925712098?text=${waMsg}`, '_blank');
      closeQuoteModal();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={closeQuoteModal}
    >
      <div
        className="bg-white max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#00335a] text-white p-5 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 font-bold block mb-0.5">
              Direct Factory Procurement Desk
            </span>
            <h3 className="font-display text-lg font-bold text-white">
              Instant B2B Price &amp; Lot Request
            </h3>
          </div>
          <button
            onClick={closeQuoteModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <span className="material-symbols-outlined text-emerald-600 text-5xl">check_circle</span>
            <h4 className="font-display text-xl font-bold text-[#00335a]">
              Quotation Request Logged!
            </h4>
            <p className="text-sm text-slate-600">
              Opening WhatsApp with your formatted requirements for Jaimik Sur. Our plant dispatch
              team will connect with lot pricing in &lt; 30 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rajesh Patel"
                  className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Company / Factory Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Polymers Ltd"
                  className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 99257..."
                  className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="purchase@company.com"
                  className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-7">
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Polymer Grade *
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Recycled HDPE Granules">Recycled HDPE Granules (₹80/kg)</option>
                  <option value="Recycled PP Granules">Recycled PP Granules (₹77/kg)</option>
                  <option value="Hot-Washed Polymer Flakes">Hot-Washed Polymer Flakes (₹77/kg)</option>
                  <option value="Premium Reprocessed Granules">Premium Reprocessed Granules (₹92/kg)</option>
                  <option value="Both HDPE & PP Granules">Combined HDPE &amp; PP Order</option>
                </select>
              </div>
              <div className="sm:col-span-5 flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                    Qty *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="w-20">
                  <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                    Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as 'MT' | 'KG')}
                    className="w-full h-10 px-2 text-sm bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="MT">MT</option>
                    <option value="KG">KG</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1.5">
                Preferred Color(s)
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((c) => {
                  const isChecked = selectedColors.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleColor(c)}
                      className={`px-3 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-[#174a78] text-white border-[#174a78]'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                Destination Delivery City &amp; PIN *
              </label>
              <input
                type="text"
                required
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
                placeholder="e.g. Dahej / Bhiwandi / Vadodara, PIN 392130"
                className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                Specific Processing Specs / Target Application
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., for 50L blow molding chemical carboys, need batch test COA with delivery..."
                className="w-full p-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeQuoteModal}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#00335a] hover:bg-[#174a78] text-white rounded-lg font-display text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <span>Submit &amp; Open WhatsApp</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
