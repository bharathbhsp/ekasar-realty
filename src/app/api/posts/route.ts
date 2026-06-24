import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";
import { canPublish } from "@/lib/rbac";
export async function GET(request: Request) {
  const session = await auth();
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get("drafts") === "true";

  const isEditor =
    session?.user?.role === "EDITOR" || session?.user?.role === "ADMIN";

  if (includeDrafts && isEditor) {
    const posts = await prisma.post.findMany({
      where:
        session?.user?.role === "ADMIN"
          ? undefined
          : { authorId: session!.user!.id },
      include: { author: { select: { name: true } } },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(posts);
  }

  const posts = await prisma.post.findMany({
    where: { visibility: { in: ["PUBLIC", "MEMBER"] } },
    include: { author: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json(posts);
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
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const publishedAt =
      parsed.data.visibility !== "DRAFT"
        ? parsed.data.publishedAt
          ? new Date(parsed.data.publishedAt)
          : new Date()
        : null;

    const post = await prisma.post.create({
      data: {
        title: parsed.data.title,
        slug,
        excerpt: parsed.data.excerpt,
        body: parsed.data.body,
        coverImageUrl: parsed.data.coverImageUrl || null,
        visibility: parsed.data.visibility,
        tags: parsed.data.tags || "",
        authorId: session.user.id,
        publishedAt,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
