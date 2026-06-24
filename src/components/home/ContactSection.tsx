"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import type { Post } from "@prisma/client";

type PostWithAuthor = Post & { author: { name: string } };

export function BlogPreview({
  posts,
  isAuthenticated,
}: {
  posts: PostWithAuthor[];
  isAuthenticated: boolean;
}) {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">
            Insights & Resources
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">
            From the Ekasar playbook
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} isAuthenticated={isAuthenticated} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-navy font-semibold hover:text-gold transition-colors"
          >
            View All Insights →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LeadForm({ projects }: { projects: { name: string }[] }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectInterest: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", projectInterest: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">
              Connect With Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
              Let&apos;s find your next home
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Share your details and our team will reach out within 24 hours to schedule
              a site visit or answer your questions.
            </p>
            <div className="space-y-4 text-sm text-gray-600">
              <p>📍 1st Floor, Lake View Towers, Thanisandra Main Road, Bangalore – 560077</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ info@ekasar.com</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-cream rounded-2xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Phone *</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Project Interest</label>
              <select
                value={form.projectInterest}
                onChange={(e) => setForm({ ...form, projectInterest: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 bg-white"
              >
                <option value="">Select a project</option>
                {projects.map((p) => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 resize-y"
              />
            </div>
            {status === "success" && (
              <p className="text-green-600 text-sm font-medium">
                Thank you! We&apos;ll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-navy text-white font-semibold py-3.5 rounded-full hover:bg-navy-light transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Submitting..." : "Send Enquiry"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
