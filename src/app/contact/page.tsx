import { getProjects } from "@/lib/data";
import { LeadForm } from "@/components/home/ContactSection";

export const metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const projects = await getProjects();
  const projectNames = projects.map((p) => ({ name: p.name as string }));

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
        <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">
          Contact
        </p>
        <h1 className="text-4xl font-bold text-navy">We&apos;d love to hear from you</h1>
      </div>
      <LeadForm projects={projectNames} />
    </div>
  );
}
