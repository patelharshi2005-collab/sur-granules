import { supabase, isSupabaseConfigured } from './supabase.ts';
import { ProductItem, InquiryItem, PlantSettings, MediaAsset } from '../types/index.ts';

export const supabaseService = {
  isConfigured: isSupabaseConfigured,

  // --- PRODUCTS CRUD ---
  async getProducts(): Promise<ProductItem[] | null> {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('code', { ascending: true });

    if (error) {
      console.error('Supabase getProducts error:', error);
      return null;
    }
    return data as ProductItem[];
  },

  async updateProductStock(id: string, stockTonnes: number, packaging?: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    const updatePayload: Record<string, any> = {
      stockTonnes,
      lotSize: `${stockTonnes >= 5 ? '5–10' : stockTonnes} Tonnes In-Stock`,
      updated_at: new Date().toISOString(),
    };
    if (packaging) updatePayload.packaging = packaging;

    const { error } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', id);

    if (error) {
      console.error('Supabase updateProductStock error:', error);
      return false;
    }
    return true;
  },

  async updateProductPrice(id: string, pricePerKg: number): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    const { error } = await supabase
      .from('products')
      .update({
        pricePerKg,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Supabase updateProductPrice error:', error);
      return false;
    }
    return true;
  },

  async toggleProductStatus(id: string, active: boolean): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    const { error } = await supabase
      .from('products')
      .update({
        active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Supabase toggleProductStatus error:', error);
      return false;
    }
    return true;
  },

  // --- INQUIRIES / RFQs CRUD ---
  async getInquiries(userId?: string): Promise<InquiryItem[] | null> {
    if (!isSupabaseConfigured) return null;
    let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (userId) {
      query = query.eq('user_id', userId);
    }
    const { data, error } = await query;
    if (error) {
      console.error('Supabase getInquiries error:', error);
      return null;
    }
    return data as InquiryItem[];
  },

  async createInquiry(inquiry: InquiryItem): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    const { error } = await supabase.from('inquiries').insert([
      {
        id: inquiry.id,
        buyer_name: inquiry.buyerName,
        company_name: inquiry.companyName,
        email: inquiry.email,
        phone: inquiry.phone,
        whatsapp_number: inquiry.whatsappNumber || null,
        product: inquiry.product,
        grade: inquiry.grade,
        quantity: inquiry.quantity,
        unit: inquiry.unit || 'MT',
        colors: inquiry.colors,
        application: inquiry.application,
        delivery_city: inquiry.deliveryCity,
        notes: inquiry.notes || null,
        timestamp: inquiry.timestamp,
        status: inquiry.status || 'new',
        user_id: inquiry.userId || null,
      },
    ]);

    if (error) {
      console.error('Supabase createInquiry error:', error);
      return false;
    }
    return true;
  },

  async updateInquiryStatus(id: string, status: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Supabase updateInquiryStatus error:', error);
      return false;
    }
    return true;
  },

  async deleteInquiry(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) {
      console.error('Supabase deleteInquiry error:', error);
      return false;
    }
    return true;
  },

  // --- PLANT SETTINGS ---
  async getSettings(): Promise<PlantSettings | null> {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase
      .from('plant_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return {
      ownerName: data.owner_name,
      companyName: data.company_name,
      tagline: data.tagline,
      primaryPhone: data.primary_phone,
      whatsappPhone: data.whatsapp_phone,
      officialEmail: data.official_email,
      factoryAddress: data.factory_address,
      dispatchWindows: data.dispatch_windows,
      monthlyCapacity: data.monthly_capacity,
      dailyDispatchCapacity: data.daily_dispatch_capacity,
      liveNoticeBanner: data.live_notice_banner,
    };
  },

  async updateSettings(settings: Partial<PlantSettings>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (settings.ownerName) payload.owner_name = settings.ownerName;
    if (settings.companyName) payload.company_name = settings.companyName;
    if (settings.tagline) payload.tagline = settings.tagline;
    if (settings.primaryPhone) payload.primary_phone = settings.primaryPhone;
    if (settings.whatsappPhone) payload.whatsapp_phone = settings.whatsappPhone;
    if (settings.officialEmail) payload.official_email = settings.officialEmail;
    if (settings.factoryAddress) payload.factory_address = settings.factoryAddress;
    if (settings.dispatchWindows) payload.dispatch_windows = settings.dispatchWindows;
    if (settings.monthlyCapacity) payload.monthly_capacity = settings.monthlyCapacity;
    if (settings.dailyDispatchCapacity) payload.daily_dispatch_capacity = settings.dailyDispatchCapacity;
    if (settings.liveNoticeBanner) payload.live_notice_banner = settings.liveNoticeBanner;

    const { error } = await supabase
      .from('plant_settings')
      .update(payload)
      .eq('id', 1);

    if (error) {
      console.error('Supabase updateSettings error:', error);
      return false;
    }
    return true;
  },

  // --- MEDIA ASSETS ---
  async getMediaAssets(): Promise<MediaAsset[] | null> {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return null;
    return (data || []).map((m: any) => ({
      id: m.id,
      title: m.title,
      category: m.category,
      imageUrl: m.image_url,
      altText: m.alt_text,
    }));
  },

  // --- REALTIME SUBSCRIPTIONS ---
  subscribeToProducts(onUpdate: () => void) {
    if (!isSupabaseConfigured) return null;
    const channel = supabase
      .channel('public:products')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          onUpdate();
        }
      )
      .subscribe();
    return channel;
  },

  subscribeToInquiries(onUpdate: () => void) {
    if (!isSupabaseConfigured) return null;
    const channel = supabase
      .channel('public:inquiries')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inquiries' },
        () => {
          onUpdate();
        }
      )
      .subscribe();
    return channel;
  },
};
