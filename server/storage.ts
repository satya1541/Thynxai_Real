import { 
  type User, type InsertUser, type BlogPost, type InsertBlogPost, 
  type ContactSubmission, type InsertContactSubmission,
  type AdminSetting, type InsertAdminSetting,
  type Subscriber, type InsertSubscriber,
  users, blogPosts, contactSubmissions, adminSettings, subscribers 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  incrementBlogPostLikes(id: string): Promise<BlogPost | undefined>;
  incrementBlogPostComments(id: string): Promise<BlogPost | undefined>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: string): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  markContactSubmissionRead(id: string): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: string): Promise<boolean>;
  getAdminSetting(key: string): Promise<AdminSetting | undefined>;
  setAdminSetting(key: string, value: string): Promise<AdminSetting>;
  deleteAdminSetting(key: string): Promise<boolean>;
  getSubscribers(): Promise<Subscriber[]>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  deleteSubscriber(id: string): Promise<boolean>;
}

export class MySQLStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    await db.insert(users).values({ ...insertUser, id });
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return result[0];
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    await db.insert(blogPosts).values({
      id,
      category: insertPost.category,
      title: insertPost.title,
      excerpt: insertPost.excerpt ?? null,
      imageUrl: insertPost.imageUrl ?? null,
      likes: insertPost.likes ?? 0,
      comments: insertPost.comments ?? 0,
      featured: insertPost.featured ?? false,
    });
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return result[0];
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = await this.getBlogPost(id);
    if (!existing) return undefined;
    
    await db.update(blogPosts).set(updates).where(eq(blogPosts.id, id));
    return this.getBlogPost(id);
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const existing = await this.getBlogPost(id);
    if (!existing) return false;
    
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  }

  async incrementBlogPostLikes(id: string): Promise<BlogPost | undefined> {
    const existing = await this.getBlogPost(id);
    if (!existing) return undefined;
    
    await db.update(blogPosts)
      .set({ likes: sql`COALESCE(${blogPosts.likes}, 0) + 1` })
      .where(eq(blogPosts.id, id));
    return this.getBlogPost(id);
  }

  async incrementBlogPostComments(id: string): Promise<BlogPost | undefined> {
    const existing = await this.getBlogPost(id);
    if (!existing) return undefined;
    
    await db.update(blogPosts)
      .set({ comments: sql`COALESCE(${blogPosts.comments}, 0) + 1` })
      .where(eq(blogPosts.id, id));
    return this.getBlogPost(id);
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.submittedAt));
  }

  async getContactSubmission(id: string): Promise<ContactSubmission | undefined> {
    const result = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return result[0];
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    await db.insert(contactSubmissions).values({
      id,
      name: submission.name,
      phone: submission.phone ?? null,
      email: submission.email,
      subject: submission.subject ?? null,
      message: submission.message,
    });
    const result = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return result[0];
  }

  async markContactSubmissionRead(id: string): Promise<ContactSubmission | undefined> {
    const existing = await this.getContactSubmission(id);
    if (!existing) return undefined;
    
    await db.update(contactSubmissions).set({ read: true }).where(eq(contactSubmissions.id, id));
    return this.getContactSubmission(id);
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    const existing = await this.getContactSubmission(id);
    if (!existing) return false;
    
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
    return true;
  }

  async getAdminSetting(key: string): Promise<AdminSetting | undefined> {
    const result = await db.select().from(adminSettings).where(eq(adminSettings.settingKey, key));
    return result[0];
  }

  async setAdminSetting(key: string, value: string): Promise<AdminSetting> {
    const existing = await this.getAdminSetting(key);
    
    if (existing) {
      await db.update(adminSettings)
        .set({ settingValue: value, updatedAt: new Date() })
        .where(eq(adminSettings.settingKey, key));
      const result = await db.select().from(adminSettings).where(eq(adminSettings.settingKey, key));
      return result[0];
    } else {
      const id = randomUUID();
      await db.insert(adminSettings).values({
        id,
        settingKey: key,
        settingValue: value,
      });
      const result = await db.select().from(adminSettings).where(eq(adminSettings.id, id));
      return result[0];
    }
  }

  async deleteAdminSetting(key: string): Promise<boolean> {
    const existing = await this.getAdminSetting(key);
    if (!existing) return false;
    
    await db.delete(adminSettings).where(eq(adminSettings.settingKey, key));
    return true;
  }

  async getSubscribers(): Promise<Subscriber[]> {
    return await db.select().from(subscribers).orderBy(desc(subscribers.subscribedAt));
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const result = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return result[0];
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = randomUUID();
    await db.insert(subscribers).values({
      id,
      email: insertSubscriber.email,
    });
    const result = await db.select().from(subscribers).where(eq(subscribers.id, id));
    return result[0];
  }

  async deleteSubscriber(id: string): Promise<boolean> {
    const result = await db.select().from(subscribers).where(eq(subscribers.id, id));
    if (!result[0]) return false;
    
    await db.delete(subscribers).where(eq(subscribers.id, id));
    return true;
  }
}

export const storage = new MySQLStorage();
