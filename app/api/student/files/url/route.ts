import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET_NAME = "Student Resources";

export async function POST(request: Request) {
  const studentCookie = (await cookies()).get("student_session");
  if (!studentCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { file_path } = await request.json();
    if (!file_path) {
      return NextResponse.json({ error: "File path required" }, { status: 400 });
    }

    // Generate signed URL with 1 day expiry (86400 seconds)
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(file_path, 86400); // 24 hours = 86400 seconds

    if (error) {
      console.error("Signed URL error:", error);
      return NextResponse.json(
        { error: "Failed to generate file URL: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: data.signedUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

