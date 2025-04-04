-- Disable RLS on all tables
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE meetups DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE content_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges DISABLE ROW LEVEL SECURITY;
ALTER TABLE badges DISABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_wallets DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to avoid any conflicts
DROP POLICY IF EXISTS "profiles_select" ON profiles;
DROP POLICY IF EXISTS "profiles_update" ON profiles;
DROP POLICY IF EXISTS "news_select" ON news_articles;
DROP POLICY IF EXISTS "news_insert" ON news_articles;
DROP POLICY IF EXISTS "news_update" ON news_articles;
DROP POLICY IF EXISTS "news_delete" ON news_articles;
DROP POLICY IF EXISTS "meetups_select" ON meetups;
DROP POLICY IF EXISTS "meetups_admin" ON meetups;
DROP POLICY IF EXISTS "courses_select" ON courses;
DROP POLICY IF EXISTS "courses_admin" ON courses;
DROP POLICY IF EXISTS "enrollments_select" ON course_enrollments;
DROP POLICY IF EXISTS "progress_select" ON module_progress;
DROP POLICY IF EXISTS "content_select" ON content_items;
DROP POLICY IF EXISTS "badges_select" ON badges;
DROP POLICY IF EXISTS "user_badges_select" ON user_badges;
DROP POLICY IF EXISTS "quiz_attempts_select" ON quiz_attempts;
DROP POLICY IF EXISTS "wallet_select" ON user_wallets;
DROP POLICY IF EXISTS "transactions_select" ON transactions;
DROP POLICY IF EXISTS "payment_transactions_select" ON payment_transactions;

-- Add helpful comments
COMMENT ON TABLE profiles IS 'User profiles with RLS disabled';
COMMENT ON TABLE news_articles IS 'News articles with RLS disabled';
COMMENT ON TABLE meetups IS 'Meetups with RLS disabled';
COMMENT ON TABLE courses IS 'Courses with RLS disabled';
COMMENT ON TABLE course_enrollments IS 'Course enrollments with RLS disabled';
COMMENT ON TABLE module_progress IS 'Module progress with RLS disabled';
COMMENT ON TABLE content_items IS 'Content items with RLS disabled';
COMMENT ON TABLE user_badges IS 'User badges with RLS disabled';
COMMENT ON TABLE badges IS 'Badges with RLS disabled';
COMMENT ON TABLE quiz_attempts IS 'Quiz attempts with RLS disabled';
COMMENT ON TABLE user_wallets IS 'User wallets with RLS disabled';
COMMENT ON TABLE transactions IS 'Transactions with RLS disabled';
COMMENT ON TABLE payment_transactions IS 'Payment transactions with RLS disabled';
