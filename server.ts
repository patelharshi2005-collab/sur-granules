import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { requireAuth, optionalAuth, AuthRequest } from './src/middleware/auth.ts';
import {
  getAllProducts,
  getProductById,
  upsertProduct,
  updateProductStock,
  updateProductPrice,
  toggleProductActive,
  deleteProduct,
} from './src/db/products.ts';
import {
  getAllInquiries,
  getInquiriesByUser,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
} from './src/db/inquiries.ts';
import { getPlantSettings, updatePlantSettings } from './src/db/settings.ts';
import { getAllMediaAssets, insertMediaAsset, deleteMediaAsset } from './src/db/media.ts';
import { getOrCreateUser, getUserByUid } from './src/db/users.ts';
import { seedDatabaseIfEmpty } from './src/db/seed.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Run seed asynchronously on startup
seedDatabaseIfEmpty().catch((err) => {
  console.error('Database seeding failed:', err);
});

// --- Health Check ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// --- Auth Endpoints ---
app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const email = req.user!.email || 'anonymous@surgranules.com';
    const name = req.body.name || req.user!.name;
    const user = await getOrCreateUser(uid, email, name);
    res.json({ user });
  } catch (error: any) {
    console.error('Failed to sync user:', error);
    res.status(500).json({ error: error.message || 'Failed to sync user.' });
  }
});

app.get('/api/auth/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const user = await getUserByUid(uid);
    res.json({ user });
  } catch (error: any) {
    console.error('Failed to get current user:', error);
    res.status(500).json({ error: error.message || 'Failed to get user.' });
  }
});

// --- Products Endpoints (CRUD) ---
app.get('/api/products', async (_req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error: any) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch products.' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(product);
  } catch (error: any) {
    console.error('Failed to fetch product:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch product.' });
  }
});

app.post('/api/products', requireAuth, async (req: AuthRequest, res) => {
  try {
    const product = await upsertProduct(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    console.error('Failed to create/update product:', error);
    res.status(500).json({ error: error.message || 'Failed to save product.' });
  }
});

app.put('/api/products/:id/stock', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { stockTonnes, packaging } = req.body;
    if (typeof stockTonnes !== 'number') {
      return res.status(400).json({ error: 'stockTonnes must be a number.' });
    }
    const updated = await updateProductStock(req.params.id, stockTonnes, packaging);
    res.json(updated);
  } catch (error: any) {
    console.error('Failed to update product stock:', error);
    res.status(500).json({ error: error.message || 'Failed to update stock.' });
  }
});

app.put('/api/products/:id/price', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { pricePerKg } = req.body;
    if (typeof pricePerKg !== 'number') {
      return res.status(400).json({ error: 'pricePerKg must be a number.' });
    }
    const updated = await updateProductPrice(req.params.id, pricePerKg);
    res.json(updated);
  } catch (error: any) {
    console.error('Failed to update product price:', error);
    res.status(500).json({ error: error.message || 'Failed to update price.' });
  }
});

app.put('/api/products/:id/toggle', requireAuth, async (req: AuthRequest, res) => {
  try {
    const updated = await toggleProductActive(req.params.id);
    res.json(updated);
  } catch (error: any) {
    console.error('Failed to toggle product status:', error);
    res.status(500).json({ error: error.message || 'Failed to toggle status.' });
  }
});

app.delete('/api/products/:id', requireAuth, async (_req: AuthRequest, res) => {
  try {
    const deleted = await deleteProduct(_req.params.id);
    res.json(deleted);
  } catch (error: any) {
    console.error('Failed to delete product:', error);
    res.status(500).json({ error: error.message || 'Failed to delete product.' });
  }
});

// --- Inquiries / RFQs Endpoints (CRUD) ---
app.get('/api/inquiries', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const filterUser = req.query.userOnly === 'true';
    if (filterUser && req.user) {
      const userInquiries = await getInquiriesByUser(req.user.uid);
      return res.json(userInquiries);
    }
    const allInquiries = await getAllInquiries();
    res.json(allInquiries);
  } catch (error: any) {
    console.error('Failed to fetch inquiries:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch inquiries.' });
  }
});

app.post('/api/inquiries', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const payload = {
      ...req.body,
      id: req.body.id || `INQ-${Date.now().toString().slice(-4)}`,
      timestamp: req.body.timestamp || 'Just now',
      status: req.body.status || 'new',
      userId: req.user?.uid || null,
    };
    const created = await createInquiry(payload);
    res.status(201).json(created);
  } catch (error: any) {
    console.error('Failed to submit inquiry:', error);
    res.status(500).json({ error: error.message || 'Failed to submit inquiry.' });
  }
});

app.patch('/api/inquiries/:id/status', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'status is required.' });
    }
    const updated = await updateInquiryStatus(req.params.id, status);
    res.json(updated);
  } catch (error: any) {
    console.error('Failed to update inquiry status:', error);
    res.status(500).json({ error: error.message || 'Failed to update inquiry status.' });
  }
});

app.delete('/api/inquiries/:id', requireAuth, async (_req: AuthRequest, res) => {
  try {
    const deleted = await deleteInquiry(_req.params.id);
    res.json(deleted);
  } catch (error: any) {
    console.error('Failed to delete inquiry:', error);
    res.status(500).json({ error: error.message || 'Failed to delete inquiry.' });
  }
});

// --- Plant Settings Endpoints ---
app.get('/api/settings', async (_req, res) => {
  try {
    const settings = await getPlantSettings();
    res.json(settings);
  } catch (error: any) {
    console.error('Failed to fetch plant settings:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch settings.' });
  }
});

app.put('/api/settings', requireAuth, async (req: AuthRequest, res) => {
  try {
    const updated = await updatePlantSettings(req.body);
    res.json(updated);
  } catch (error: any) {
    console.error('Failed to update plant settings:', error);
    res.status(500).json({ error: error.message || 'Failed to update settings.' });
  }
});

// --- Media Assets Endpoints ---
app.get('/api/media', async (_req, res) => {
  try {
    const media = await getAllMediaAssets();
    res.json(media);
  } catch (error: any) {
    console.error('Failed to fetch media assets:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch media assets.' });
  }
});

app.post('/api/media', requireAuth, async (req: AuthRequest, res) => {
  try {
    const newAsset = {
      ...req.body,
      id: req.body.id || `asset-${Date.now()}`,
    };
    const created = await insertMediaAsset(newAsset);
    res.status(201).json(created);
  } catch (error: any) {
    console.error('Failed to insert media asset:', error);
    res.status(500).json({ error: error.message || 'Failed to save media asset.' });
  }
});

app.delete('/api/media/:id', requireAuth, async (_req: AuthRequest, res) => {
  try {
    const deleted = await deleteMediaAsset(_req.params.id);
    res.json(deleted);
  } catch (error: any) {
    console.error('Failed to delete media asset:', error);
    res.status(500).json({ error: error.message || 'Failed to delete media asset.' });
  }
});

// --- Vite Dev Server Middleware or Static Production ---
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
