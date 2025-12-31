import { NextResponse } from "next/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

function setCookie(res: NextResponse, name: string, value: string, days = 1) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  // Not HttpOnly because the client-side dashboard gate checks document.cookie for simplicity
  res.headers.append("Set-Cookie", `${name}=${value}; Path=/; Expires=${expires}; SameSite=Lax`);
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    setCookie(res, "admin_session", Math.random().toString(36).slice(2), 1);
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

