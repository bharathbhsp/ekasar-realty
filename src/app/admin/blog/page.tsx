import Link from "next/link";
import { auth } from "@/lib/auth";
import { getAdminPosts } from "@/lib/data";
import { VisibilityBadge } from "@/components/blog/PostCard";

export const metadata = { title: "Manage Blog" };

export default async function AdminBlogPage() {
  const session = await auth();
  const posts = await getAdminPosts(session!.user!.id, session!.user!.role);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-navy">Blog Posts</h2>
        <Link
          href="/admin/blog/new"
          className="bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-navy-light transition-colors"
        >
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 hidden sm:table-cell">Visibility</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 hidden md:table-cell">Updated</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-navy">{post.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 sm:hidden">
                    <VisibilityBadge visibility={post.visibility} />
                  </p>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <VisibilityBadge visibility={post.visibility} />
                </td>
                <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                  {new Date(post.updatedAt).toLocaleDateString("en-IN")}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-gold font-medium hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <p className="text-center text-gray-500 py-12">No posts yet. Create your first one.</p>
        )}
      </div>
    </div>
  );
}
