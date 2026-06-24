import { BlogEditor } from "@/components/admin/BlogEditor";

export const metadata = { title: "New Blog Post" };

export default function NewBlogPostPage() {
  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-6">New Blog Post</h2>
      <BlogEditor />
    </div>
  );
}
