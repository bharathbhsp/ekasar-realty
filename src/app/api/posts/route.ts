import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { auth } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { postSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";
import { canPublish } from "@/lib/rbac";
import type { Post } from "@/types/database";

export async function GET(request: Request) {
  const session = await auth();
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get("drafts") === "true";
  const supabase = createServiceClient();

  const isEditor =
    session?.user?.role === "EDITOR" || session?.user?.role === "ADMIN";

  if (includeDrafts && isEditor) {
    let query = supabase.from("Post").select("*").order("updatedAt", { ascending: false });
    if (session?.user?.role !== "ADMIN") {
      query = query.eq("authorId", session!.user!.id);
    }
    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .in("visibility", ["PUBLIC", "MEMBER"])
    .order("publishedAt", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || !canPublish(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const slug = parsed.data.slug || slugify(parsed.data.title);
    const supabase = createServiceClient();

    const { data: existing } = await supabase
      .from("Post")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const now = new Date().toISOString();
    const publishedAt =
      parsed.data.visibility !== "DRAFT"
        ? parsed.data.publishedAt ?? now
        : null;

    const { data: post, error } = await supabase
      .from("Post")
      .insert({
        id: randomUUID(),
        title: parsed.data.title,
        slug,
        excerpt: parsed.data.excerpt,
        body: parsed.data.body,
        coverImageUrl: parsed.data.coverImageUrl || null,
        visibility: parsed.data.visibility,
        tags: parsed.data.tags || "",
        authorId: session.user.id,
        publishedAt,
        createdAt: now,
        updatedAt: now,
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    return NextResponse.json(post as Post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
