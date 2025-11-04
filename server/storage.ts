import { type Feedback, type InsertFeedback } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getFeedback(id: string): Promise<Feedback | undefined>;
  getAllFeedback(): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
}

export class MemStorage implements IStorage {
  private feedback: Map<string, Feedback>;

  constructor() {
    this.feedback = new Map();
  }

  async getFeedback(id: string): Promise<Feedback | undefined> {
    return this.feedback.get(id);
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedback.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = randomUUID();
    const feedback: Feedback = {
      ...insertFeedback,
      id,
      createdAt: new Date(),
    };
    this.feedback.set(id, feedback);
    return feedback;
  }
}

export const storage = new MemStorage();
