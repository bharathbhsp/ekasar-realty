import { auth } from "@/lib/auth";
import { getFeaturedProjects, getPublishedPosts } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { Pillars } from "@/components/home/Pillars";
import { Stats } from "@/components/home/Stats";
import { ProjectsCarousel } from "@/components/home/ProjectsCarousel";
import { BlogPreview } from "@/components/home/ContactSection";
import { LeadForm } from "@/components/home/ContactSection";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const session = await auth();
  const [projects, posts, allProjects] = await Promise.all([
    getFeaturedProjects(),
    getPublishedPosts(4),
    prisma.project.findMany({ select: { name: true } }),
  ]);

  return (
    <>
      <Hero />
      <Pillars />
      <Stats />
      <ProjectsCarousel projects={projects} />
      <BlogPreview posts={posts} isAuthenticated={!!session?.user} />
      <LeadForm projects={allProjects} />
    </>
  );
}
