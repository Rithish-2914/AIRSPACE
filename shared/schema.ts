import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// 3D Object Schema
export const object3DSchema = z.object({
  id: z.string(),
  type: z.enum(['cube', 'sphere', 'cylinder', 'cone', 'torus', 'panel']),
  position: z.object({ x: z.number(), y: z.number(), z: z.number() }),
  rotation: z.object({ x: z.number(), y: z.number(), z: z.number() }),
  scale: z.object({ x: z.number(), y: z.number(), z: z.number() }),
  color: z.string(),
  name: z.string().optional(),
});

export type Object3D = z.infer<typeof object3DSchema>;

// Mind Map Node Schema
export const mindMapNodeSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'circle', 'rectangle', 'diamond']),
  content: z.string(),
  position: z.object({ x: z.number(), y: z.number() }),
  size: z.object({ width: z.number(), height: z.number() }),
  color: z.string(),
  connections: z.array(z.string()).optional(),
});

export type MindMapNode = z.infer<typeof mindMapNodeSchema>;

// App Window State
export const appWindowSchema = z.object({
  id: z.string(),
  appType: z.enum(['notes', 'calculator', 'sketch', 'files', 'music', 'ai', 'browser', 'builder', 'ideas']),
  position: z.object({ x: z.number(), y: z.number() }),
  size: z.object({ width: z.number(), height: z.number() }),
  zIndex: z.number(),
  isMinimized: z.boolean(),
  data: z.any().optional(),
});

export type AppWindow = z.infer<typeof appWindowSchema>;

// Gesture State
export const gestureSchema = z.object({
  type: z.enum(['point', 'pinch', 'fist', 'open', 'swipe-left', 'swipe-right', 'swipe-up', 'swipe-down', 'two-finger-rotate', 'none']),
  confidence: z.number(),
  position: z.object({ x: z.number(), y: z.number() }).optional(),
  data: z.any().optional(),
});

export type Gesture = z.infer<typeof gestureSchema>;

// AI Chat Message Schema
export const aiMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  timestamp: z.number(),
});

export type AIMessage = z.infer<typeof aiMessageSchema>;

// AI Chat Request
export const aiChatRequestSchema = z.object({
  message: z.string(),
  context: z.object({
    objects3D: z.array(object3DSchema).optional(),
    mindMapNodes: z.array(mindMapNodeSchema).optional(),
    currentApp: z.string().optional(),
  }).optional(),
});

export type AIChatRequest = z.infer<typeof aiChatRequestSchema>;

// Scene Save/Load Schema
export const sceneSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['builder', 'ideas']),
  objects: z.array(z.any()),
  createdAt: z.number(),
});

export type Scene = z.infer<typeof sceneSchema>;
