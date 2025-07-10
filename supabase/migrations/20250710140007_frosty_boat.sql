/*
  # Add application_id to course_enrollments table

  1. Changes
    - Add application_id column to course_enrollments table
    - Create foreign key relationship to course_applications table
    - Add index for better performance

  2. Security
    - Maintain existing RLS policies
*/

-- Add application_id column to course_enrollments table
ALTER TABLE course_enrollments
ADD COLUMN application_id UUID REFERENCES course_applications(id);

-- Create index for better performance
CREATE INDEX idx_course_enrollments_application_id ON course_enrollments(application_id);

-- Add helpful comment
COMMENT ON COLUMN course_enrollments.application_id IS 'Reference to the application that led to this enrollment';