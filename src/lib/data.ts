import { createServiceClient } from "@/lib/supabase/server";
import type { Project, Post, PostWithAuthor } from "@/types/database";
import type { ProjectStatus } from "@/types";

async function attachAuthors(posts: Post[]): Promise<PostWithAuthor[]> {
  if (posts.length === 0) return [];

  const supabase = createServiceClient();
  const authorIds = [...new Set(posts.map((p) => p.authorId))];
  const { data: authors } = await supabase
    .from("User")
    .select("id, name")
    .in("id", authorIds);

  const nameById = new Map(
    (authors ?? []).map((a) => [a.id as string, a.name as string])
  );

  return posts.map((post) => ({
    ...post,
    author: nameById.has(post.authorId)
      ? { name: nameById.get(post.authorId)! }
      : null,
  }));
}

export async function getPublishedPosts(limit?: number) {
  const supabase = createServiceClient();
  let query = supabase
    .from("Post")
    .select("*")
    .in("visibility", ["PUBLIC", "MEMBER"])
    .order("publishedAt", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return attachAuthors((data ?? []) as Post[]);
}

export async function getPostBySlug(slug: string) {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const [withAuthor] = await attachAuthors([data as Post]);
  return withAuthor;
}

export async function getProjects(status?: ProjectStatus) {
  const supabase = createServiceClient();
  let query = supabase
    .from("Project")
    .select("*")
    .order("featured", { ascending: false })
    .order("createdAt", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("Project")
    .select("*")
    .eq("featured", true)
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("Project")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getAdminPosts(userId: string, role: string) {
  const supabase = createServiceClient();
  let query = supabase.from("Post").select("*").order("updatedAt", { ascending: false });

  if (role !== "ADMIN") query = query.eq("authorId", userId);

  const { data, error } = await query;
  if (error) throw error;
  return attachAuthors((data ?? []) as Post[]);
}

export function getVisibleBody(
  body: string,
  visibility: string,
  isAuthenticated: boolean
): { content: string; gated: boolean } {
  if (visibility === "MEMBER" && !isAuthenticated) {
    const teaser = body.slice(0, 500);
    return {
      content: teaser + (body.length > 500 ? "..." : ""),
      gated: true,
    };
  }
  return { content: body, gated: false };
}

export const SITE_STATS = {
  projectsDelivered: 12,
  yearsExperience: 18,
  sftDeveloped: "10L",
  sftUnderDevelopment: "6L",
};

export const PILLARS = [
  {
    title: "Trust & Compliance",
    description:
      "Rigorous legal due diligence, compliant processes, and empathy-driven decisions.",
    icon: "shield",
  },
  {
    title: "Value Engineering",
    description:
      "Maximising what buyers get from every square foot and every rupee.",
    icon: "trending",
  },
  {
    title: "Lifestyle Design",
    description:
      "Shaping spaces that address everyday needs while enhancing comfort and usability.",
    icon: "home",
  },
  {
    title: "Quality Standards",
    description:
      "Delivering standards that are consistent, measurable, and built to last.",
    icon: "award",
  },
  {
    title: "On-Time Delivery",
    description:
      "Keeping projects predictable through disciplined planning and control.",
    icon: "clock",
  },
  {
    title: "Sustainable Living",
    description:
      "Building responsibly so today's comfort does not become tomorrow's cost.",
    icon: "leaf",
  },
];
