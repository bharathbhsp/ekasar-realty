import type { Role, PostVisibility, ProjectStatus } from "@/types";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phone: string | null;
  role: Role;
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImageUrl: string | null;
  visibility: PostVisibility;
  tags: string;
  authorId: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  status: ProjectStatus;
  location: string;
  bhkTypes: string;
  description: string;
  images: string;
  highlights: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectInterest: string | null;
  message: string | null;
  source: string;
  createdAt: string;
}

export type PostWithAuthor = Post & { author: { name: string } | null };
