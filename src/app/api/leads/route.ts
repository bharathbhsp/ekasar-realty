import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validators";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const { data: lead, error } = await supabase
      .from("Lead")
      .insert({
        id: randomUUID(),
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        projectInterest: parsed.data.projectInterest ?? null,
        message: parsed.data.message ?? null,
        source: parsed.data.source || "website",
        createdAt: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
    }

    return NextResponse.json({
      id: lead.id,
      message: "Thank you! We'll be in touch soon.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
