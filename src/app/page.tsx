import { auth } from "@/lib/auth";
import { getFeaturedProjects, getPublishedPosts } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { Pillars } from "@/components/home/Pillars";
import { Stats } from "@/components/home/Stats";
import { ProjectsCarousel } from "@/components/home/ProjectsCarousel";
import { BlogPreview, LeadForm } from "@/components/home/ContactSection";

export default async function HomePage() {
  const session = await auth();
  const [projects, posts] = await Promise.all([
    getFeaturedProjects(),
    getPublishedPosts(4),
  ]);

  const projectNames = projects.map((p) => ({ name: p.name as string }));

  return (
    <>
      <Hero />
      <Pillars />
      <Stats />
      <ProjectsCarousel projects={projects} />
      <BlogPreview posts={posts} isAuthenticated={!!session?.user} />
      <LeadForm projects={projectNames} />
    </>
  );
}
