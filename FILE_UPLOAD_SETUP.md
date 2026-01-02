# File Upload System Setup Guide

This guide will help you set up the file upload system for the admin panel and student dashboard using Supabase Storage.

## Prerequisites

1. Supabase project with Storage enabled
2. Database access to create tables
3. Admin and student login system already configured

## Step 1: Create Supabase Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** section
3. Click **New bucket**
4. Name it: `Student Resources` (already configured in the API routes)
5. Set it to **Public** (so students can access files)
6. Click **Create bucket**

## Step 2: Create Database Table

Run the SQL script in your Supabase SQL Editor:

```sql
-- File: database/student_files_table.sql
CREATE TABLE IF NOT EXISTS student_files (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_files_uploaded_at ON student_files(uploaded_at DESC);
```

## Step 3: Bucket Name

The bucket name is already configured as `Student Resources` in:
- `app/api/admin/files/upload/route.ts`
- `app/api/admin/files/delete/route.ts`

If you need to change it, update the `BUCKET_NAME` constant in both files.

## Step 4: Configure Storage Policies (Optional but Recommended)

For better security, you can set up Row Level Security (RLS) policies:

```sql
-- Enable RLS
ALTER TABLE student_files ENABLE ROW LEVEL SECURITY;

-- Allow students to view files
CREATE POLICY "Students can view files" 
ON student_files 
FOR SELECT 
USING (true);

-- Allow admins to manage files (you'll need to implement admin check)
-- For now, we use service role key which bypasses RLS
```

## Step 5: Test the System

1. **Admin Upload:**
   - Login to admin dashboard at `/admin-531204/dashboard`
   - Scroll to "Upload Files for Students" section
   - Select a file (image, video, or PDF)
   - Add optional title and description
   - Click "Upload File"

2. **Student View:**
   - Login as a student at `/student-login`
   - Go to student dashboard
   - You should see all uploaded files
   - Click "Open File" to view or "Download" to download

## Supported File Types

- **Images:** JPEG, JPG, PNG, GIF, WebP
- **Videos:** MP4, WebM, QuickTime
- **Documents:** PDF

## File Size Limit

Maximum file size: **50MB** (configurable in `app/api/admin/files/upload/route.ts`)

## Features

✅ Admin can upload files with title and description  
✅ Admin can view all uploaded files  
✅ Admin can delete files  
✅ Students can view all files  
✅ Students can download files  
✅ Image previews for image files  
✅ File type icons for other files  
✅ File size and upload date display  

## Troubleshooting

### Files not uploading?
- Check Supabase Storage bucket exists and is public
- Verify bucket name matches in API routes
- Check file size is under 50MB
- Verify file type is allowed

### Files not showing for students?
- Check database table exists
- Verify files were uploaded successfully
- Check browser console for errors
- Verify student session cookie is set

### Storage errors?
- Ensure Supabase service role key is set in `.env.local`
- Check bucket permissions in Supabase dashboard
- Verify bucket is set to public

## Environment Variables Required

Make sure these are set in your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

