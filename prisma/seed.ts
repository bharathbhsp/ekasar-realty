import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@ekasar.com" },
    update: {},
    create: {
      email: "admin@ekasar.com",
      name: "Ekasar Admin",
      passwordHash,
      role: "ADMIN",
      emailVerified: new Date(),
      phone: "+91 98765 43210",
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: "editor@ekasar.com" },
    update: {},
    create: {
      email: "editor@ekasar.com",
      name: "Content Editor",
      passwordHash,
      role: "EDITOR",
      emailVerified: new Date(),
    },
  });

  await prisma.user.upsert({
    where: { email: "user@ekasar.com" },
    update: {},
    create: {
      email: "user@ekasar.com",
      name: "Demo User",
      passwordHash,
      role: "USER",
      emailVerified: new Date(),
    },
  });

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        slug: "ekasar-heights",
        name: "Ekasar Heights",
        status: "UNDER_CONSTRUCTION",
        location: "Thanisandra Main Road, Bangalore",
        bhkTypes: JSON.stringify(["2 BHK", "2.5 BHK", "3 BHK"]),
        description:
          "A boutique residential community with thoughtfully designed 2, 2.5 & 3 BHK homes. Positioned for balanced city access and neighborhood calm, with landscaped gardens and lifestyle amenities.",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        ]),
        highlights: JSON.stringify([
          "2+ acres landscaped campus",
          "Clubhouse & fitness center",
          "24/7 security",
          "Excellent connectivity",
        ]),
        featured: true,
      },
      {
        slug: "ekasar-greens",
        name: "Ekasar Greens",
        status: "READY",
        location: "Jakkur Road, Bangalore",
        bhkTypes: JSON.stringify(["2 BHK", "3 BHK"]),
        description:
          "Ready-to-move apartments offering premium 2 & 3 BHK living. Spread across 2+ acres with landscaped gardens, children's play areas, and modern lifestyle amenities.",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        ]),
        highlights: JSON.stringify([
          "Ready to move in",
          "Vaastu-compliant homes",
          "Rainwater harvesting",
          "Power backup",
        ]),
        featured: true,
      },
      {
        slug: "ekasar-horizon",
        name: "Ekasar Horizon",
        status: "UPCOMING",
        location: "Hebbal, Bangalore",
        bhkTypes: JSON.stringify(["3 BHK", "4 BHK"]),
        description:
          "An upcoming premium development featuring spacious 3 & 4 BHK residences with panoramic city views. Register your interest for early-bird pricing.",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
        ]),
        highlights: JSON.stringify([
          "Sky lounge & infinity pool",
          "Smart home features",
          "EV charging stations",
          "Concierge services",
        ]),
        featured: false,
      },
    ],
  });

  await prisma.post.deleteMany();

  const posts = [
    {
      slug: "space-is-a-real-luxury",
      title: "Space is a Real Luxury",
      excerpt:
        "Choosing the right floor plan can transform how you live. Here's how to evaluate space beyond square footage.",
      body: `<p>In urban Bangalore, space is the ultimate luxury. When evaluating a home, look beyond the carpet area number on the brochure.</p>
<p>Consider ceiling heights, balcony depth, storage niches, and how natural light moves through the home across the day. A well-planned 1,200 sq ft can feel more spacious than a poorly laid out 1,500 sq ft.</p>
<p>At Ekasar Realty, every floor plan goes through rigorous usability testing — simulating daily routines from morning coffee to weekend gatherings — before it reaches you.</p>
<p>Ask your sales advisor for a virtual walkthrough and compare how each room connects. The flow between kitchen, dining, and living areas often matters more than an extra half-bedroom.</p>`,
      visibility: "PUBLIC" as const,
      coverImageUrl:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      tags: "lifestyle,planning",
    },
    {
      slug: "secrets-of-keeping-your-home-clean",
      title: "Secrets of Keeping Your Home Clean and Organized",
      excerpt:
        "Practical organization tips for apartment living that save time and reduce clutter.",
      body: `<p>Apartment living demands smart organization. Start with a one-in-one-out rule for every new purchase.</p>
<p>Designate a landing zone near the entrance for keys, mail, and shoes. Use vertical storage in kitchens and bathrooms to maximize every inch.</p>
<p>Weekly 15-minute tidy sessions beat marathon cleaning days. Involve the whole family with simple, assigned zones.</p>`,
      visibility: "PUBLIC" as const,
      coverImageUrl:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      tags: "lifestyle,tips",
    },
    {
      slug: "craft-your-home-interior",
      title: "Craft Your Home Interior with the Color of YOU",
      excerpt:
        "How to choose interior palettes that reflect your personality while maintaining resale appeal.",
      body: `<p>Color sets the emotional tone of your home. Start with a neutral base — warm whites, soft greys, or earthy beiges — then layer personality through accent walls, textiles, and art.</p>
<p>Consider the direction your rooms face: north-facing rooms benefit from warmer tones, while south-facing spaces can handle cooler hues.</p>
<p>Test paint samples at different times of day before committing. What looks perfect at noon may feel entirely different at dusk.</p>`,
      visibility: "PUBLIC" as const,
      coverImageUrl:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      tags: "interior,design",
    },
    {
      slug: "bring-nature-indoors",
      title: "Build a Natural Oasis: Bring Nature Indoors",
      excerpt:
        "Biophilic design ideas for balconies, window gardens, and indoor greenery in city apartments.",
      body: `<p>Bringing nature indoors improves air quality, reduces stress, and makes apartments feel more expansive. Start with low-maintenance plants suited to your light conditions.</p>
<p>Vertical gardens work beautifully on balconies. Herbs in the kitchen add freshness and utility. Natural materials — wood, stone, jute — complement living greenery.</p>`,
      visibility: "MEMBER" as const,
      coverImageUrl:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      tags: "sustainability,lifestyle",
    },
    {
      slug: "ekasar-heights-spotlight",
      title: "Ekasar Heights: A Community Designed for Modern Families",
      excerpt:
        "An exclusive look at our flagship Thanisandra project — amenities, connectivity, and early-bird offers.",
      body: `<p>Ekasar Heights represents our vision for balanced urban living. Located on Thanisandra Main Road, the project offers seamless connectivity to Hebbal, Manyata Tech Park, and the airport corridor.</p>
<p>Members get access to detailed floor plans, pricing sheets, and priority site visit scheduling. Our sales team hosts weekly walkthroughs every Saturday.</p>
<p>Early registrants receive exclusive benefits including waived clubhouse membership for the first year and flexible payment plans.</p>
<p>Contact our team to schedule a personalized tour and explore the 2, 2.5 & 3 BHK configurations available.</p>`,
      visibility: "MEMBER" as const,
      coverImageUrl:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      tags: "projects,ekasar-heights",
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        authorId: editor.id,
        publishedAt: new Date(),
      },
    });
  }

  console.log("Seed complete!");
  console.log("Admin: admin@ekasar.com / password123");
  console.log("Editor: editor@ekasar.com / password123");
  console.log("User: user@ekasar.com / password123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
