import { prisma } from "@/lib/prisma";
import type { ProjectStatus } from "@/types";

export async function getPublishedPosts(limit?: number) {
  return prisma.post.findMany({
    where: { visibility: { in: ["PUBLIC", "MEMBER"] } },
    include: { author: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
    ...(limit ? { take: limit } : {}),
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });
}

export async function getProjects(status?: ProjectStatus) {
  return prisma.project.findMany({
    where: status ? { status } : undefined,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export async function getAdminPosts(userId: string, role: string) {
  return prisma.post.findMany({
    where: role === "ADMIN" ? undefined : { authorId: userId },
    include: { author: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });
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
