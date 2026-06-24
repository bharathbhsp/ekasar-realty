import { config } from "dotenv";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { createServiceClient } from "../src/lib/supabase/server";

config({ path: ".env.local" });
config();

async function main() {
  const supabase = createServiceClient();
  const passwordHash = await bcrypt.hash("password123", 12);
  const now = new Date().toISOString();

  const users = [
    {
      id: randomUUID(),
      email: "admin@ekasar.com",
      name: "Ekasar Admin",
      passwordHash,
      role: "ADMIN",
      emailVerified: now,
      phone: "+91 98765 43210",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: randomUUID(),
      email: "editor@ekasar.com",
      name: "Content Editor",
      passwordHash,
      role: "EDITOR",
      emailVerified: now,
      phone: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: randomUUID(),
      email: "user@ekasar.com",
      name: "Demo User",
      passwordHash,
      role: "USER",
      emailVerified: now,
      phone: null,
      createdAt: now,
      updatedAt: now,
    },
  ];

  for (const user of users) {
    const { error } = await supabase.from("User").upsert(user, { onConflict: "email" });
    if (error) throw error;
  }

  const { data: editor } = await supabase
    .from("User")
    .select("id")
    .eq("email", "editor@ekasar.com")
    .single();

  if (!editor) throw new Error("Editor user not found after seed");

  await supabase.from("Post").delete().gte("createdAt", "1970-01-01");
  await supabase.from("Project").delete().gte("createdAt", "1970-01-01");

  const projects = [
    {
      id: randomUUID(),
      slug: "ekasar-heights",
      name: "Ekasar Heights",
      status: "UNDER_CONSTRUCTION",
      location: "Thanisandra Main Road, Bangalore",
      bhkTypes: JSON.stringify(["2 BHK", "2.5 BHK", "3 BHK"]),
      description:
        "A boutique residential community with thoughtfully designed 2, 2.5 & 3 BHK homes.",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      ]),
      highlights: JSON.stringify(["2+ acres landscaped campus", "Clubhouse & fitness center"]),
      featured: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: randomUUID(),
      slug: "ekasar-greens",
      name: "Ekasar Greens",
      status: "READY",
      location: "Jakkur Road, Bangalore",
      bhkTypes: JSON.stringify(["2 BHK", "3 BHK"]),
      description: "Ready-to-move apartments offering premium 2 & 3 BHK living.",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      ]),
      highlights: JSON.stringify(["Ready to move in", "Vaastu-compliant homes"]),
      featured: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: randomUUID(),
      slug: "ekasar-horizon",
      name: "Ekasar Horizon",
      status: "UPCOMING",
      location: "Hebbal, Bangalore",
      bhkTypes: JSON.stringify(["3 BHK", "4 BHK"]),
      description: "An upcoming premium development with panoramic city views.",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      ]),
      highlights: JSON.stringify(["Sky lounge & infinity pool", "Smart home features"]),
      featured: false,
      createdAt: now,
      updatedAt: now,
    },
  ];

  const { error: projectError } = await supabase.from("Project").insert(projects);
  if (projectError) throw projectError;

  const posts = [
    {
      slug: "space-is-a-real-luxury",
      title: "Space is a Real Luxury",
      excerpt: "Choosing the right floor plan can transform how you live.",
      body: "<p>In urban Bangalore, space is the ultimate luxury.</p>",
      visibility: "PUBLIC",
      coverImageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      tags: "lifestyle,planning",
    },
    {
      slug: "secrets-of-keeping-your-home-clean",
      title: "Secrets of Keeping Your Home Clean and Organized",
      excerpt: "Practical organization tips for apartment living.",
      body: "<p>Apartment living demands smart organization.</p>",
      visibility: "PUBLIC",
      coverImageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      tags: "lifestyle,tips",
    },
    {
      slug: "craft-your-home-interior",
      title: "Craft Your Home Interior with the Color of YOU",
      excerpt: "How to choose interior palettes that reflect your personality.",
      body: "<p>Color sets the emotional tone of your home.</p>",
      visibility: "PUBLIC",
      coverImageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      tags: "interior,design",
    },
    {
      slug: "bring-nature-indoors",
      title: "Build a Natural Oasis: Bring Nature Indoors",
      excerpt: "Biophilic design ideas for city apartments.",
      body: "<p>Bringing nature indoors improves air quality and reduces stress.</p>",
      visibility: "MEMBER",
      coverImageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      tags: "sustainability,lifestyle",
    },
    {
      slug: "ekasar-heights-spotlight",
      title: "Ekasar Heights: A Community Designed for Modern Families",
      excerpt: "An exclusive look at our flagship Thanisandra project.",
      body: "<p>Ekasar Heights represents our vision for balanced urban living.</p>",
      visibility: "MEMBER",
      coverImageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      tags: "projects,ekasar-heights",
    },
  ];

  for (const post of posts) {
    const { error } = await supabase.from("Post").insert({
      id: randomUUID(),
      ...post,
      authorId: editor.id,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    });
    if (error) throw error;
  }

  console.log("Seed complete!");
  console.log("Admin: admin@ekasar.com / password123");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
