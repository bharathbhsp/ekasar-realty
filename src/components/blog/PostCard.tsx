import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import type { PostVisibility } from "@/types";
import type { Post } from "@prisma/client";

type PostWithAuthor = Post & { author: { name: string } };

export function PostCard({
  post,
  isAuthenticated,
}: {
  post: PostWithAuthor;
  isAuthenticated: boolean;
}) {
  const isGated = post.visibility === "MEMBER" && !isAuthenticated;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-navy/10" />
          )}
          {isGated && (
            <div className="absolute top-3 right-3 bg-navy/80 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3" /> Members
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <p className="text-xs text-gold font-medium mb-2">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Draft"}
          </p>
          <h3 className="text-lg font-bold text-navy group-hover:text-gold transition-colors mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3 flex-1">{post.excerpt}</p>
          <span className="mt-4 text-sm font-semibold text-navy group-hover:text-gold transition-colors">
            {isGated ? "Sign in to read →" : "Read more →"}
          </span>
        </div>
      </article>
    </Link>
  );
}

export function VisibilityBadge({ visibility }: { visibility: string }) {
  const vis = visibility as PostVisibility;
  const styles: Record<PostVisibility, string> = {
    PUBLIC: "bg-green-100 text-green-800",
    MEMBER: "bg-amber-100 text-amber-800",
    DRAFT: "bg-gray-100 text-gray-600",
  };
  const labels: Record<PostVisibility, string> = {
    PUBLIC: "Public",
    MEMBER: "Members Only",
    DRAFT: "Draft",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[vis]}`}>
      {labels[vis]}
    </span>
  );
}
