import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const adminCookie = (await cookies()).get("admin_session");
  if (!adminCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, username, password } = await request.json();
    if (!name || !username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check unique username
    const { data: existing, error: fetchError } = await supabase
      .from("students")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (fetchError) {
      return NextResponse.json({ error: "Failed to check username" }, { status: 500 });
    }
    if (existing) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }

    const { error } = await supabase.from("students").insert({ name, username, password });
    if (error) {
      return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
    }

    return NextResponse.json({ success: true, password });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

