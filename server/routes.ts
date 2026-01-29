import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, insertContactSubmissionSchema, insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";

declare module "express-session" {
  interface SessionData {
    adminAuthenticated?: boolean;
    csrfToken?: string;
  }
}

function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.adminAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function verifyCsrfToken(req: Request, res: Response, next: NextFunction) {
  const tokenFromHeader = req.headers["x-csrf-token"];
  const sessionToken = req.session?.csrfToken;
  
  if (!sessionToken || !tokenFromHeader || tokenFromHeader !== sessionToken) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  app.patch("/api/blog-posts/:id", async (req, res) => {
    try {
      const post = await storage.updateBlogPost(req.params.id, req.body);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  app.post("/api/blog-posts/:id/like", async (req, res) => {
    try {
      const post = await storage.incrementBlogPostLikes(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to like blog post" });
    }
  });

  app.post("/api/blog-posts/:id/comment", async (req, res) => {
    try {
      const post = await storage.incrementBlogPostComments(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to add comment" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact form data" });
    }
  });

  app.get("/api/admin/contact-submissions", requireAdminAuth, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  app.patch("/api/admin/contact-submissions/:id/read", requireAdminAuth, verifyCsrfToken, async (req, res) => {
    try {
      const submission = await storage.markContactSubmissionRead(req.params.id);
      if (!submission) {
        return res.status(404).json({ error: "Contact submission not found" });
      }
      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: "Failed to update contact submission" });
    }
  });

  app.delete("/api/admin/contact-submissions/:id", requireAdminAuth, verifyCsrfToken, async (req, res) => {
    try {
      const deleted = await storage.deleteContactSubmission(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Contact submission not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete contact submission" });
    }
  });

  app.get("/api/admin/pin-status", async (req, res) => {
    try {
      const setting = await storage.getAdminSetting("admin_pin");
      res.json({ isSet: !!setting });
    } catch (error) {
      res.status(500).json({ error: "Failed to check PIN status" });
    }
  });

  app.get("/api/admin/auth-status", async (req, res) => {
    if (!req.session.csrfToken) {
      req.session.csrfToken = generateCsrfToken();
    }
    res.json({ 
      authenticated: !!req.session?.adminAuthenticated,
      csrfToken: req.session.csrfToken
    });
  });

  const pinSchema = z.object({ pin: z.string().length(4).regex(/^\d+$/) });

  app.post("/api/admin/set-pin", async (req, res) => {
    try {
      const { pin } = pinSchema.parse(req.body);
      const existing = await storage.getAdminSetting("admin_pin");
      if (existing) {
        return res.status(400).json({ error: "PIN already set" });
      }
      const hashedPin = await bcrypt.hash(pin, 10);
      await storage.setAdminSetting("admin_pin", hashedPin);
      req.session.adminAuthenticated = true;
      if (!req.session.csrfToken) {
        req.session.csrfToken = generateCsrfToken();
      }
      res.json({ success: true, csrfToken: req.session.csrfToken });
    } catch (error) {
      res.status(400).json({ error: "Invalid PIN format" });
    }
  });

  app.post("/api/admin/verify-pin", async (req, res) => {
    try {
      const { pin } = pinSchema.parse(req.body);
      const setting = await storage.getAdminSetting("admin_pin");
      if (!setting) {
        return res.status(400).json({ error: "PIN not set" });
      }
      const isValid = await bcrypt.compare(pin, setting.settingValue);
      if (isValid) {
        req.session.adminAuthenticated = true;
        if (!req.session.csrfToken) {
          req.session.csrfToken = generateCsrfToken();
        }
      }
      res.json({ valid: isValid, csrfToken: isValid ? req.session.csrfToken : undefined });
    } catch (error) {
      res.status(400).json({ error: "Invalid PIN format" });
    }
  });

  app.post("/api/admin/logout", verifyCsrfToken, async (req, res) => {
    req.session.adminAuthenticated = false;
    req.session.csrfToken = undefined;
    res.json({ success: true });
  });

  app.post("/api/admin/reset-pin", requireAdminAuth, verifyCsrfToken, async (req, res) => {
    try {
      await storage.deleteAdminSetting("admin_pin");
      req.session.adminAuthenticated = false;
      req.session.csrfToken = undefined;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to reset PIN" });
    }
  });

  app.post("/api/subscribers", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      const existing = await storage.getSubscriberByEmail(validatedData.email);
      if (existing) {
        return res.status(400).json({ error: "Email already subscribed" });
      }
      const subscriber = await storage.createSubscriber(validatedData);
      res.status(201).json(subscriber);
    } catch (error) {
      res.status(400).json({ error: "Invalid subscription data" });
    }
  });

  app.get("/api/admin/subscribers", requireAdminAuth, async (req, res) => {
    try {
      const subscribersList = await storage.getSubscribers();
      res.json(subscribersList);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  });

  app.delete("/api/admin/subscribers/:id", requireAdminAuth, verifyCsrfToken, async (req, res) => {
    try {
      const deleted = await storage.deleteSubscriber(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Subscriber not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete subscriber" });
    }
  });

  return httpServer;
}
