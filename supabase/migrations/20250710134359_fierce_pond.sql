/*
  # Add Course Application Table

  1. New Tables
    - `course_applications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `course_id` (uuid, references courses)
      - `title` (text)
      - `first_name` (text)
      - `middle_name` (text)
      - `last_name` (text)
      - `name_changed` (boolean)
      - `gender` (text)
      - `date_of_birth` (date)
      - `email` (text)
      - `mobile` (text)
      - `high_school_qualification` (text)
      - `high_school_name` (text)
      - `high_school_country` (text)
      - `high_school_completed` (boolean)
      - `high_school_year_completed` (integer)
      - `high_school_language` (text)
      - `tertiary_qualification` (text)
      - `tertiary_institution` (text)
      - `tertiary_country` (text)
      - `in_australia` (boolean)
      - `street_address` (text)
      - `address_line_2` (text)
      - `city` (text)
      - `state` (text)
      - `postal_code` (text)
      - `country` (text)
      - `postal_address_different` (boolean)
      - `postal_street_address` (text)
      - `postal_address_line_2` (text)
      - `postal_city` (text)
      - `postal_state` (text)
      - `postal_code_postal` (text)
      - `postal_country` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for users to manage their own applications
    - Add policies for admins to view all applications
*/

-- Create course_applications table
CREATE TABLE course_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  name_changed BOOLEAN NOT NULL DEFAULT false,
  gender TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  high_school_qualification TEXT,
  high_school_name TEXT,
  high_school_country TEXT,
  high_school_completed BOOLEAN,
  high_school_year_completed INTEGER,
  high_school_language TEXT,
  tertiary_qualification TEXT,
  tertiary_institution TEXT,
  tertiary_country TEXT,
  in_australia BOOLEAN NOT NULL,
  street_address TEXT,
  address_line_2 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT,
  postal_address_different BOOLEAN DEFAULT false,
  postal_street_address TEXT,
  postal_address_line_2 TEXT,
  postal_city TEXT,
  postal_state TEXT,
  postal_postal_code TEXT,
  postal_country TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE course_applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own applications"
ON course_applications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
ON course_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
ON course_applications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
ON course_applications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update all applications"
ON course_applications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Create indexes for better performance
CREATE INDEX idx_course_applications_user_id ON course_applications(user_id);
CREATE INDEX idx_course_applications_course_id ON course_applications(course_id);
CREATE INDEX idx_course_applications_status ON course_applications(status);
CREATE INDEX idx_course_applications_created_at ON course_applications(created_at);

-- Add helpful comments
COMMENT ON TABLE course_applications IS 'Stores preliminary application data for course enrollments';
COMMENT ON COLUMN course_applications.status IS 'Status of the application (pending, approved, rejected)';