import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { canEditPost } from "@/lib/rbac";
import { BlogEditor } from "@/components/admin/BlogEditor";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  return { title: post ? `Edit: ${post.title}` : "Edit Post" };
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) notFound();
  if (
    !session?.user ||
    !canEditPost(session.user.role, session.user.id, post.authorId)
  ) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-6">Edit Post</h2>
      <BlogEditor post={post} />
    </div>
  );
}
