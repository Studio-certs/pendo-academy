/*
  # Update course_applications table

  1. Changes
    - Add default values for name_changed and postal_address_different
    - Ensure proper constraints for address fields
    - Add indexes for better performance
*/

-- Update default values for boolean fields
ALTER TABLE course_applications
ALTER COLUMN name_changed SET DEFAULT false,
ALTER COLUMN postal_address_different SET DEFAULT true;

-- Add comment explaining the postal_address_different field
COMMENT ON COLUMN course_applications.postal_address_different IS 'When true, postal address is different from residential address';

-- Create index for better performance on common queries
CREATE INDEX IF NOT EXISTS idx_course_applications_name_changed ON course_applications(name_changed);
CREATE INDEX IF NOT EXISTS idx_course_applications_postal_address_different ON course_applications(postal_address_different);
CREATE INDEX IF NOT EXISTS idx_course_applications_in_australia ON course_applications(in_australia);