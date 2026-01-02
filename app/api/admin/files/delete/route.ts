import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET_NAME = "Student Resources";

export async function DELETE(request: Request) {
  const adminCookie = (await cookies()).get("admin_session");
  if (!adminCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "File ID required" }, { status: 400 });
    }

    // Get file record to get file path
    const { data: fileRecord, error: fetchError } = await supabase
      .from("student_files")
      .select("file_path")
      .eq("id", id)
      .single();

    if (fetchError || !fileRecord) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileRecord.file_path]);

    if (storageError) {
      console.error("Storage delete error:", storageError);
      // Continue to delete DB record even if storage delete fails
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from("student_files")
      .delete()
      .eq("id", id);

    if (dbError) {
      return NextResponse.json(
        { error: "Failed to delete file record: " + dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

