import { db } from './index.ts';
import { users } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, name?: string) {
  try {
    const existing = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    if (existing.length > 0) {
      if (name && !existing[0].name) {
        const updated = await db
          .update(users)
          .set({ name, updatedAt: new Date() })
          .where(eq(users.uid, uid))
          .returning();
        return updated[0];
      }
      return existing[0];
    }

    const inserted = await db
      .insert(users)
      .values({
        uid,
        email,
        name: name || email.split('@')[0],
        role: 'buyer',
      })
      .returning();

    return inserted[0];
  } catch (error) {
    console.error('Error in getOrCreateUser:', error);
    throw new Error('Failed to retrieve or create user record.', { cause: error });
  }
}

export async function getUserByUid(uid: string) {
  try {
    const res = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return res[0] || null;
  } catch (error) {
    console.error('Error fetching user by UID:', error);
    throw new Error('Failed to fetch user.', { cause: error });
  }
}

export async function updateUserRole(uid: string, role: string) {
  try {
    const updated = await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.uid, uid))
      .returning();
    return updated[0];
  } catch (error) {
    console.error('Error updating user role:', error);
    throw new Error('Failed to update user role.', { cause: error });
  }
}
