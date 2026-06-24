import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPostBySlug, getVisibleBody } from "@/lib/data";
import { canEditPost } from "@/lib/rbac";
import { Lock } from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    ...(post.visibility === "MEMBER" ? { robots: { index: false } } : {}),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  if (post.visibility === "DRAFT") {
    const canView =
      session?.user &&
      canEditPost(session.user.role, session.user.id, post.authorId);
    if (!canView) notFound();
  }

  const isAuthenticated = !!session?.user;
  const { content, gated } = getVisibleBody(
    post.body,
    post.visibility,
    isAuthenticated
  );

  return (
    <article className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {post.coverImageUrl && (
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <header className="mb-8">
          <p className="text-gold text-sm font-medium mb-3">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Draft"}
            {post.author?.name && ` · ${post.author.name}`}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4">{post.title}</h1>
          <p className="text-lg text-gray-600">{post.excerpt}</p>
        </header>

        <div
          className="prose-ekasar"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {gated && (
          <div className="mt-8 p-8 bg-cream rounded-2xl text-center border border-gold/20">
            <Lock className="w-8 h-8 text-gold mx-auto mb-4" />
            <h2 className="text-xl font-bold text-navy mb-2">Members-only content</h2>
            <p className="text-gray-600 mb-6">
              Sign in or create a free account to read the full article.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/auth/sign-in?returnUrl=/blog/${post.slug}`}
                className="bg-navy text-white font-semibold px-6 py-3 rounded-full hover:bg-navy-light transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="border-2 border-navy text-navy font-semibold px-6 py-3 rounded-full hover:bg-navy hover:text-white transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/blog" className="text-navy font-semibold hover:text-gold transition-colors">
            ← Back to Insights
          </Link>
        </div>
      </div>
    </article>
  );
}
