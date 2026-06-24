import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/data";
import { parseJsonArray } from "@/lib/utils";
import type { ProjectStatus } from "@/types";

export const metadata = { title: "Projects" };

const statusLabels: Record<ProjectStatus, string> = {
  READY: "Ready to Move",
  UNDER_CONSTRUCTION: "Under Construction",
  UPCOMING: "Upcoming",
};

const statusColors: Record<ProjectStatus, string> = {
  READY: "bg-green-100 text-green-800",
  UNDER_CONSTRUCTION: "bg-amber-100 text-amber-800",
  UPCOMING: "bg-blue-100 text-blue-800",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const validStatus =
    status && ["READY", "UNDER_CONSTRUCTION", "UPCOMING"].includes(status)
      ? (status as ProjectStatus)
      : undefined;

  const projects = await getProjects(validStatus);
  const filters: { label: string; value?: ProjectStatus }[] = [
    { label: "All" },
    { label: "Ready to Move", value: "READY" },
    { label: "Under Construction", value: "UNDER_CONSTRUCTION" },
    { label: "Upcoming", value: "UPCOMING" },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">
            Our Projects
          </p>
          <h1 className="text-4xl font-bold text-navy mb-6">Find your next home</h1>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Link
                key={f.label}
                href={f.value ? `/projects?status=${f.value}` : "/projects"}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  validStatus === f.value || (!validStatus && !f.value)
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-navy hover:bg-gray-200"
                }`}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const images = parseJsonArray(project.images);
            const bhkTypes = parseJsonArray(project.bhkTypes);
            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="relative h-56">
                  <Image
                    src={images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span
                    className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${statusColors[project.status as ProjectStatus]}`}
                  >
                    {statusLabels[project.status as ProjectStatus]}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-navy group-hover:text-gold transition-colors mb-2">
                    {project.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{bhkTypes.join(" · ")}</p>
                  <p className="text-sm text-gray-600">{project.location}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-gray-500 py-16">No projects found for this filter.</p>
        )}
      </div>
    </div>
  );
}
