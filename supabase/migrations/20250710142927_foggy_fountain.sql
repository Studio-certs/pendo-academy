/*
  # Fix Course Enrollment Process

  1. Changes
    - Add function to handle course application approval
    - Ensure proper enrollment creation when application is approved
    - Add comments to clarify the enrollment process

  2. Security
    - Maintain existing RLS policies
*/

-- Add comments to clarify the enrollment process
COMMENT ON TABLE course_applications IS 'Stores preliminary application data for course enrollments';
COMMENT ON COLUMN course_applications.status IS 'Status of the application (pending, approved, rejected)';
COMMENT ON COLUMN course_enrollments.application_id IS 'Reference to the application that led to this enrollment';

-- Create function to handle application approval
CREATE OR REPLACE FUNCTION handle_application_approval()
RETURNS TRIGGER AS $$
BEGIN
  -- If application is being approved, ensure enrollment exists
  IF NEW.status = 'approved' AND OLD.status = 'pending' THEN
    -- Check if enrollment already exists
    IF NOT EXISTS (
      SELECT 1 FROM course_enrollments 
      WHERE user_id = NEW.user_id AND course_id = NEW.course_id
    ) THEN
      -- Create enrollment
      INSERT INTO course_enrollments (
        user_id,
        course_id,
        progress,
        status,
        application_id,
        enrolled_at,
        last_accessed
      ) VALUES (
        NEW.user_id,
        NEW.course_id,
        0,
        'confirmed',
        NEW.id,
        NOW(),
        NOW()
      );
    ELSE
      -- Update existing enrollment
      UPDATE course_enrollments
      SET 
        status = 'confirmed',
        application_id = NEW.id,
        last_accessed = NOW()
      WHERE 
        user_id = NEW.user_id AND 
        course_id = NEW.course_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for application approval
CREATE TRIGGER on_application_approval
  AFTER UPDATE OF status ON course_applications
  FOR EACH ROW
  EXECUTE FUNCTION handle_application_approval();

-- Add helpful comment
COMMENT ON FUNCTION handle_application_approval() IS 'Creates or updates course enrollment when application is approved';