"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/utils";
import type { Post } from "@/types/database";
import type { PostVisibility } from "@/types";

interface BlogEditorProps {
  post?: Post;
}

export function BlogEditor({ post }: BlogEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    body: post?.body || "",
    coverImageUrl: post?.coverImageUrl || "",
    visibility: (post?.visibility || "DRAFT") as PostVisibility,
    tags: post?.tags || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
    };

    try {
      const url = post ? `/api/posts/${post.id}` : "/api/posts";
      const method = post ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save post");
        return;
      }
      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <Input
        id="title"
        label="Title"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <Input
        id="slug"
        label="Slug (auto-generated if empty)"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />
      <Input
        id="coverImageUrl"
        label="Cover Image URL"
        value={form.coverImageUrl}
        onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
      />
      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">Visibility</label>
        <select
          value={form.visibility}
          onChange={(e) =>
            setForm({ ...form, visibility: e.target.value as PostVisibility })
          }
          className="w-full rounded-lg border border-gray-200 px-4 py-3 bg-white"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLIC">Public</option>
          <option value="MEMBER">Members Only</option>
        </select>
      </div>
      <Textarea
        id="excerpt"
        label="Excerpt"
        required
        rows={3}
        value={form.excerpt}
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
      />
      <Textarea
        id="body"
        label="Body (HTML supported)"
        required
        rows={12}
        value={form.body}
        onChange={(e) => setForm({ ...form, body: e.target.value })}
      />
      <Input
        id="tags"
        label="Tags (comma-separated)"
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blog")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
