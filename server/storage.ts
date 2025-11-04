import {
  users,
  feedback,
  templates,
  type User,
  type UpsertUser,
  type Feedback,
  type InsertFeedback,
  type Template,
  type InsertTemplate,
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

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

  // Template operations
  getTemplatesByUserId(userId: string): Promise<Template[]>;
  getTemplate(id: string): Promise<Template | undefined>;
  createTemplate(userId: string, templateData: InsertTemplate): Promise<Template>;
  updateTemplate(id: string, userId: string, templateData: InsertTemplate): Promise<Template>;
  deleteTemplate(id: string, userId: string): Promise<void>;
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

  // Template operations
  async getTemplatesByUserId(userId: string): Promise<Template[]> {
    return await db
      .select()
      .from(templates)
      .where(eq(templates.userId, userId))
      .orderBy(templates.createdAt);
  }

  async getTemplate(id: string): Promise<Template | undefined> {
    const [template] = await db
      .select()
      .from(templates)
      .where(eq(templates.id, id));
    return template;
  }

  async createTemplate(
    userId: string,
    templateData: InsertTemplate
  ): Promise<Template> {
    const [newTemplate] = await db
      .insert(templates)
      .values({
        ...templateData,
        userId,
      })
      .returning();
    return newTemplate;
  }

  async updateTemplate(
    id: string,
    userId: string,
    templateData: InsertTemplate
  ): Promise<Template> {
    const [updatedTemplate] = await db
      .update(templates)
      .set({
        ...templateData,
        updatedAt: new Date(),
      })
      .where(and(eq(templates.id, id), eq(templates.userId, userId)))
      .returning();
    
    if (!updatedTemplate) {
      throw new Error("Template not found or unauthorized");
    }
    
    return updatedTemplate;
  }

  async deleteTemplate(id: string, userId: string): Promise<void> {
    await db
      .delete(templates)
      .where(and(eq(templates.id, id), eq(templates.userId, userId)));
  }

  async createDefaultTemplates(userId: string): Promise<void> {
    const existingTemplates = await this.getTemplatesByUserId(userId);
    
    if (existingTemplates.length > 0) {
      return;
    }

    const defaultTemplates = [
      {
        name: "Customer Service",
        description: "Collect feedback about customer service quality",
        categories: [
          { id: "service_quality", label: "Service Quality" },
          { id: "response_time", label: "Response Time" },
          { id: "problem_resolution", label: "Problem Resolution" },
          { id: "overall_experience", label: "Overall Experience" },
        ],
        isDefault: 1,
      },
      {
        name: "Product Feedback",
        description: "Gather insights about product quality and features",
        categories: [
          { id: "product_quality", label: "Product Quality" },
          { id: "features", label: "Features" },
          { id: "usability", label: "Usability" },
          { id: "value_for_money", label: "Value for Money" },
        ],
        isDefault: 0,
      },
      {
        name: "Restaurant Experience",
        description: "Capture dining experience feedback",
        categories: [
          { id: "food_quality", label: "Food Quality" },
          { id: "service", label: "Service" },
          { id: "ambiance", label: "Ambiance" },
          { id: "value", label: "Value" },
        ],
        isDefault: 0,
      },
      {
        name: "Event Feedback",
        description: "Collect feedback about events and experiences",
        categories: [
          { id: "organization", label: "Organization" },
          { id: "content_quality", label: "Content Quality" },
          { id: "venue", label: "Venue" },
          { id: "overall_satisfaction", label: "Overall Satisfaction" },
        ],
        isDefault: 0,
      },
    ];

    for (const template of defaultTemplates) {
      await this.createTemplate(userId, template);
    }
  }
}

export const storage = new DatabaseStorage();
