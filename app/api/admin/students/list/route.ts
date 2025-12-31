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

  const adminPasswordEnv = process.env.ADMIN_PASSWORD;
  if (!adminPasswordEnv) {
    return NextResponse.json({ error: "Admin password not configured" }, { status: 500 });
  }

  try {
    const { adminPassword } = await request.json();
    if (!adminPassword) {
      return NextResponse.json({ error: "Missing admin password" }, { status: 400 });
    }

    if (adminPassword !== adminPasswordEnv) {
      return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("students")
      .select("id, name, username, password")
      .order("id", { ascending: false });

    if (error) {
      return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
    }

    return NextResponse.json({ students: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


