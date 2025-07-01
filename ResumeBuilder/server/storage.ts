import { users, contactMessages, studySessions, type User, type InsertUser, type ContactMessage, type InsertContactMessage, type StudySession, type InsertStudySession } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  createStudySession(session: InsertStudySession): Promise<StudySession>;
  getStudySessions(): Promise<StudySession[]>;
  updateStudySession(id: number, updates: Partial<StudySession>): Promise<StudySession | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private studySessions: Map<number, StudySession>;
  private currentUserId: number;
  private currentMessageId: number;
  private currentSessionId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.studySessions = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    this.currentSessionId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = { 
      id,
      name: insertMessage.name,
      email: insertMessage.email,
      subject: insertMessage.subject || null,
      message: insertMessage.message,
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createStudySession(insertSession: InsertStudySession): Promise<StudySession> {
    const id = this.currentSessionId++;
    const session: StudySession = {
      id,
      timerType: insertSession.timerType,
      duration: insertSession.duration,
      theme: insertSession.theme,
      completed: insertSession.completed || false,
      createdAt: new Date()
    };
    this.studySessions.set(id, session);
    return session;
  }

  async getStudySessions(): Promise<StudySession[]> {
    return Array.from(this.studySessions.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateStudySession(id: number, updates: Partial<StudySession>): Promise<StudySession | undefined> {
    const session = this.studySessions.get(id);
    if (!session) return undefined;
    
    const updatedSession = { ...session, ...updates };
    this.studySessions.set(id, updatedSession);
    return updatedSession;
  }
}

export const storage = new MemStorage();
