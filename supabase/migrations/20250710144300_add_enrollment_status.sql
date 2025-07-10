/*
  # Add status to course enrollments
  1. New Columns:
     - course_enrollments.status: text, NOT NULL, DEFAULT 'pending'
  2. Constraints:
     - Added a CHECK constraint to ensure the status is either 'pending' or 'confirmed'.
  3. Purpose: 
     - To support a two-stage enrollment process. New enrollments will default to 'pending'.
*/

-- Add the new status column to the course_enrollments table
ALTER TABLE public.course_enrollments
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending';

-- Add a check constraint to ensure data integrity for the new status column
-- This prevents any values other than 'pending' or 'confirmed' from being inserted.
ALTER TABLE public.course_enrollments
ADD CONSTRAINT check_enrollment_status
CHECK (status IN ('pending', 'confirmed'));

-- Note: Existing enrollments will default to 'pending'.
-- If you have existing data that should be considered 'confirmed', you may want to run a manual update.
-- Example: UPDATE public.course_enrollments SET status = 'confirmed' WHERE created_at < NOW();
