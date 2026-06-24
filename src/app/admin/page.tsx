import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAdminPosts } from "@/lib/data";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboard() {
  const session = await auth();
  const [postCount, leadCount, projectCount] = await Promise.all([
    getAdminPosts(session!.user!.id, session!.user!.role).then((p) => p.length),
    session!.user!.role === "ADMIN"
      ? prisma.lead.count()
      : Promise.resolve(0),
    prisma.project.count(),
  ]);

  return (
    <div className="grid sm:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Blog Posts</p>
        <p className="text-3xl font-bold text-navy">{postCount}</p>
        <Link href="/admin/blog" className="text-sm text-gold font-medium mt-2 inline-block hover:underline">
          Manage →
        </Link>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Projects</p>
        <p className="text-3xl font-bold text-navy">{projectCount}</p>
        <Link href="/projects" className="text-sm text-gold font-medium mt-2 inline-block hover:underline">
          View site →
        </Link>
      </div>
      {session!.user!.role === "ADMIN" && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Leads</p>
          <p className="text-3xl font-bold text-navy">{leadCount}</p>
          <Link href="/admin/leads" className="text-sm text-gold font-medium mt-2 inline-block hover:underline">
            View leads →
          </Link>
        </div>
      )}
    </div>
  );
}
