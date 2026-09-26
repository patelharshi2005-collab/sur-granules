import { db } from './index.ts';
import { plantSettings } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getPlantSettings() {
  try {
    const list = await db.select().from(plantSettings).limit(1);
    return list[0] || null;
  } catch (error) {
    console.error('Failed to get plant settings:', error);
    throw new Error('Failed to retrieve plant settings.', { cause: error });
  }
}

export async function updatePlantSettings(settingsData: Partial<typeof plantSettings.$inferInsert>) {
  try {
    const existing = await getPlantSettings();
    if (existing) {
      const updated = await db
        .update(plantSettings)
        .set({
          ...settingsData,
          updatedAt: new Date(),
        })
        .where(eq(plantSettings.id, existing.id))
        .returning();
      return updated[0];
    } else {
      const inserted = await db
        .insert(plantSettings)
        .values(settingsData as typeof plantSettings.$inferInsert)
        .returning();
      return inserted[0];
    }
  } catch (error) {
    console.error('Failed to update plant settings:', error);
    throw new Error('Failed to update plant settings.', { cause: error });
  }
}
