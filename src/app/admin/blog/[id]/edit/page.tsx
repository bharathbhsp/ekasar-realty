import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import { auth } from "@/lib/auth";
import { canEditPost } from "@/lib/rbac";
import { BlogEditor } from "@/components/admin/BlogEditor";
import type { Post } from "@/types/database";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: post } = await supabase.from("Post").select("title").eq("id", id).maybeSingle();
  return { title: post ? `Edit: ${post.title}` : "Edit Post" };
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();
  const supabase = createServiceClient();
  const { data: post } = await supabase.from("Post").select("*").eq("id", id).maybeSingle();

  if (!post) notFound();
  if (
    !session?.user ||
    !canEditPost(session.user.role, session.user.id, (post as Post).authorId)
  ) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-6">Edit Post</h2>
      <BlogEditor post={post as Post} />
    </div>
  );
}
