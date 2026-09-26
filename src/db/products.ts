import { db } from './index.ts';
import { products } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getAllProducts() {
  try {
    return await db.select().from(products);
  } catch (error) {
    console.error('Failed to get products:', error);
    throw new Error('Failed to fetch products from database.', { cause: error });
  }
}

export async function getProductById(id: string) {
  try {
    const res = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return res[0] || null;
  } catch (error) {
    console.error('Failed to get product by ID:', error);
    throw new Error('Failed to fetch product.', { cause: error });
  }
}

export async function upsertProduct(productData: typeof products.$inferInsert) {
  try {
    const existing = await db.select().from(products).where(eq(products.id, productData.id)).limit(1);
    if (existing.length > 0) {
      const updated = await db
        .update(products)
        .set({
          ...productData,
          updatedAt: new Date(),
        })
        .where(eq(products.id, productData.id))
        .returning();
      return updated[0];
    }

    const inserted = await db.insert(products).values(productData).returning();
    return inserted[0];
  } catch (error) {
    console.error('Failed to upsert product:', error);
    throw new Error('Failed to save product in database.', { cause: error });
  }
}

export async function updateProductStock(id: string, stockTonnes: number, packaging?: string) {
  try {
    const updateData: { stockTonnes: number; updatedAt: Date; lotSize: string; packaging?: string } = {
      stockTonnes,
      lotSize: `${stockTonnes >= 5 ? '5–10' : stockTonnes} Tonnes In-Stock`,
      updatedAt: new Date(),
    };
    if (packaging) {
      updateData.packaging = packaging;
    }

    const updated = await db
      .update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();
    return updated[0];
  } catch (error) {
    console.error('Failed to update product stock:', error);
    throw new Error('Failed to update product inventory allocation.', { cause: error });
  }
}

export async function updateProductPrice(id: string, pricePerKg: number) {
  try {
    const updated = await db
      .update(products)
      .set({
        pricePerKg,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();
    return updated[0];
  } catch (error) {
    console.error('Failed to update product price:', error);
    throw new Error('Failed to update product pricing.', { cause: error });
  }
}

export async function toggleProductActive(id: string) {
  try {
    const item = await getProductById(id);
    if (!item) {
      throw new Error(`Product ${id} not found.`);
    }
    const updated = await db
      .update(products)
      .set({
        active: !item.active,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();
    return updated[0];
  } catch (error) {
    console.error('Failed to toggle product status:', error);
    throw new Error('Failed to change product status.', { cause: error });
  }
}

export async function deleteProduct(id: string) {
  try {
    return await db.delete(products).where(eq(products.id, id)).returning();
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw new Error('Failed to delete product.', { cause: error });
  }
}
