import { auth } from "@/lib/auth";
import { getPublishedPosts } from "@/lib/data";
import { PostCard } from "@/components/blog/PostCard";

export const metadata = { title: "Insights & Resources" };

export default async function BlogPage() {
  const session = await auth();
  const posts = await getPublishedPosts();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">
            Insights & Resources
          </p>
          <h1 className="text-4xl font-bold text-navy mb-4">From the Ekasar playbook</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert tips on home buying, interior design, and community living.
            {!session?.user && (
              <span>
                {" "}
                <a href="/auth/register" className="text-gold font-semibold hover:underline">
                  Register
                </a>{" "}
                to unlock member-only articles.
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isAuthenticated={!!session?.user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
