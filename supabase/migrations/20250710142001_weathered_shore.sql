/*
  # Update Course Application Form Fields

  1. Changes
    - Update postal_address_different column description to clarify its purpose
    - Add comment to in_australia column to clarify its purpose
    - Add index for better query performance
*/

-- Update column comment for postal_address_different
COMMENT ON COLUMN course_applications.postal_address_different IS 'When true, postal address is different from Australian address';

-- Add comment for in_australia column
COMMENT ON COLUMN course_applications.in_australia IS 'Whether the applicant is currently in Australia';

-- Create index for better performance on common queries
CREATE INDEX IF NOT EXISTS idx_course_applications_postal_address_different ON course_applications(postal_address_different);
CREATE INDEX IF NOT EXISTS idx_course_applications_in_australia ON course_applications(in_australia);