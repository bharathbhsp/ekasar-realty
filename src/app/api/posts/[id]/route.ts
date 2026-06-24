import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { postSchema } from "@/lib/validators";
import { canEditPost } from "@/lib/rbac";
import type { Post } from "@/types/database";

type RouteParams = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createServiceClient();

  const { data: existing, error: fetchError } = await supabase
    .from("Post")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const post = existing as Post;

  if (!canEditPost(session.user.role, session.user.id, post.authorId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const publishedAt =
      parsed.data.visibility !== "DRAFT"
        ? parsed.data.publishedAt ?? post.publishedAt ?? new Date().toISOString()
        : null;

    const { data: updated, error } = await supabase
      .from("Post")
      .update({
        title: parsed.data.title,
        slug: parsed.data.slug || post.slug,
        excerpt: parsed.data.excerpt,
        body: parsed.data.body,
        coverImageUrl: parsed.data.coverImageUrl || null,
        visibility: parsed.data.visibility,
        tags: parsed.data.tags || "",
        publishedAt,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const supabase = createServiceClient();
  const { error } = await supabase.from("Post").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
