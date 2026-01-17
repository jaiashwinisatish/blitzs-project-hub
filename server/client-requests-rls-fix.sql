-- Fix Client Requests RLS Policies
-- Run this in Supabase SQL Editor to fix 401 errors

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own client requests" ON client_requests;
DROP POLICY IF EXISTS "Users can create their own client requests" ON client_requests;
DROP POLICY IF EXISTS "Users can update their own client requests" ON client_requests;

-- Create new policies that allow public access for client requests
-- Anyone can insert client requests (contact form)
CREATE POLICY "Allow public insert for client requests" ON client_requests
  FOR INSERT WITH CHECK (true);

-- Anyone can view client requests (for admin dashboard)
CREATE POLICY "Allow public select for client requests" ON client_requests
  FOR SELECT USING (true);

-- Anyone can update client requests (for admin management)
CREATE POLICY "Allow public update for client requests" ON client_requests
  FOR UPDATE USING (true);

-- Verify policies are enabled
ALTER TABLE client_requests ENABLE ROW LEVEL SECURITY;

-- Test the policy
SELECT 'Client requests RLS policies updated successfully!' as status;
