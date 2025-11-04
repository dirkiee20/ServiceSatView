import {
  users,
  feedback,
  type User,
  type UpsertUser,
  type Feedback,
  type InsertFeedback,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Storage interface
export interface IStorage {
  // User operations - Required for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByFeedbackLinkId(linkId: string): Promise<User | undefined>;
  
  // Feedback operations
  getFeedback(id: string): Promise<Feedback | undefined>;
  getFeedbackByUserId(userId: string): Promise<Feedback[]>;
  createFeedback(userId: string, feedbackData: InsertFeedback): Promise<Feedback>;
}

export class DatabaseStorage implements IStorage {
  // User operations - Required for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUserByFeedbackLinkId(linkId: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.feedbackLinkId, linkId));
    return user;
  }

  // Feedback operations
  async getFeedback(id: string): Promise<Feedback | undefined> {
    const [feedbackItem] = await db
      .select()
      .from(feedback)
      .where(eq(feedback.id, id));
    return feedbackItem;
  }

  async getFeedbackByUserId(userId: string): Promise<Feedback[]> {
    return await db
      .select()
      .from(feedback)
      .where(eq(feedback.userId, userId))
      .orderBy(feedback.createdAt);
  }

  async createFeedback(
    userId: string,
    feedbackData: InsertFeedback
  ): Promise<Feedback> {
    const [newFeedback] = await db
      .insert(feedback)
      .values({
        ...feedbackData,
        userId,
      })
      .returning();
    return newFeedback;
  }
}

export const storage = new DatabaseStorage();
