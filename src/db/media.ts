import { db } from './index.ts';
import { mediaAssets } from './schema.ts';
import { desc, eq } from 'drizzle-orm';

export async function getAllMediaAssets() {
  try {
    return await db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt));
  } catch (error) {
    console.error('Failed to get media assets:', error);
    throw new Error('Failed to retrieve media assets.', { cause: error });
  }
}

export async function insertMediaAsset(asset: typeof mediaAssets.$inferInsert) {
  try {
    const inserted = await db.insert(mediaAssets).values(asset).returning();
    return inserted[0];
  } catch (error) {
    console.error('Failed to insert media asset:', error);
    throw new Error('Failed to save media asset.', { cause: error });
  }
}

export async function deleteMediaAsset(id: string) {
  try {
    return await db.delete(mediaAssets).where(eq(mediaAssets.id, id)).returning();
  } catch (error) {
    console.error('Failed to delete media asset:', error);
    throw new Error('Failed to delete media asset.', { cause: error });
  }
}
