import Link from "next/link";
import { auth } from "@/lib/auth";
import { getAdminPosts } from "@/lib/data";
import { createServiceClient } from "@/lib/supabase/server";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboard() {
  const session = await auth();
  const supabase = createServiceClient();

  const [posts, projectCount, leadCount] = await Promise.all([
    getAdminPosts(session!.user!.id, session!.user!.role).then((p) => p.length),
    supabase.from("Project").select("id", { count: "exact", head: true }),
    session!.user!.role === "ADMIN"
      ? supabase.from("Lead").select("id", { count: "exact", head: true })
      : Promise.resolve({ count: 0 }),
  ]);

  return (
    <div className="grid sm:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Blog Posts</p>
        <p className="text-3xl font-bold text-navy">{posts}</p>
        <Link href="/admin/blog" className="text-sm text-gold font-medium mt-2 inline-block hover:underline">
          Manage →
        </Link>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Projects</p>
        <p className="text-3xl font-bold text-navy">{projectCount.count ?? 0}</p>
        <Link href="/projects" className="text-sm text-gold font-medium mt-2 inline-block hover:underline">
          View site →
        </Link>
      </div>
      {session!.user!.role === "ADMIN" && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Leads</p>
          <p className="text-3xl font-bold text-navy">{leadCount.count ?? 0}</p>
          <Link href="/admin/leads" className="text-sm text-gold font-medium mt-2 inline-block hover:underline">
            View leads →
          </Link>
        </div>
      )}
    </div>
  );
}
