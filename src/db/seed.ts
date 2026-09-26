import { db } from './index.ts';
import { products, plantSettings, inquiries, mediaAssets } from './schema.ts';
import { initialProducts, initialInquiries, initialPlantSettings, initialMediaAssets } from '../data/initialData.ts';

export async function seedDatabaseIfEmpty() {
  try {
    const existingProducts = await db.select().from(products).limit(1);
    if (existingProducts.length === 0) {
      console.log('Seeding initial products into Cloud SQL...');
      for (const p of initialProducts) {
        await db.insert(products).values({
          id: p.id,
          code: p.code,
          name: p.name,
          polymer: p.polymer,
          polymerBase: p.polymerBase,
          pricePerKg: p.pricePerKg,
          priceUnit: p.priceUnit || '₹ / kg',
          mfi: p.mfi,
          mfiValue: p.mfiValue,
          dispatchLead: p.dispatchLead,
          minBulkOrder: p.minBulkOrder,
          minBulkOrderNum: p.minBulkOrderNum,
          stockTonnes: p.stockTonnes,
          lotSize: p.lotSize,
          packaging: p.packaging,
          colors: p.colors,
          applications: p.applications,
          dispatchedFrom: p.dispatchedFrom,
          imageUrl: p.imageUrl,
          imageAlt: p.imageAlt,
          active: p.active,
          density: p.density,
          tensileStrength: p.tensileStrength,
          izodImpact: p.izodImpact,
          moistureContent: p.moistureContent,
          overview: p.overview,
        });
      }
      console.log('Products seeded successfully.');
    }

    const existingSettings = await db.select().from(plantSettings).limit(1);
    if (existingSettings.length === 0) {
      console.log('Seeding initial plant settings...');
      await db.insert(plantSettings).values({
        ownerName: initialPlantSettings.ownerName,
        companyName: initialPlantSettings.companyName,
        tagline: initialPlantSettings.tagline,
        primaryPhone: initialPlantSettings.primaryPhone,
        whatsappPhone: initialPlantSettings.whatsappPhone,
        officialEmail: initialPlantSettings.officialEmail,
        factoryAddress: initialPlantSettings.factoryAddress,
        dispatchWindows: initialPlantSettings.dispatchWindows,
        monthlyCapacity: initialPlantSettings.monthlyCapacity,
        dailyDispatchCapacity: initialPlantSettings.dailyDispatchCapacity,
        liveNoticeBanner: initialPlantSettings.liveNoticeBanner,
      });
      console.log('Plant settings seeded successfully.');
    }

    const existingInquiries = await db.select().from(inquiries).limit(1);
    if (existingInquiries.length === 0) {
      console.log('Seeding initial inquiries...');
      for (const inq of initialInquiries) {
        await db.insert(inquiries).values({
          id: inq.id,
          buyerName: inq.buyerName,
          companyName: inq.companyName,
          email: inq.email,
          phone: inq.phone,
          whatsappNumber: inq.whatsappNumber || null,
          product: inq.product,
          grade: inq.grade,
          quantity: inq.quantity,
          unit: inq.unit,
          colors: inq.colors,
          application: inq.application,
          deliveryCity: inq.deliveryCity,
          notes: inq.notes || null,
          timestamp: inq.timestamp,
          status: inq.status,
        });
      }
      console.log('Inquiries seeded successfully.');
    }

    const existingMedia = await db.select().from(mediaAssets).limit(1);
    if (existingMedia.length === 0) {
      console.log('Seeding initial media assets...');
      for (const m of initialMediaAssets) {
        await db.insert(mediaAssets).values({
          id: m.id,
          title: m.title,
          category: m.category,
          imageUrl: m.imageUrl,
          altText: m.altText,
        });
      }
      console.log('Media assets seeded successfully.');
    }
  } catch (error) {
    console.error('Error during database seed check:', error);
  }
}
