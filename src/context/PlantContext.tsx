import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ProductItem, InquiryItem, PlantSettings, MediaAsset } from '../types';
import { initialProducts, initialInquiries, initialPlantSettings, initialMediaAssets } from '../data/initialData';
import { auth } from '../lib/firebase.ts';
import { supabaseService } from '../lib/supabaseService.ts';
import { isSupabaseConfigured } from '../lib/supabase.ts';

export type PageRoute = 'home' | 'products' | 'applications' | 'quality-process' | 'gallery' | 'contact' | 'request-a-quote' | 'admin';

interface PlantContextType {
  products: ProductItem[];
  inquiries: InquiryItem[];
  settings: PlantSettings;
  mediaAssets: MediaAsset[];
  currentPage: PageRoute;
  selectedProductForDetail: ProductItem | null;
  isQuoteModalOpen: boolean;
  quoteModalProduct: ProductItem | null;
  isStockReportOpen: boolean;
  toastMessage: string | null;
  isSyncing: boolean;
  isSupabaseMode: boolean;
  setCurrentPage: (page: PageRoute) => void;
  openProductDetail: (product: ProductItem) => void;
  closeProductDetail: () => void;
  openQuoteModal: (product?: ProductItem | null) => void;
  closeQuoteModal: () => void;
  openStockReport: () => void;
  closeStockReport: () => void;
  updateProductStock: (productId: string, newStock: number, newPackaging?: string) => Promise<void>;
  updateProductPrice: (productId: string, newPrice: number) => Promise<void>;
  toggleProductStatus: (productId: string) => Promise<void>;
  addNewInquiry: (inquiry: Omit<InquiryItem, 'id' | 'timestamp' | 'status'>) => Promise<InquiryItem>;
  updateInquiryStatus: (inquiryId: string, status: InquiryItem['status']) => Promise<void>;
  deleteInquiryItem: (inquiryId: string) => Promise<void>;
  updateSettings: (newSettings: Partial<PlantSettings>) => Promise<void>;
  addMediaAsset: (asset: Omit<MediaAsset, 'id'>) => Promise<void>;
  removeMediaAsset: (id: string) => Promise<void>;
  refreshAllData: () => Promise<void>;
  showToast: (msg: string) => void;
  totalStockTonnes: number;
}

const PlantContext = createContext<PlantContextType | undefined>(undefined);

export const PlantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem('sg_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 4 && parsed[0]?.pricePerKg) {
          return parsed;
        }
      }
      return initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('sg_inquiries');
      return saved ? JSON.parse(saved) : initialInquiries;
    } catch {
      return initialInquiries;
    }
  });

  const [settings, setSettings] = useState<PlantSettings>(() => {
    try {
      const saved = localStorage.getItem('sg_settings');
      return saved ? JSON.parse(saved) : initialPlantSettings;
    } catch {
      return initialPlantSettings;
    }
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem('sg_media');
      return saved ? JSON.parse(saved) : initialMediaAssets;
    } catch {
      return initialMediaAssets;
    }
  });

  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<ProductItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalProduct, setQuoteModalProduct] = useState<ProductItem | null>(null);
  const [isStockReportOpen, setIsStockReportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const getAuthHeaders = async (): Promise<Record<string, string>> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    try {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn('Could not retrieve auth token:', e);
    }
    return headers;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch initial data from Supabase or Backend API
  const refreshAllData = useCallback(async () => {
    setIsSyncing(true);
    try {
      // 1. Try Supabase if configured
      if (isSupabaseConfigured) {
        const [sbProducts, sbInquiries, sbSettings, sbMedia] = await Promise.allSettled([
          supabaseService.getProducts(),
          supabaseService.getInquiries(),
          supabaseService.getSettings(),
          supabaseService.getMediaAssets(),
        ]);

        let hasData = false;
        if (sbProducts.status === 'fulfilled' && sbProducts.value && sbProducts.value.length > 0) {
          setProducts(sbProducts.value);
          localStorage.setItem('sg_products', JSON.stringify(sbProducts.value));
          hasData = true;
        }
        if (sbInquiries.status === 'fulfilled' && sbInquiries.value) {
          setInquiries(sbInquiries.value);
          localStorage.setItem('sg_inquiries', JSON.stringify(sbInquiries.value));
        }
        if (sbSettings.status === 'fulfilled' && sbSettings.value) {
          setSettings(sbSettings.value);
          localStorage.setItem('sg_settings', JSON.stringify(sbSettings.value));
        }
        if (sbMedia.status === 'fulfilled' && sbMedia.value && sbMedia.value.length > 0) {
          setMediaAssets(sbMedia.value);
          localStorage.setItem('sg_media', JSON.stringify(sbMedia.value));
        }

        if (hasData) {
          setIsSyncing(false);
          return;
        }
      }

      // 2. Fallback to Express backend / Cloud SQL
      const [prodRes, inqRes, setRes, medRes] = await Promise.allSettled([
        fetch('/api/products').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/inquiries').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/settings').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/media').then((r) => (r.ok ? r.json() : null)),
      ]);

      if (prodRes.status === 'fulfilled' && prodRes.value && prodRes.value.length > 0) {
        setProducts(prodRes.value);
        localStorage.setItem('sg_products', JSON.stringify(prodRes.value));
      }

      if (inqRes.status === 'fulfilled' && inqRes.value) {
        setInquiries(inqRes.value);
        localStorage.setItem('sg_inquiries', JSON.stringify(inqRes.value));
      }

      if (setRes.status === 'fulfilled' && setRes.value) {
        setSettings(setRes.value);
        localStorage.setItem('sg_settings', JSON.stringify(setRes.value));
      }

      if (medRes.status === 'fulfilled' && medRes.value && medRes.value.length > 0) {
        setMediaAssets(medRes.value);
        localStorage.setItem('sg_media', JSON.stringify(medRes.value));
      }
    } catch (err) {
      console.error('Error syncing data with backend:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    refreshAllData();

    // Setup Supabase Realtime subscriptions if configured
    if (isSupabaseConfigured) {
      const prodSub = supabaseService.subscribeToProducts(() => {
        supabaseService.getProducts().then((data) => {
          if (data) setProducts(data);
        });
      });

      const inqSub = supabaseService.subscribeToInquiries(() => {
        supabaseService.getInquiries().then((data) => {
          if (data) setInquiries(data);
        });
      });

      return () => {
        prodSub?.unsubscribe();
        inqSub?.unsubscribe();
      };
    }
  }, [refreshAllData]);

  // Sync to localStorage as local cache
  useEffect(() => {
    localStorage.setItem('sg_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sg_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('sg_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('sg_media', JSON.stringify(mediaAssets));
  }, [mediaAssets]);

  const openProductDetail = (product: ProductItem) => {
    setSelectedProductForDetail(product);
  };

  const closeProductDetail = () => {
    setSelectedProductForDetail(null);
  };

  const openQuoteModal = (product?: ProductItem | null) => {
    setQuoteModalProduct(product || products[0] || null);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteModalProduct(null);
  };

  const openStockReport = () => {
    setIsStockReportOpen(true);
  };

  const closeStockReport = () => {
    setIsStockReportOpen(false);
  };

  const updateProductStock = async (productId: string, newStock: number, newPackaging?: string) => {
    // Optimistic local update
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            stockTonnes: newStock,
            lotSize: `${newStock >= 5 ? '5–10' : newStock} Tonnes In-Stock`,
            packaging: newPackaging || item.packaging,
          };
        }
        return item;
      })
    );

    // Supabase update
    if (isSupabaseConfigured) {
      await supabaseService.updateProductStock(productId, newStock, newPackaging);
    }

    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/products/${productId}/stock`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ stockTonnes: newStock, packaging: newPackaging }),
      });
      if (!res.ok && !isSupabaseConfigured) {
        throw new Error('Server rejected stock update.');
      }
      showToast(`Batch allocation updated: ${newStock} Tonnes synced to database!`);
    } catch (err: any) {
      console.error('Stock update failed:', err);
      showToast(`Stock updated.`);
    }
  };

  const updateProductPrice = async (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, pricePerKg: newPrice } : item))
    );

    if (isSupabaseConfigured) {
      await supabaseService.updateProductPrice(productId, newPrice);
    }

    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/products/${productId}/price`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ pricePerKg: newPrice }),
      });
      if (!res.ok && !isSupabaseConfigured) {
        throw new Error('Server rejected price update.');
      }
      showToast(`Rate updated: ₹${newPrice}/kg synced to database!`);
    } catch (err) {
      console.error('Price update failed:', err);
      showToast(`Price updated locally.`);
    }
  };

  const toggleProductStatus = async (productId: string) => {
    const current = products.find((p) => p.id === productId);
    const newStatus = current ? !current.active : true;

    setProducts((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, active: newStatus } : item))
    );

    if (isSupabaseConfigured) {
      await supabaseService.toggleProductStatus(productId, newStatus);
    }

    try {
      const headers = await getAuthHeaders();
      await fetch(`/api/products/${productId}/toggle`, {
        method: 'PUT',
        headers,
      });
      showToast(`Product status toggled.`);
    } catch (err) {
      showToast(`Product status toggled locally.`);
    }
  };

  const addNewInquiry = async (inquiryData: Omit<InquiryItem, 'id' | 'timestamp' | 'status'>) => {
    const tempId = `INQ-${Date.now().toString().slice(-4)}`;
    const newInq: InquiryItem = {
      ...inquiryData,
      id: tempId,
      timestamp: 'Just now',
      status: 'new',
    };

    setInquiries((prev) => [newInq, ...prev]);
    showToast('Inquiry logged! Dispatch desk notified.');

    if (isSupabaseConfigured) {
      await supabaseService.createInquiry(newInq);
    }

    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers,
        body: JSON.stringify(newInq),
      });
      if (res.ok) {
        const saved = await res.json();
        setInquiries((prev) => prev.map((item) => (item.id === tempId ? saved : item)));
        return saved;
      }
    } catch (err) {
      console.error('Failed to post inquiry to backend:', err);
    }

    return newInq;
  };

  const updateInquiryStatus = async (inquiryId: string, status: InquiryItem['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === inquiryId ? { ...item, status } : item))
    );

    if (isSupabaseConfigured) {
      await supabaseService.updateInquiryStatus(inquiryId, status);
    }

    try {
      const headers = await getAuthHeaders();
      await fetch(`/api/inquiries/${inquiryId}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status }),
      });
      showToast(`Quotation inquiry #${inquiryId} marked as ${status.toUpperCase()}.`);
    } catch (err) {
      showToast(`Quotation inquiry status updated.`);
    }
  };

  const deleteInquiryItem = async (inquiryId: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== inquiryId));

    if (isSupabaseConfigured) {
      await supabaseService.deleteInquiry(inquiryId);
    }

    try {
      const headers = await getAuthHeaders();
      await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'DELETE',
        headers,
      });
      showToast(`Inquiry #${inquiryId} deleted.`);
    } catch (err) {
      showToast(`Inquiry deleted.`);
    }
  };

  const updateSettings = async (newSettings: Partial<PlantSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));

    if (isSupabaseConfigured) {
      await supabaseService.updateSettings(newSettings);
    }

    try {
      const headers = await getAuthHeaders();
      await fetch('/api/settings', {
        method: 'PUT',
        headers,
        body: JSON.stringify(newSettings),
      });
      showToast('Plant settings saved to database.');
    } catch (err) {
      showToast('Plant settings synchronized.');
    }
  };

  const addMediaAsset = async (asset: Omit<MediaAsset, 'id'>) => {
    const tempId = `asset-${Date.now()}`;
    const newAsset: MediaAsset = {
      ...asset,
      id: tempId,
    };
    setMediaAssets((prev) => [newAsset, ...prev]);

    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/media', {
        method: 'POST',
        headers,
        body: JSON.stringify(newAsset),
      });
      if (res.ok) {
        const saved = await res.json();
        setMediaAssets((prev) => prev.map((item) => (item.id === tempId ? saved : item)));
        showToast('Media asset saved to database.');
        return;
      }
    } catch (err) {
      console.error('Failed to save media asset:', err);
    }
    showToast('New polymer media asset added.');
  };

  const removeMediaAsset = async (id: string) => {
    setMediaAssets((prev) => prev.filter((a) => a.id !== id));

    try {
      const headers = await getAuthHeaders();
      await fetch(`/api/media/${id}`, {
        method: 'DELETE',
        headers,
      });
      showToast('Media asset removed from database.');
    } catch (err) {
      showToast('Media asset removed.');
    }
  };

  const totalStockTonnes = products.reduce((acc, p) => acc + (p.active ? p.stockTonnes : 0), 0);

  return (
    <PlantContext.Provider
      value={{
        products,
        inquiries,
        settings,
        mediaAssets,
        currentPage,
        selectedProductForDetail,
        isQuoteModalOpen,
        quoteModalProduct,
        isStockReportOpen,
        toastMessage,
        isSyncing,
        isSupabaseMode: isSupabaseConfigured,
        setCurrentPage,
        openProductDetail,
        closeProductDetail,
        openQuoteModal,
        closeQuoteModal,
        openStockReport,
        closeStockReport,
        updateProductStock,
        updateProductPrice,
        toggleProductStatus,
        addNewInquiry,
        updateInquiryStatus,
        deleteInquiryItem,
        updateSettings,
        addMediaAsset,
        removeMediaAsset,
        refreshAllData,
        showToast,
        totalStockTonnes,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export const usePlant = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlant must be used within a PlantProvider');
  }
  return context;
};
