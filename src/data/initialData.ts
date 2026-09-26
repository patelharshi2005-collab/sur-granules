import { ProductItem, InquiryItem, PlantSettings, MediaAsset } from '../types';

export interface PolymerPriceCard {
  key: string;
  title: string;
  fullName: string;
  polymer: string;
  price: number;
  unit: string;
  moq: string;
  application: string;
  trend: string;
  badge: string;
}

export const livePolymerPrices: PolymerPriceCard[] = [
  {
    key: 'washed',
    title: 'Washed Material',
    fullName: 'Hot-Washed High Purity Flakes & Regrind (HDPE / PP)',
    polymer: 'HDPE / PP Washed Regrind',
    price: 77,
    unit: '₹ / kg',
    moq: '5 MT',
    application: 'Direct Extrusion, Compounding & Pelletizing Feed',
    trend: 'Direct Ex-Plant Rate',
    badge: 'Raw Material Feed',
  },
  {
    key: 'hdpe',
    title: 'HDPE Granules',
    fullName: 'Recycled HDPE Granules (0.2 MFI Calibrated Grade)',
    polymer: 'High-Density Polyethylene',
    price: 80,
    unit: '₹ / kg',
    moq: '5 MT',
    application: 'Blow Moulding Drums (20L–210L) & Heavy Pipe Extrusion',
    trend: 'High Mechanical Toughness',
    badge: 'Best Seller',
  },
  {
    key: 'pp',
    title: 'PP Granules',
    fullName: 'Recycled PP Granules (0.2 MFI Calibrated Grade)',
    polymer: 'Polypropylene Copolymer',
    price: 77,
    unit: '₹ / kg',
    moq: '5 MT',
    application: 'Injection Moulding Crates, Automotive Casings & Closures',
    trend: 'Ready Lot in Ankleshwar',
    badge: 'Plant Direct',
  },
  {
    key: 'granules',
    title: 'Reprocessed Granules',
    fullName: 'Ultra-Clean Reprocessed Color / Natural Granules',
    polymer: 'Calibrated Polymer Granules',
    price: 92,
    unit: '₹ / kg',
    moq: '3 MT',
    application: 'High-Gloss, Thin-Wall & Dimensional Tolerance Moulding',
    trend: 'Grade A+ Multi-Filtration',
    badge: 'Premium Grade',
  },
];

export const initialProducts: ProductItem[] = [
  {
    id: 'sg-hdpe-02',
    code: 'SG-HDPE-02',
    name: 'Recycled HDPE Granules',
    polymer: 'HDPE',
    polymerBase: 'HDPE High-Density',
    pricePerKg: 80,
    priceUnit: '₹ / kg',
    mfi: '0.2 g/10min',
    mfiValue: 0.2,
    dispatchLead: '24–48 Hours',
    minBulkOrder: '5.0 Tonnes',
    minBulkOrderNum: 5,
    stockTonnes: 8,
    lotSize: '5–10 Tonnes In-Stock',
    packaging: '50 kg Heavy-Duty Moisture Resistant Woven Polypropylene Bags with internal polymer liner.',
    colors: ['Blue', 'White', 'Off-White', 'Transparent', 'Greyish'],
    applications: [
      'Blow Moulding',
      'Extrusion Line',
      'Industrial Drums',
      'Jerrycans & Containers',
      'Household Articles',
    ],
    dispatchedFrom: 'Ankleshwar GIDC',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjNk96vDblz2uAo2jgok61Q3d6agYcIsalZ9MvHkm2a0gtK3qRy_jtGe3zhpRzHSeX_qf3uD9j-lDKkk0DY0Xt9Ibwkh543Ozu4IlbP8dQ4JJDQk8ZT9f3ACahww1dDbKYRd6E3sxZ5WfTZNeDaEIvhL0RPhuITHs0THmCZpXJ-rRtivPQ0femBYit7INsmYyErM8XMsMIAtECBhbE1O2IY80hzaESZubBFWcCYOTuH8xAoN7JRRBgWg',
    imageAlt:
      'Close up photograph of premium industrial recycled HDPE plastic granules in clean natural translucent and deep blue color shades, sharp geometric polymer pellets arranged precisely in an Ankleshwar material testing laboratory with balanced industrial lighting',
    active: true,
    density: '0.945 – 0.955 g/cm³',
    tensileStrength: '≥ 22 MPa',
    izodImpact: '≥ 70 J/m',
    moistureContent: '< 0.08%',
    overview:
      'SUR GRANULES Recycled HDPE Granules are produced under rigorous multi-stage washing, continuous melt filtration (120 mesh screen), and controlled thermal extrusion processes at our Ankleshwar GIDC plant. Engineered specifically for high ESCR (Environmental Stress Crack Resistance) in large volume chemical packaging, industrial carboys, drums (20L to 210L capacity), and heavy-duty pipe extrusion.',
  },
  {
    id: 'sg-pp-02',
    code: 'SG-PP-02',
    name: 'Recycled PP Granules',
    polymer: 'PP',
    polymerBase: 'PP Polypropylene',
    pricePerKg: 77,
    priceUnit: '₹ / kg',
    mfi: '0.2 Melt Flow',
    mfiValue: 0.2,
    dispatchLead: '24–48 Hours',
    minBulkOrder: '5.0 Tonnes',
    minBulkOrderNum: 5,
    stockTonnes: 7,
    lotSize: '5–10 Tonnes In-Stock',
    packaging: '50 kg Heavy-Duty Moisture Resistant Woven Bags, stackable pallet configuration ready.',
    colors: ['Blue', 'White', 'Off-White', 'Transparent', 'Greyish'],
    applications: [
      'Injection Moulding',
      'Automotive Parts',
      'Industrial Crates',
      'Caps & Closures',
      'Consumer Goods',
    ],
    dispatchedFrom: 'Ankleshwar GIDC',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDVjimFzonXqj83AXAmASAzZURxrAjOiGwxZjVP6RyGZ6v4yMUdo9mwAxNdXqoqDH1hA3_8d4xxaUXhyEvNLtfiXkyHYSHu0SnI6aMtxMbaMjgo3b1wxWzvU_oA3r6EEIvIGQaUS7e4HBVXdfKfRJLHRi93BoHq4ZhyLzbMPoPu2y9VnzAhB1Gk1KiJPN9WT8swHWRyK_UCBZ5hNaB-g6CwJ7pqpzQFiw5ipXZogLiDwO3aCmuRMGl4jQ',
    imageAlt:
      'Technical macro photography of uniform glossy recycled polypropylene PP granules pellets in pure white, transparent and grey shades resting on an industrial conveyor belt within Ankleshwar manufacturing facility with cold clean engineering lighting',
    active: true,
    density: '0.900 – 0.910 g/cm³',
    tensileStrength: '≥ 28 MPa',
    izodImpact: '≥ 35 J/m',
    moistureContent: '< 0.07%',
    overview:
      'Engineered for structural rigidity and minimal shrinkage, SUR GRANULES Recycled PP Granules deliver uniform melt properties and predictable mold cycle times across industrial fabrication setups. Perfect for injection molded heavy storage crates, automotive battery casings, threaded caps, and high-impact structural components.',
  },
  {
    id: 'sg-washed-01',
    code: 'SG-WASH-01',
    name: 'Hot-Washed Polymer Flakes',
    polymer: 'HDPE',
    polymerBase: 'Washed HDPE & PP Flakes',
    pricePerKg: 77,
    priceUnit: '₹ / kg',
    mfi: '0.2 - 0.4 g/10min',
    mfiValue: 0.3,
    dispatchLead: '24–48 Hours',
    minBulkOrder: '5.0 Tonnes',
    minBulkOrderNum: 5,
    stockTonnes: 12,
    lotSize: '5–15 Tonnes In-Stock',
    packaging: '50 kg Polypropylene Jumbo / Woven Bags with double moisture barrier.',
    colors: ['Blue', 'White', 'Greyish'],
    applications: [
      'Extrusion Lines',
      'Pelletizing & Compounding',
      'Industrial Re-Melt',
      'Drainage Corrugated Pipes',
    ],
    dispatchedFrom: 'Ankleshwar GIDC',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCAD-OLezq9A0C25YH-lik18kXAvalIacn-0Fm1_VdpkcwYNtlWPT5wqeGyywF8162xu3G5hfv_PJYTNF-mRcXiqut10XCslKB6HMQgGMrFXP1Er-hUMiDS3mxVOvza7_qGZR0fLUHpyISbt9x0WzF-rFy6vcJ803mjcwCShOD5-Ub9yOLN0W3MOahSqQ_frmcvxOVwEvxEFyJYMbY-wsLlnSVzVgCT8QJXMJm2aF3I3mlrIck6yeJdzA',
    imageAlt:
      'Washed high purity polymer flakes and regrind clean material ready for extrusion and pelletization feed',
    active: true,
    density: '0.940 – 0.950 g/cm³',
    tensileStrength: '≥ 20 MPa',
    izodImpact: '≥ 60 J/m',
    moistureContent: '< 0.10%',
    overview:
      'SUR GRANULES multi-stage friction-washed and hot-caustic cleaned polymer flakes. Free from paper labels, adhesive residue, and heavy contaminants. Ready for direct feeding into masterbatch compounding and recycling extruder lines.',
  },
  {
    id: 'sg-prem-92',
    code: 'SG-PREM-92',
    name: 'Premium Reprocessed Granules',
    polymer: 'Custom',
    polymerBase: 'Ultra-Pure Compounded Granules',
    pricePerKg: 92,
    priceUnit: '₹ / kg',
    mfi: '0.2 ± 0.03 g/10min',
    mfiValue: 0.2,
    dispatchLead: '24–48 Hours',
    minBulkOrder: '3.0 Tonnes',
    minBulkOrderNum: 3,
    stockTonnes: 9,
    lotSize: '5–10 Tonnes In-Stock',
    packaging: '50 kg Sealed Hermetic Multi-layer Bags, export pallet packaging available.',
    colors: ['White', 'Transparent', 'Blue', 'Off-White'],
    applications: [
      'High Precision Injection Moulding',
      'Technical Components',
      'Closures & Caps',
      'Masterbatch Base Carrier',
    ],
    dispatchedFrom: 'Ankleshwar GIDC',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCETERd7hwz87Kio9MGHc85_fPpGdEWWPizerq-PxUnIvBFdc0Llmuo935pOB_pjmOjaCHXXQBqsYCib4-B3uQ43ig-BMlqleSbnKw9Jvx9KtUcvrFVMaEWfrKvPEroFikTm-DYRG4HTj2o_88F3cnQQizlVhrrptBxPKOfteWVe1PzjdZ5tpF0FgLvgy0N81xpqU6EqKv8c_-87IocM0XZru6ccycV5i6HR0WKFFeEUhIZ6PDHrqETCw',
    imageAlt:
      'Premium ultra-clean reprocessed polymer granules with uniform cylindrical pellet geometry and laboratory-tested melt characteristics',
    active: true,
    density: '0.920 – 0.940 g/cm³',
    tensileStrength: '≥ 26 MPa',
    izodImpact: '≥ 55 J/m',
    moistureContent: '< 0.05%',
    overview:
      'Our flagship Grade A+ reprocessed polymer granules formulated with screen changers down to 150 mesh. Delivers near-virgin mechanical resilience, pristine visual clarity, and flawless surface finish on high-speed industrial injection tooling.',
  },
];

export const initialInquiries: InquiryItem[] = [
  {
    id: 'INQ-101',
    buyerName: 'Rajesh Patel',
    companyName: 'Apex Plastics Ltd (GIDC Dahej)',
    email: 'purchase@apexplastics.in',
    phone: '+91 98250 44312',
    whatsappNumber: '+91 98250 44312',
    product: 'Recycled HDPE Granules',
    grade: '0.2',
    quantity: 10,
    unit: 'MT',
    colors: ['White', 'Blue'],
    application: 'Blow Moulding (Carboys / Cans)',
    deliveryCity: 'GIDC Dahej, Bharuch, 392130',
    notes: 'Immediate dispatch required to Dahej factory unit. Needs sample certificate for Melt Flow Index compliance.',
    timestamp: 'Today, 10:45 AM',
    status: 'new',
  },
  {
    id: 'INQ-102',
    buyerName: 'Sunil Sharma',
    companyName: 'Gujarat Polymer Works',
    email: 'procurement@gujaratpolymer.com',
    phone: '+91 97241 18902',
    whatsappNumber: '+91 97241 18902',
    product: 'Recycled PP Granules',
    grade: '0.2',
    quantity: 5,
    unit: 'MT',
    colors: ['Blue'],
    application: 'Injection Moulding (Crates / Pails)',
    deliveryCity: 'Vapi Industrial Area, 396195',
    notes: 'Formal RFQ submitted. Quoted @ standard ex-mill Ankleshwar rate + GST. Awaiting purchase order confirmation.',
    timestamp: 'Yesterday, 4:20 PM',
    status: 'quoted',
  },
  {
    id: 'INQ-103',
    buyerName: 'Anil Mehta',
    companyName: 'Shreeji Containers',
    email: 'anil.mehta@shreejicontainers.com',
    phone: '+91 94268 90114',
    whatsappNumber: '+91 94268 90114',
    product: 'Recycled HDPE Granules',
    grade: '0.2',
    quantity: 8,
    unit: 'MT',
    colors: ['Greyish'],
    application: 'Industrial Component Manufacturing',
    deliveryCity: 'Makarpura GIDC, Vadodara, 390010',
    notes: 'Sample 5kg dispatch completed. Laboratory test passed on tensile modulus. Finalizing logistics freight from Ankleshwar to Vadodara.',
    timestamp: '2 days ago',
    status: 'inprogress',
  },
  {
    id: 'INQ-104',
    buyerName: 'Bhavin Shah',
    companyName: 'Kaveri Automotive Components',
    email: 'bhavin@kaveriauto.com',
    phone: '+91 98241 33219',
    product: 'Recycled PP Granules',
    grade: '0.2',
    quantity: 12,
    unit: 'MT',
    colors: ['White', 'Off-White'],
    application: 'Injection Moulding',
    deliveryCity: 'Pune Industrial Belt, 411018',
    notes: 'Recurring annual standing order request. Requires 2 trailers monthly dispatch.',
    timestamp: '3 days ago',
    status: 'contacted',
  },
  {
    id: 'INQ-105',
    buyerName: 'Dharmesh Solanki',
    companyName: 'National Extrusions LLP',
    email: 'dharmesh@nationalextrusions.co.in',
    phone: '+91 99044 12890',
    product: 'Recycled HDPE Granules',
    grade: '0.2',
    quantity: 15,
    unit: 'MT',
    colors: ['Blue', 'Greyish'],
    application: 'Extrusion Line',
    deliveryCity: 'Sanand Industrial Estate, Ahmedabad, 382170',
    notes: 'Order delivered and closed successfully. Repeat order scheduled for next quarter.',
    timestamp: '5 days ago',
    status: 'closed',
  },
];

export const initialPlantSettings: PlantSettings = {
  ownerName: 'Jaimik Sur',
  companyName: 'SUR GRANULES',
  tagline: 'Polymer Engineering • Recycle • Reprocess • Rebuild',
  primaryPhone: '+91 9925712098',
  whatsappPhone: '+91 9925712098',
  officialEmail: 'jaimiksur@gmail.com',
  factoryAddress: 'Ramnagar, Ankleshwar Industrial Area, Gujarat 393002, India',
  dispatchWindows: 'Mon – Sat: 9:00 AM – 7:30 PM IST',
  monthlyCapacity: '1200+ MT / Month',
  dailyDispatchCapacity: '40+ MT Daily Dispatch Capacity',
  liveNoticeBanner: 'Immediate Ankleshwar Dispatch Available: 15 Tonnes Freshly Reprocessed HDPE & PP Granules (0.2 MFI)',
};

export const initialMediaAssets: MediaAsset[] = [
  {
    id: 'asset-1',
    title: 'Granulation Line 01',
    category: 'Facility',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGbk_bQZm6z4szFZfJ5FB-Gh2Jqb-xMM5ZsPFRkPEF1X_tQR9nFvdRpSsgZ3mjZR4_KFhhrmZ4t4wsJL89ClipwP_ebdc_AWLBpnxEsjd6OEM9jV-Q3f-cb3jYK7DEytsIHPDGi2SU-sZKlYXYHuO_0ZxH8RIxUczUNZmyPFilw2etKMaPZzyMBY0ca3nwwboOkpPX2CqLUQslYVF5aZBj6ZQfatpIKGAVrZwfgZXAg1AxvpyBv2XPvg',
    altText:
      'High-precision industrial polymer granulation line in Ankleshwar Gujarat, heavy duty extruder cooling water bath and rotary pellet cutter with vibrant engineering lighting',
  },
  {
    id: 'asset-2',
    title: 'Ocean Blue Pellets',
    category: 'PP',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCETERd7hwz87Kio9MGHc85_fPpGdEWWPizerq-PxUnIvBFdc0Llmuo935pOB_pjmOjaCHXXQBqsYCib4-B3uQ43ig-BMlqleSbnKw9Jvx9KtUcvrFVMaEWfrKvPEroFikTm-DYRG4HTj2o_88F3cnQQizlVhrrptBxPKOfteWVe1PzjdZ5tpF0FgLvgy0N81xpqU6EqKv8c_-87IocM0XZru6ccycV5i6HR0WKFFeEUhIZ6PDHrqETCw',
    altText:
      'Extreme macro technical photograph of premium recycled PP plastic granules in ocean blue color, cylindrical clean pellet shape, laboratory lighting highlighting density and uniform melt index',
  },
  {
    id: 'asset-3',
    title: 'Natural White Grade 0.2',
    category: 'HDPE',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHViFOcPOU-XFQxHMdxf8w6qe6OeipjEJt15Bg1T0hFKQuT8UKqB2oJ4U39_7rTUsbCMtACK69upIiRfJ5rBf4hfnFTrqmWEprd3f05cU7kpqPTMbvL3A-jPQctpmu-0Oiae4REDYa5mjYZoCvfTzF3O1RiAJRgKmOyqQ2Gh2_WkAIXErwNmZbVL2YdYZi9kX4ba69ntp13MhTd56YVTSUGAaRRHCNDW3p8cqXsLG3S8u_Sl3J4rqwTw',
    altText:
      'Technical close-up photograph of milky white recycled HDPE plastic granules on a clean stainless steel inspection tray, pure translucent polymer texture under crisp industrial daylight',
  },
  {
    id: 'asset-4',
    title: '50kg Woven Lot',
    category: 'Packaging',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKinWNAA6j2T9xaQZJ97U8V2KWIc50FWRvCcC-cO9wLnwVoqr777h9n9y5IxjJsK1oZWIzIcjvIddQMMcQWpZNuls1XeE65ocf6QACOgVqK3Ddk5rEnqnmIOuR-HTjS4OpDqHUUacve_Cw_peh83JFYYVRH1FcA5eL5RepBYrXZA3KSD62j_8H7vaJNnJsfX-gFKwP3BgWPFJ94zJDehdez3VHdmnVjGEOxt5kAnbHW5HMAIoZ5tpInw',
    altText:
      'Palletized rows of 50 kg heavy-duty industrial woven polypropylene bags filled with reprocessed granules stacked uniformly in a clean Ankleshwar factory warehouse',
  },
  {
    id: 'asset-5',
    title: 'Greyish Carboy Lot',
    category: 'HDPE',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ5wdQB6n9DlCHBn8EnUW8y56YcYVWvERycJCG1FZuf6YoYu5irJJDV3jhQhPZYWE3OYYQXiKxvPZOFlvN4GwZO292pkFyLrVyV9O_4MkAD_EucjG1gi0S-oNy4b1OQpOy3zjIhVTEenlce3-YUOTBMVHUxV8zY0NL6_PyBzZv-iTyoY16gckE7kUnRcPUN_rl3rS1UAxKsMTzlCWoYG_wxDJkHEmsDdSzwNWWb96aELYezMG26f6KyA',
    altText:
      'Reprocessed grey industrial polymer granules neatly arrayed with consistent size and low moisture surface, captured in an engineering quality assurance laboratory',
  },
  {
    id: 'asset-6',
    title: 'High Clarity Natural',
    category: 'PP',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCAD-OLezq9A0C25YH-lik18kXAvalIacn-0Fm1_VdpkcwYNtlWPT5wqeGyywF8162xu3G5hfv_PJYTNF-mRcXiqut10XCslKB6HMQgGMrFXP1Er-hUMiDS3mxVOvza7_qGZR0fLUHpyISbt9x0WzF-rFy6vcJ803mjcwCShOD5-Ub9yOLN0W3MOahSqQ_frmcvxOVwEvxEFyJYMbY-wsLlnSVzVgCT8QJXMJm2aF3I3mlrIck6yeJdzA',
    altText:
      'Pristine transparent clarity recycled PP plastic granules sparkling under controlled directional studio illumination, showing high purity and zero foreign contamination',
  },
];

export const tdsMatrixData = [
  {
    property: 'Melt Flow Index (MFI @ 190°C/2.16kg)',
    testMethod: 'ASTM D1238',
    hdpe: '0.20 ± 0.05 g/10 min',
    pp: '0.22 ± 0.05 g/10 min',
    tolerance: '± 4% Batch-to-Batch',
  },
  {
    property: 'Density Standard (@ 23°C)',
    testMethod: 'ASTM D792',
    hdpe: '0.945 – 0.955 g/cm³',
    pp: '0.900 – 0.910 g/cm³',
    tolerance: '± 0.005 g/cm³',
  },
  {
    property: 'Tensile Strength at Yield',
    testMethod: 'ASTM D638',
    hdpe: '≥ 22 MPa',
    pp: '≥ 28 MPa',
    tolerance: 'Standard Calibrated',
  },
  {
    property: 'Izod Impact Strength (Notched @ 23°C)',
    testMethod: 'ASTM D256',
    hdpe: '≥ 70 J/m',
    pp: '≥ 35 J/m',
    tolerance: 'High Mechanical Toughness',
  },
  {
    property: 'Moisture Content',
    testMethod: 'INTERNAL SENSOR',
    hdpe: '< 0.08%',
    pp: '< 0.07%',
    tolerance: 'Pre-Dried Sealed',
  },
];
