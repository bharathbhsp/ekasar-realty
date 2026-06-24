"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { parseJsonArray } from "@/lib/utils";
import type { ProjectStatus } from "@/types";
import type { Project } from "@prisma/client";

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

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">
              Our Flagship Projects
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              A reputation built, one community at a time
            </h2>
          </motion.div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-gray-200 hover:border-gold hover:text-gold transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-gray-200 hover:border-gold hover:text-gold transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((project, i) => {
            const images = parseJsonArray(project.images);
            const bhkTypes = parseJsonArray(project.bhkTypes);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="snap-start shrink-0 w-[85vw] sm:w-[400px] lg:w-[440px]"
              >
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={images[0] || "/placeholder.jpg"}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 85vw, 440px"
                    />
                    <span
                      className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${statusColors[project.status as ProjectStatus]}`}
                    >
                      {statusLabels[project.status as ProjectStatus]}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy group-hover:text-gold transition-colors mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{bhkTypes.join(" · ")}</p>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    {project.location}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center text-navy font-semibold hover:text-gold transition-colors"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
