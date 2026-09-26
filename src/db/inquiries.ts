import { db } from './index.ts';
import { inquiries } from './schema.ts';
import { desc, eq } from 'drizzle-orm';

export async function getAllInquiries() {
  try {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  } catch (error) {
    console.error('Failed to get inquiries:', error);
    throw new Error('Failed to retrieve inquiries.', { cause: error });
  }
}

export async function getInquiriesByUser(userId: string) {
  try {
    return await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.userId, userId))
      .orderBy(desc(inquiries.createdAt));
  } catch (error) {
    console.error('Failed to get inquiries for user:', error);
    throw new Error('Failed to retrieve inquiries for user.', { cause: error });
  }
}

export async function createInquiry(data: typeof inquiries.$inferInsert) {
  try {
    const inserted = await db.insert(inquiries).values(data).returning();
    return inserted[0];
  } catch (error) {
    console.error('Failed to create inquiry:', error);
    throw new Error('Failed to submit quote inquiry.', { cause: error });
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    const updated = await db
      .update(inquiries)
      .set({ status })
      .where(eq(inquiries.id, id))
      .returning();
    return updated[0];
  } catch (error) {
    console.error('Failed to update inquiry status:', error);
    throw new Error('Failed to update inquiry status.', { cause: error });
  }
}

export async function deleteInquiry(id: string) {
  try {
    return await db.delete(inquiries).where(eq(inquiries.id, id)).returning();
  } catch (error) {
    console.error('Failed to delete inquiry:', error);
    throw new Error('Failed to delete inquiry.', { cause: error });
  }
}
