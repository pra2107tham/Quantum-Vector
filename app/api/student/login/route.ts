import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function setCookie(res: NextResponse, name: string, value: string, days = 1) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  // Not HttpOnly because the student dashboard gate checks document.cookie for simplicity
  res.headers.append("Set-Cookie", `${name}=${value}; Path=/; Expires=${expires}; SameSite=Lax`);
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    setCookie(res, "student_session", username, 1);
    return res;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

