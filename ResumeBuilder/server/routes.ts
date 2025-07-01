import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertStudySessionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(contactData);
      res.json({ success: true, message: "Message sent successfully!", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating contact message:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again." 
        });
      }
    }
  });

  // Get all contact messages (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch messages" 
      });
    }
  });

  // Study session routes
  app.post("/api/study-sessions", async (req, res) => {
    try {
      const sessionData = insertStudySessionSchema.parse(req.body);
      const session = await storage.createStudySession(sessionData);
      res.json({ success: true, session });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating study session:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create study session" 
        });
      }
    }
  });

  app.get("/api/study-sessions", async (req, res) => {
    try {
      const sessions = await storage.getStudySessions();
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching study sessions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch study sessions" 
      });
    }
  });

  app.patch("/api/study-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const session = await storage.updateStudySession(id, updates);
      
      if (!session) {
        res.status(404).json({ 
          success: false, 
          message: "Study session not found" 
        });
        return;
      }
      
      res.json({ success: true, session });
    } catch (error) {
      console.error("Error updating study session:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update study session" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
