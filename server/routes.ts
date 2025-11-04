import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedbackSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // POST /api/feedback - Submit new feedback
  app.post("/api/feedback", async (req, res) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(validatedData);
      res.json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid feedback data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create feedback" });
      }
    }
  });

  // GET /api/feedback - Get all feedback
  app.get("/api/feedback", async (req, res) => {
    try {
      const allFeedback = await storage.getAllFeedback();
      res.json(allFeedback);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve feedback" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
