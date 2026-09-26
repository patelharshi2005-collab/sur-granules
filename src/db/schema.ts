import { relations } from 'drizzle-orm';
import { boolean, doublePrecision, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  name: text('name'),
  role: text('role').notNull().default('buyer'),
  phone: text('phone'),
  company: text('company'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  code: text('code').notNull(),
  name: text('name').notNull(),
  polymer: text('polymer').notNull(),
  polymerBase: text('polymer_base').notNull(),
  pricePerKg: doublePrecision('price_per_kg').notNull(),
  priceUnit: text('price_unit').default('₹ / kg'),
  mfi: text('mfi').notNull(),
  mfiValue: doublePrecision('mfi_value').notNull(),
  dispatchLead: text('dispatch_lead').notNull(),
  minBulkOrder: text('min_bulk_order').notNull(),
  minBulkOrderNum: doublePrecision('min_bulk_order_num').notNull(),
  stockTonnes: doublePrecision('stock_tonnes').notNull(),
  lotSize: text('lot_size').notNull(),
  packaging: text('packaging').notNull(),
  colors: jsonb('colors').$type<string[]>().notNull(),
  applications: jsonb('applications').$type<string[]>().notNull(),
  dispatchedFrom: text('dispatched_from').notNull(),
  imageUrl: text('image_url').notNull(),
  imageAlt: text('image_alt').notNull(),
  active: boolean('active').default(true).notNull(),
  density: text('density').notNull(),
  tensileStrength: text('tensile_strength').notNull(),
  izodImpact: text('izod_impact').notNull(),
  moistureContent: text('moisture_content').notNull(),
  overview: text('overview').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const inquiries = pgTable('inquiries', {
  id: text('id').primaryKey(),
  buyerName: text('buyer_name').notNull(),
  companyName: text('company_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  whatsappNumber: text('whatsapp_number'),
  product: text('product').notNull(),
  grade: text('grade').notNull(),
  quantity: doublePrecision('quantity').notNull(),
  unit: text('unit').notNull().default('MT'),
  colors: jsonb('colors').$type<string[]>().notNull(),
  application: text('application').notNull(),
  deliveryCity: text('delivery_city').notNull(),
  notes: text('notes'),
  timestamp: text('timestamp').notNull(),
  status: text('status').notNull().default('new'),
  userId: text('user_id').references(() => users.uid),
  createdAt: timestamp('created_at').defaultNow(),
});

export const plantSettings = pgTable('plant_settings', {
  id: serial('id').primaryKey(),
  ownerName: text('owner_name').notNull(),
  companyName: text('company_name').notNull(),
  tagline: text('tagline').notNull(),
  primaryPhone: text('primary_phone').notNull(),
  whatsappPhone: text('whatsapp_phone').notNull(),
  officialEmail: text('official_email').notNull(),
  factoryAddress: text('factory_address').notNull(),
  dispatchWindows: text('dispatch_windows').notNull(),
  monthlyCapacity: text('monthly_capacity').notNull(),
  dailyDispatchCapacity: text('daily_dispatch_capacity').notNull(),
  liveNoticeBanner: text('live_notice_banner').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const mediaAssets = pgTable('media_assets', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  imageUrl: text('image_url').notNull(),
  altText: text('alt_text').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  inquiries: many(inquiries),
}));

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  user: one(users, {
    fields: [inquiries.userId],
    references: [users.uid],
  }),
}));
