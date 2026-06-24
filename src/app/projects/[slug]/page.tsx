import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data";
import { parseJsonArray } from "@/lib/utils";
import { LeadForm } from "@/components/home/ContactSection";

type PageProps = { params: Promise<{ slug: string }> };

import type { ProjectStatus } from "@/types";

const statusLabels: Record<ProjectStatus, string> = {
  READY: "Ready to Move",
  UNDER_CONSTRUCTION: "Under Construction",
  UPCOMING: "Upcoming",
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.name,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const images = parseJsonArray(project.images);
  const bhkTypes = parseJsonArray(project.bhkTypes);
  const highlights = parseJsonArray(project.highlights);

  return (
    <>
      <div className="pt-16">
        <div className="relative h-[50vh] min-h-[400px]">
          <Image
            src={images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"}
            alt={project.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
            <span className="text-gold text-sm font-medium uppercase tracking-widest">
              {statusLabels[project.status as ProjectStatus]}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">{project.name}</h1>
            <p className="text-white/80 mt-2">{project.location}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {images.slice(1).map((img, i) => (
                    <div key={i} className="relative h-48 rounded-xl overflow-hidden">
                      <Image src={img} alt="" fill className="object-cover" sizes="50vw" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-cream rounded-2xl p-6">
                <h3 className="font-bold text-navy mb-4">Configuration</h3>
                <div className="flex flex-wrap gap-2">
                  {bhkTypes.map((bhk) => (
                    <span
                      key={bhk}
                      className="bg-white text-navy text-sm font-medium px-3 py-1.5 rounded-full border border-gray-200"
                    >
                      {bhk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-cream rounded-2xl p-6">
                <h3 className="font-bold text-navy mb-4">Highlights</h3>
                <ul className="space-y-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-gold mt-0.5">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/#contact"
                className="block text-center bg-navy text-white font-semibold py-3.5 rounded-full hover:bg-navy-light transition-colors"
              >
                Schedule a Site Visit
              </Link>
            </div>
          </div>
        </div>
      </div>

      <LeadForm projects={[{ name: project.name }]} />
    </>
  );
}
