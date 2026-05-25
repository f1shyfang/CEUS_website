-- Create jobs table for the CEUS job board
-- Run in Supabase Dashboard: SQL Editor → New query → paste and Run

CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  application_url TEXT,
  application_deadline TIMESTAMPTZ,
  location TEXT,
  job_type TEXT NOT NULL CHECK (job_type IN (
    'Full-time', 'Part-time', 'Internship', 'Graduate', 'Contract', 'Casual', 'Other'
  )),
  category TEXT NOT NULL CHECK (category IN (
    'Structural', 'Geotechnical', 'Water', 'Environmental', 'Transport',
    'Construction', 'Project Management', 'General', 'Other'
  )),
  logo_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for jobs"
  ON jobs
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated insert access for jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated update access for jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated delete access for jobs"
  ON jobs
  FOR DELETE
  TO authenticated
  USING (true);
