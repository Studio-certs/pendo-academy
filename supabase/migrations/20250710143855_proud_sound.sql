/*
  # Fix Course Enrollment Process

  1. Changes
    - Create a more robust trigger function for application approval
    - Ensure proper enrollment creation when an application is approved
    - Add application_id reference to course_enrollments

  2. Security
    - Maintain existing RLS policies
    - Use SECURITY DEFINER for proper permissions
*/

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_application_approval ON course_applications;
DROP FUNCTION IF EXISTS handle_application_approval();

-- Create a robust handle_application_approval function
CREATE OR REPLACE FUNCTION handle_application_approval()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  course_price DECIMAL;
  user_tokens DECIMAL;
BEGIN
  -- Only proceed if status is changing from pending to approved
  IF NEW.status = 'approved' AND OLD.status = 'pending' THEN
    -- Get course price
    SELECT price INTO course_price
    FROM courses
    WHERE id = NEW.course_id;
    
    -- Get user's token balance
    SELECT tokens INTO user_tokens
    FROM user_wallets
    WHERE user_id = NEW.user_id;
    
    -- Verify user has enough tokens
    IF user_tokens < course_price THEN
      RAISE EXCEPTION 'User does not have enough tokens for this course';
    END IF;
    
    -- Deduct tokens from user's wallet
    UPDATE user_wallets
    SET 
      tokens = tokens - course_price,
      updated_at = NOW()
    WHERE user_id = NEW.user_id;
    
    -- Create or update course enrollment
    INSERT INTO course_enrollments (
      course_id,
      user_id,
      progress,
      status,
      application_id,
      enrolled_at,
      last_accessed
    ) VALUES (
      NEW.course_id,
      NEW.user_id,
      0,
      'confirmed',
      NEW.id,
      NOW(),
      NOW()
    )
    ON CONFLICT (course_id, user_id) 
    DO UPDATE SET
      status = 'confirmed',
      application_id = NEW.id,
      last_accessed = NOW();
  END IF;
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log error details
  RAISE LOG 'Error in handle_application_approval: %', SQLERRM;
  -- Re-raise the error
  RAISE;
END;
$$;

-- Create trigger for application approval
CREATE TRIGGER on_application_approval
  BEFORE UPDATE OF status ON course_applications
  FOR EACH ROW
  EXECUTE FUNCTION handle_application_approval();

-- Add helpful comments
COMMENT ON FUNCTION handle_application_approval() IS 'Creates or updates course enrollment when application is approved';
COMMENT ON TRIGGER on_application_approval ON course_applications IS 'Trigger to handle course enrollment when application is approved';