-- Create table for storing student file metadata
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS student_files (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  file_url TEXT DEFAULT '', -- Not used anymore, signed URLs generated on demand
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_student_files_uploaded_at ON student_files(uploaded_at DESC);

-- Add RLS (Row Level Security) policies if needed
-- For now, we'll use service role key, but you can add policies later:
-- ALTER TABLE student_files ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Students can view files" ON student_files FOR SELECT USING (true);
-- CREATE POLICY "Admins can manage files" ON student_files FOR ALL USING (true);

