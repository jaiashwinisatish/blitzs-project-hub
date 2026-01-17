-- SQL to fix admin access issues
-- Run this in Supabase SQL Editor

-- 1. Create a function to bypass RLS for admin role setting
CREATE OR REPLACE FUNCTION public.set_admin_role(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles 
  SET role = 'admin' 
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create a function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Update RLS policies to allow admin functions
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create new policies that allow admin bypass
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin(auth.uid()));

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert profiles" ON profiles
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

-- 4. Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.set_admin_role(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated;

-- 5. Create a simple admin check function
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN COALESCE(
    (SELECT role FROM public.profiles WHERE id = user_id),
    'user'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_user_role(UUID) TO authenticated;

-- 6. Test: Check if any admin users exist
SELECT id, email, role, created_at FROM public.profiles WHERE role = 'admin';
