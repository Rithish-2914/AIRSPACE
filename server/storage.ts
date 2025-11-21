import { type User, type InsertUser, type Scene } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Scene management
  saveScene(scene: Scene): Promise<Scene>;
  getScene(id: string): Promise<Scene | undefined>;
  getAllScenes(): Promise<Scene[]>;
  deleteScene(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private scenes: Map<string, Scene>;

  constructor() {
    this.users = new Map();
    this.scenes = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveScene(scene: Scene): Promise<Scene> {
    this.scenes.set(scene.id, scene);
    return scene;
  }

  async getScene(id: string): Promise<Scene | undefined> {
    return this.scenes.get(id);
  }

  async getAllScenes(): Promise<Scene[]> {
    return Array.from(this.scenes.values());
  }

  async deleteScene(id: string): Promise<boolean> {
    return this.scenes.delete(id);
  }
}

export const storage = new MemStorage();
