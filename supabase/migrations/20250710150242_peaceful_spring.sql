-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_application_approval ON course_applications;
DROP FUNCTION IF EXISTS handle_application_approval();

-- Create a robust handle_application_approval function with proper transaction handling
CREATE OR REPLACE FUNCTION handle_application_approval()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  course_price DECIMAL;
  user_tokens DECIMAL;
  wallet_id UUID;
  token_type_id UUID;
  enrollment_id UUID;
  default_token_type_id UUID;
BEGIN
  -- Only proceed if status is changing from pending to approved
  IF NEW.status = 'approved' AND OLD.status = 'pending' THEN
    -- Get course price
    SELECT price INTO course_price
    FROM courses
    WHERE id = NEW.course_id;
    
    IF course_price IS NULL THEN
      RAISE EXCEPTION 'Course price not found for course ID %', NEW.course_id;
    END IF;
    
    -- Get user's wallet information
    SELECT w.id, w.tokens, w.token_type_id INTO wallet_id, user_tokens, token_type_id
    FROM user_wallets w
    WHERE w.user_id = NEW.user_id
    LIMIT 1;
    
    IF wallet_id IS NULL THEN
      -- Get default token type ID (Studio Coins)
      SELECT id INTO default_token_type_id
      FROM token_types
      WHERE name = 'Studio Coins'
      LIMIT 1;
      
      -- Create wallet if it doesn't exist
      INSERT INTO user_wallets (
        user_id,
        tokens,
        token_type_id,
        created_at,
        updated_at
      ) VALUES (
        NEW.user_id,
        0,
        default_token_type_id,
        NOW(),
        NOW()
      )
      RETURNING id, tokens, token_type_id INTO wallet_id, user_tokens, token_type_id;
    END IF;
    
    -- Verify user has enough tokens
    IF user_tokens < course_price THEN
      RAISE EXCEPTION 'User does not have enough tokens for this course (has: %, needs: %)', user_tokens, course_price;
    END IF;
    
    -- Deduct tokens from user's wallet
    UPDATE user_wallets
    SET 
      tokens = tokens - course_price,
      updated_at = NOW()
    WHERE id = wallet_id;
    
    -- Create transaction record
    INSERT INTO transactions (
      user_id,
      tokens,
      token_type_id,
      created_at
    ) VALUES (
      NEW.user_id,
      -course_price, -- Negative value for deduction
      token_type_id,
      NOW()
    );
    
    -- Create or update course enrollment
    INSERT INTO course_enrollments (
      id,
      course_id,
      user_id,
      progress,
      status,
      application_id,
      enrolled_at,
      last_accessed
    ) VALUES (
      gen_random_uuid(),
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
      last_accessed = NOW()
    RETURNING id INTO enrollment_id;
    
    -- Verify enrollment was created
    IF enrollment_id IS NULL THEN
      RAISE EXCEPTION 'Failed to create or update enrollment';
    END IF;
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
COMMENT ON FUNCTION handle_application_approval() IS 'Creates or updates course enrollment when application is approved, including token deduction';
COMMENT ON TRIGGER on_application_approval ON course_applications IS 'Trigger to handle course enrollment when application is approved';