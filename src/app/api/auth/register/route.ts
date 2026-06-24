import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { createServiceClient } from "@/lib/supabase/server";
import { registerSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password, phone } = parsed.data;
    const supabase = createServiceClient();

    const { data: existing } = await supabase
      .from("User")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();

    const { data: user, error } = await supabase
      .from("User")
      .insert({
        id: randomUUID(),
        name,
        email,
        passwordHash,
        phone: phone ?? null,
        role: "USER",
        createdAt: now,
        updatedAt: now,
      })
      .select("id, email, name")
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Account created. Please sign in.", user },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
