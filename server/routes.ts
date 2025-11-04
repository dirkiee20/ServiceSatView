import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertFeedbackSchema, insertTemplateSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware - Required for Replit Auth
  await setupAuth(app);

  // Auth routes - Required for Replit Auth
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public feedback submission - via feedback link
  app.post("/api/feedback/submit/:linkId", async (req, res) => {
    try {
      const { linkId } = req.params;
      
      // Find user by feedback link ID
      const user = await storage.getUserByFeedbackLinkId(linkId);
      if (!user) {
        return res.status(404).json({ error: "Invalid feedback link" });
      }

      const validatedData = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(user.id, validatedData);
      res.json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid feedback data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create feedback" });
      }
    }
  });

  // Protected routes - require authentication
  
  // Get user's feedback
  app.get("/api/feedback", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const allFeedback = await storage.getFeedbackByUserId(userId);
      res.json(allFeedback);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve feedback" });
    }
  });

  // Template routes
  
  // Get templates for public feedback form (via feedback link)
  app.get("/api/templates/public/:linkId", async (req, res) => {
    try {
      const { linkId } = req.params;
      
      // Find user by feedback link ID
      const user = await storage.getUserByFeedbackLinkId(linkId);
      if (!user) {
        return res.status(404).json({ error: "Invalid feedback link" });
      }

      const templates = await storage.getTemplatesByUserId(user.id);
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve templates" });
    }
  });

  // Get all templates for authenticated user
  app.get("/api/templates", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const templates = await storage.getTemplatesByUserId(userId);
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve templates" });
    }
  });

  // Create a new template
  app.post("/api/templates", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(userId, validatedData);
      res.json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid template data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create template" });
      }
    }
  });

  // Update a template
  app.put("/api/templates/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      const validatedData = insertTemplateSchema.parse(req.body);
      const template = await storage.updateTemplate(id, userId, validatedData);
      res.json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid template data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update template" });
      }
    }
  });

  // Delete a template
  app.delete("/api/templates/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      await storage.deleteTemplate(id, userId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete template" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
