export type PolymerType = 'HDPE' | 'PP' | 'Custom';

export type ColorVariant = 'Blue' | 'White' | 'Off-White' | 'Transparent' | 'Greyish';

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  polymer: 'HDPE' | 'PP' | 'Custom';
  polymerBase: string;
  pricePerKg: number;
  priceUnit?: string;
  mfi: string;
  mfiValue: number;
  dispatchLead: string;
  minBulkOrder: string;
  minBulkOrderNum: number;
  stockTonnes: number;
  lotSize: string;
  packaging: string;
  colors: ColorVariant[];
  applications: string[];
  dispatchedFrom: string;
  imageUrl: string;
  imageAlt: string;
  active: boolean;
  density: string;
  tensileStrength: string;
  izodImpact: string;
  moistureContent: string;
  overview: string;
}

export interface InquiryItem {
  id: string;
  buyerName: string;
  companyName: string;
  email: string;
  phone: string;
  whatsappNumber?: string;
  product: string;
  grade: string;
  quantity: number;
  unit: 'MT' | 'KG';
  colors: string[];
  application: string;
  deliveryCity: string;
  notes?: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'quoted' | 'inprogress' | 'closed';
  userId?: string;
}

export interface PlantSettings {
  ownerName: string;
  companyName: string;
  tagline: string;
  primaryPhone: string;
  whatsappPhone: string;
  officialEmail: string;
  factoryAddress: string;
  dispatchWindows: string;
  monthlyCapacity: string;
  dailyDispatchCapacity: string;
  liveNoticeBanner: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  category: 'HDPE' | 'PP' | 'Facility' | 'Packaging';
  imageUrl: string;
  altText: string;
}
