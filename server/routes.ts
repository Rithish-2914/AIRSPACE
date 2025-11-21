import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getChatCompletion, analyzeWorkspace } from "./lib/openai";
import { aiChatRequestSchema, sceneSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Chat endpoint
  app.post("/api/ai/chat", async (req, res) => {
    try {
      if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({ 
          error: "AI service is not configured. Please set OPENAI_API_KEY environment variable." 
        });
      }

      const { message, context } = aiChatRequestSchema.parse(req.body);
      
      const response = await getChatCompletion(message, context);
      
      res.json({ response });
    } catch (error: any) {
      console.error("AI chat error:", error);
      
      if (error.code === 'invalid_api_key') {
        return res.status(401).json({ error: "Invalid OpenAI API key." });
      }
      
      res.status(500).json({ 
        error: error.message || "Failed to get AI response. Please try again." 
      });
    }
  });

  // Workspace analysis endpoint
  app.post("/api/ai/analyze", async (req, res) => {
    try {
      const { objects3D = [], mindMapNodes = [] } = req.body;
      
      const analysis = await analyzeWorkspace(objects3D, mindMapNodes);
      
      res.json({ analysis });
    } catch (error: any) {
      console.error("Workspace analysis error:", error);
      res.status(500).json({ error: error.message || "Failed to analyze workspace" });
    }
  });

  // Scene management endpoints
  app.post("/api/scenes", async (req, res) => {
    try {
      const scene = sceneSchema.parse(req.body);
      const saved = await storage.saveScene(scene);
      res.json(saved);
    } catch (error: any) {
      console.error("Save scene error:", error);
      res.status(400).json({ error: error.message || "Failed to save scene" });
    }
  });

  app.get("/api/scenes", async (req, res) => {
    try {
      const scenes = await storage.getAllScenes();
      res.json(scenes);
    } catch (error: any) {
      console.error("Get scenes error:", error);
      res.status(500).json({ error: error.message || "Failed to get scenes" });
    }
  });

  app.get("/api/scenes/:id", async (req, res) => {
    try {
      const scene = await storage.getScene(req.params.id);
      if (!scene) {
        return res.status(404).json({ error: "Scene not found" });
      }
      res.json(scene);
    } catch (error: any) {
      console.error("Get scene error:", error);
      res.status(500).json({ error: error.message || "Failed to get scene" });
    }
  });

  app.delete("/api/scenes/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteScene(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Scene not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      console.error("Delete scene error:", error);
      res.status(500).json({ error: error.message || "Failed to delete scene" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
