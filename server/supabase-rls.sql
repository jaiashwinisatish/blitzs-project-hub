-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_requests ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Admins can view all users
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Admins can update all users
CREATE POLICY "Admins can update all users" ON users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Projects table policies
-- Everyone can view published projects
CREATE POLICY "Everyone can view published projects" ON projects
  FOR SELECT USING (is_published = true);

-- Admins can view all projects
CREATE POLICY "Admins can view all projects" ON projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Admins can insert projects
CREATE POLICY "Admins can insert projects" ON projects
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Admins can update all projects
CREATE POLICY "Admins can update all projects" ON projects
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Admins can delete projects
CREATE POLICY "Admins can delete projects" ON projects
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Developers table policies
-- Everyone can view active developers
CREATE POLICY "Everyone can view active developers" ON developers
  FOR SELECT USING (is_active = true);

-- Admins can view all developers
CREATE POLICY "Admins can view all developers" ON developers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Admins can insert developers
CREATE POLICY "Admins can insert developers" ON developers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Admins can update all developers
CREATE POLICY "Admins can update all developers" ON developers
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Admins can delete developers
CREATE POLICY "Admins can delete developers" ON developers
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Project reviews policies
-- Everyone can view all reviews
CREATE POLICY "Everyone can view project reviews" ON project_reviews
  FOR SELECT USING (true);

-- Authenticated users can insert reviews
CREATE POLICY "Authenticated users can insert reviews" ON project_reviews
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON project_reviews
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews" ON project_reviews
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- Orders policies
-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Users can insert their own orders
CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Client requests policies
-- Admins can view all client requests
CREATE POLICY "Admins can view all client requests" ON client_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Everyone can insert client requests
CREATE POLICY "Everyone can insert client requests" ON client_requests
  FOR INSERT WITH CHECK (true);

-- Admins can update client requests
CREATE POLICY "Admins can update client requests" ON client_requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );

-- Admins can delete client requests
CREATE POLICY "Admins can delete client requests" ON client_requests
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin' 
      AND is_active = true
    )
  );
