/*
  # Add ID to course_enrollments table

  1. Changes
    - Add id column to course_enrollments table
    - Generate UUIDs for existing rows
    - Make id the primary key
    - Keep the existing composite unique constraint

  2. Security
    - Maintain existing RLS policies
*/

-- First, add the id column
ALTER TABLE course_enrollments 
ADD COLUMN id UUID DEFAULT gen_random_uuid();

-- Update existing rows with UUIDs
UPDATE course_enrollments 
SET id = gen_random_uuid() 
WHERE id IS NULL;

-- Make id NOT NULL
ALTER TABLE course_enrollments 
ALTER COLUMN id SET NOT NULL;

-- Drop the existing primary key constraint
ALTER TABLE course_enrollments 
DROP CONSTRAINT course_enrollments_pkey;

-- Add id as the primary key
ALTER TABLE course_enrollments 
ADD CONSTRAINT course_enrollments_pkey PRIMARY KEY (id);

-- Add a unique constraint for the original composite key
ALTER TABLE course_enrollments 
ADD CONSTRAINT course_enrollments_user_course_unique 
UNIQUE (course_id, user_id);

-- Create index for better performance
CREATE INDEX idx_course_enrollments_id ON course_enrollments(id);

-- Add helpful comment
COMMENT ON COLUMN course_enrollments.id IS 'Unique identifier for each enrollment';
COMMENT ON CONSTRAINT course_enrollments_user_course_unique ON course_enrollments IS 'Ensures a user can only enroll once in each course';