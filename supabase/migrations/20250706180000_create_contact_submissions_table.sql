/*
  # Create contact_submissions table

  1. New Tables:
    - contact_submissions: Stores inquiries from the contact us form.
  2. Security:
    - Enable RLS on the new table.
    - Add a policy to allow full access (SELECT, INSERT, UPDATE, DELETE) for users with the 'admin' role.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  inquiry TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL, -- e.g., new, read, archived
  notes TEXT, -- For admin notes
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage contact submissions"
ON contact_submissions
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);