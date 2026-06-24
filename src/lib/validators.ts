import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  projectInterest: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

export const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).optional(),
  excerpt: z.string().min(10),
  body: z.string().min(20),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  visibility: z.enum(["PUBLIC", "MEMBER", "DRAFT"]),
  tags: z.string().optional(),
  publishedAt: z.string().optional().nullable(),
});
