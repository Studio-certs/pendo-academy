/*
  # Fix RLS policies for contact_submissions

  1. Drop All Existing Policies:
    - Removes any previous policies on the table to ensure a clean slate. This includes policies from previous failed attempts.
  2. Create Four New, Specific Policies:
    - INSERT: Allows any user (anonymous or authenticated) to insert a new submission.
    - SELECT: Allows users with the 'admin' role to view all submissions.
    - UPDATE: Allows users with the 'admin' role to update submissions.
    - DELETE: Allows users with the 'admin' role to delete submissions.
  3. Security:
    - This approach is highly secure and explicit, with a dedicated policy for each CRUD action.
*/

-- Drop all old policies to ensure a clean state
DROP POLICY IF EXISTS "Admins can manage contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow public insert for contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow admins to select contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow admins to update and delete contact submissions" ON public.contact_submissions;

-- 1. Allow any user to INSERT a new contact submission.
CREATE POLICY "Allow public insert for contact submissions"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- 2. Allow admin users to SELECT submissions.
CREATE POLICY "Allow admins to select contact submissions"
ON public.contact_submissions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 3. Allow admin users to UPDATE submissions.
CREATE POLICY "Allow admins to update contact submissions"
ON public.contact_submissions
FOR UPDATE
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

-- 4. Allow admin users to DELETE submissions.
CREATE POLICY "Allow admins to delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);