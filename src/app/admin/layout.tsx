import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { hasMinRole } from "@/lib/rbac";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/sign-in?returnUrl=/admin");
  if (!hasMinRole(session.user.role, "EDITOR")) redirect("/");

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-navy">Admin</h1>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin" className="text-navy hover:text-gold font-medium">
              Dashboard
            </Link>
            <Link href="/admin/blog" className="text-navy hover:text-gold font-medium">
              Blog
            </Link>
            {session.user.role === "ADMIN" && (
              <Link href="/admin/leads" className="text-navy hover:text-gold font-medium">
                Leads
              </Link>
            )}
            <Link href="/" className="text-gray-500 hover:text-navy">
              ← Site
            </Link>
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
}
