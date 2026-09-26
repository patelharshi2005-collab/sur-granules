-- ==============================================================================
-- SUR GRANULES - SUPABASE POSTGRESQL SCHEMA & INITIAL DATA SEED
-- Paste and run this script directly in the Supabase SQL Editor
-- (Dashboard -> SQL Editor -> New Query -> Run)
-- ==============================================================================

-- 1. PROFILES TABLE (Linked with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'buyer' NOT NULL CHECK (role IN ('buyer', 'admin', 'operator')),
  phone TEXT,
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to automatically create a profile when a new user signs up in Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'buyer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. PRODUCTS TABLE (Polymer grades, pricing, inventory)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  polymer TEXT NOT NULL,
  polymer_base TEXT NOT NULL,
  price_per_kg DOUBLE PRECISION NOT NULL,
  price_unit TEXT DEFAULT '₹ / kg',
  mfi TEXT NOT NULL,
  mfi_value DOUBLE PRECISION NOT NULL,
  dispatch_lead TEXT NOT NULL,
  min_bulk_order TEXT NOT NULL,
  min_bulk_order_num DOUBLE PRECISION NOT NULL,
  stock_tonnes DOUBLE PRECISION NOT NULL,
  lot_size TEXT NOT NULL,
  packaging TEXT NOT NULL,
  colors JSONB NOT NULL,
  applications JSONB NOT NULL,
  dispatched_from TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  active BOOLEAN DEFAULT true NOT NULL,
  density TEXT NOT NULL,
  tensile_strength TEXT NOT NULL,
  izod_impact TEXT NOT NULL,
  moisture_content TEXT NOT NULL,
  overview TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INQUIRIES & RFQS TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  buyer_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp_number TEXT,
  product TEXT NOT NULL,
  grade TEXT NOT NULL,
  quantity DOUBLE PRECISION NOT NULL,
  unit TEXT DEFAULT 'MT' NOT NULL,
  colors JSONB NOT NULL,
  application TEXT NOT NULL,
  delivery_city TEXT NOT NULL,
  notes TEXT,
  timestamp TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'contacted', 'quoted', 'inprogress', 'closed')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PLANT SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.plant_settings (
  id SERIAL PRIMARY KEY,
  owner_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  primary_phone TEXT NOT NULL,
  whatsapp_phone TEXT NOT NULL,
  official_email TEXT NOT NULL,
  factory_address TEXT NOT NULL,
  dispatch_windows TEXT NOT NULL,
  monthly_capacity TEXT NOT NULL,
  daily_dispatch_capacity TEXT NOT NULL,
  live_notice_banner TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MEDIA ASSETS TABLE
CREATE TABLE IF NOT EXISTS public.media_assets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- Products Policies: Public can read, authenticated staff can update
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Auth modify products" ON public.products FOR ALL USING (auth.role() = 'authenticated');

-- Inquiries Policies: Anyone can submit an RFQ, users see their own, admins see all
CREATE POLICY "Public insert inquiry" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "User read inquiries" ON public.inquiries FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'authenticated');
CREATE POLICY "Auth update inquiries" ON public.inquiries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete inquiries" ON public.inquiries FOR DELETE USING (auth.role() = 'authenticated');

-- Plant Settings & Media Policies
CREATE POLICY "Public read plant_settings" ON public.plant_settings FOR SELECT USING (true);
CREATE POLICY "Auth update plant_settings" ON public.plant_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read media_assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Auth modify media_assets" ON public.media_assets FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users read/write own profile" ON public.profiles FOR ALL USING (auth.uid() = id);

-- ==============================================================================
-- SEED INITIAL DATA (4 Polymer Lines with Official Spot Prices)
-- ==============================================================================
INSERT INTO public.products (
  id, code, name, polymer, polymer_base, price_per_kg, price_unit, mfi, mfi_value,
  dispatch_lead, min_bulk_order, min_bulk_order_num, stock_tonnes, lot_size, packaging,
  colors, applications, dispatched_from, image_url, image_alt, active, density,
  tensile_strength, izod_impact, moisture_content, overview
) VALUES
(
  'SG-HDPE-02', 'SG-HDPE-02', 'Recycled HDPE Granules (0.2 MFI)', 'HDPE', 'Post-Consumer High-Density Polyethylene',
  80.0, '₹ / kg', '0.2 – 0.35 g/10min', 0.25, '24–48 Hours', '3 MT', 3, 24.5,
  '5–10 Tonnes In-Stock', '25 kg PP Woven Bags with Liner',
  '["Milky Natural", "Jet Black", "Royal Blue", "Industrial Green"]'::jsonb,
  '["Agricultural Pipes", "Drip Irrigation", "Blow Molded Drums", "Crates & Pallets"]'::jsonb,
  'Ramnagar Industrial Plant, Ankleshwar GIDC',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  'Recycled HDPE Granules 0.2 MFI Pellets', true, '0.948 – 0.955 g/cm³', '21 – 24 MPa', '12 – 15 kJ/m²', '< 0.08%',
  'Precision reprocessed blow & extrusion grade high-density polyethylene calibrated at 0.2 MFI for high-stress pressure piping, corrugated tubing, and heavy industrial drums.'
),
(
  'SG-PP-02', 'SG-PP-02', 'Recycled PP Granules (0.2 MFI)', 'PP', 'Reprocessed Polypropylene Copolymer',
  77.0, '₹ / kg', '0.2 – 0.4 g/10min', 0.2, 'Same-day Dispatch', '3 MT', 3, 18.0,
  '5–10 Tonnes In-Stock', '25 kg Multi-wall Woven Sacks',
  '["Natural Off-White", "Black Carbon", "Custom Industrial Masterbatch"]'::jsonb,
  '["Battery Casings", "Automotive Underbody", "Heavy Injection Molding", "Industrial Strapping"]'::jsonb,
  'Ramnagar Industrial Plant, Ankleshwar GIDC',
  'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=800&q=80',
  'Recycled PP Granules Pellets', true, '0.902 – 0.910 g/cm³', '26 – 31 MPa', '8 – 11 kJ/m²', '< 0.05%',
  'High-impact polypropylene reprocessed granules engineered for rigidity, thermal resistance, and consistent cycle times in extrusion and thick-wall injection molding.'
),
(
  'SG-WASH-01', 'SG-WASH-01', 'Hot-Washed Polymer Flakes / Regrind', 'WASHED', 'Sorted & Density-Separated Rigid Flakes',
  77.0, '₹ / kg', 'N/A (Flake/Regrind)', 0.0, 'Immediate Ready Stock', '5 MT', 5, 32.0,
  '5–10 Tonnes In-Stock', '500 kg Jumbo Bags or 25 kg Sacks',
  '["Washed Blue", "Mixed Natural / White", "Green Sorted"]'::jsonb,
  '["Reprocessing Compounding Lines", "Sheet Extrusion", "Drainage Fittings", "Pre-form Moulding"]'::jsonb,
  'Ramnagar Industrial Plant, Ankleshwar GIDC',
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
  'Hot-washed clean polymer regrind flakes', true, '0.940 – 0.952 g/cm³', '19 – 22 MPa', '10 – 13 kJ/m²', '< 0.15%',
  'Triple-stage hot caustic washed, friction rinsed, and sink-float density separated rigid regrind flakes with low moisture, zero metal trace, and low residual label contamination.'
),
(
  'SG-PREM-92', 'SG-PREM-92', 'Premium Calibrated Granules (Special Grade)', 'GRANULES', 'Virgin-Grade Blended Engineering Polymer',
  92.0, '₹ / kg', '0.22 – 0.30 g/10min', 0.22, '24 Hours', '2 MT', 2, 14.0,
  '5–10 Tonnes In-Stock', '25 kg Palletized Moisture-Barrier Bags',
  '["Virgin-Grade Translucent", "Solid White", "UV Black"]'::jsonb,
  '["Pressure Gas Pipes", "High-Torque Automotive Components", "Export-Standard Crates"]'::jsonb,
  'Ramnagar Industrial Plant, Ankleshwar GIDC',
  'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
  'Premium reprocessed engineering polymer granules', true, '0.952 – 0.958 g/cm³', '25 – 28 MPa', '14 – 17 kJ/m²', '< 0.04%',
  'Premium dual-extruded and melt-filtered polymer granules fortified with anti-oxidants and thermal stabilizers for zero bubble defect extrusion.'
)
ON CONFLICT (id) DO UPDATE SET
  price_per_kg = EXCLUDED.price_per_kg,
  stock_tonnes = EXCLUDED.stock_tonnes,
  updated_at = NOW();

-- SEED PLANT SETTINGS
INSERT INTO public.plant_settings (
  id, owner_name, company_name, tagline, primary_phone, whatsapp_phone,
  official_email, factory_address, dispatch_windows, monthly_capacity,
  daily_dispatch_capacity, live_notice_banner
) VALUES (
  1, 'Jaimik Sur', 'SUR GRANULES (Polymer Engineering)',
  'Recycle • Reprocess • Rebuild',
  '+91 99257 12098', '+91 99257 12098',
  'jaimiksur@gmail.com',
  'Plot No. 48/B, Ramnagar Industrial Area, Near GIDC Phase 2, Ankleshwar, Gujarat - 393002',
  '08:00 AM – 08:00 PM IST (Mon–Sat)',
  '450+ MT / Month', '15–20 MT Daily',
  'Live Spot Rates: HDPE @ ₹80/kg | PP @ ₹77/kg | Washed @ ₹77/kg | Granules @ ₹92/kg. Dispatch active from Ramnagar, Ankleshwar.'
)
ON CONFLICT (id) DO UPDATE SET
  owner_name = EXCLUDED.owner_name,
  live_notice_banner = EXCLUDED.live_notice_banner,
  updated_at = NOW();
