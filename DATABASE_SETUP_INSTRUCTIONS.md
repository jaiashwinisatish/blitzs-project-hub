# Database Setup Instructions

## 🚨 Error: "Could not find the table 'public.profiles' in the schema cache"

This error means you haven't set up the database schema in Supabase yet. Follow these steps:

## 📋 Step-by-Step Fix

### Step 1: Go to Supabase Dashboard
1. Open your browser and go to: https://supabase.com/dashboard
2. Select your project: `afgromdzethkscaskofz`

### Step 2: Open SQL Editor
1. In the left sidebar, click on **"SQL Editor"**
2. Click **"+ New query"** button

### Step 3: Run the Schema SQL
1. Copy the entire content from: `server/supabase-profiles-schema.sql`
2. Paste it into the SQL Editor
3. Click **"Run"** (or press Ctrl+Enter)

### Step 4: Verify Tables Created
1. Go to **"Table Editor"** in the left sidebar
2. You should see these tables:
   - `profiles`
   - `projects`
   - `developers`
   - `orders`
   - `client_requests`
   - `project_reviews`

### Step 5: Enable RLS (Row Level Security)
1. In the **"Authentication"** section, click **"Policies"**
2. Make sure RLS is enabled for all tables (it should be from the SQL script)

### Step 6: Test the Setup
1. Go back to your app: `http://localhost:8080/setup`
2. Try creating the admin account again
3. It should work now!

## 🔧 Alternative: Run SQL Manually

If you can't find the SQL file, here's the essential schema to run:

```sql
-- Create profiles table linked to Supabase auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar TEXT DEFAULT '',
  purchased_projects UUID[] DEFAULT '{}',
  orders UUID[] DEFAULT '{}',
  client_requests UUID[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(200) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  category VARCHAR(20) NOT NULL CHECK (category IN ('web', 'mobile', 'desktop', 'ai', 'blockchain', 'game', 'other')),
  tech_stack TEXT[] NOT NULL,
  features TEXT[] NOT NULL,
  images TEXT[] NOT NULL,
  demo_link TEXT NOT NULL,
  github_link TEXT,
  difficulty VARCHAR(20) DEFAULT 'intermediate' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  is_free BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  downloads INTEGER DEFAULT 0,
  purchases INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  tags TEXT[] DEFAULT '{}',
  added_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create developers table
CREATE TABLE IF NOT EXISTS developers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  bio TEXT,
  avatar TEXT DEFAULT '',
  skills TEXT[] DEFAULT '{}',
  experience VARCHAR(20) DEFAULT 'intermediate' CHECK (experience IN ('beginner', 'intermediate', 'advanced', 'expert')),
  github TEXT,
  linkedin TEXT,
  portfolio TEXT,
  is_active BOOLEAN DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_projects INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create client_requests table
CREATE TABLE IF NOT EXISTS client_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  project_type VARCHAR(50) NOT NULL,
  budget VARCHAR(50),
  timeline VARCHAR(50),
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_reviews table
CREATE TABLE IF NOT EXISTS project_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Basic RLS Policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view published projects" ON projects
  FOR SELECT USING (is_published = true);

CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## ✅ Verification Steps

After running the SQL:

1. **Check Tables:** Go to Table Editor → you should see all tables
2. **Check RLS:** Go to Authentication → Policies → RLS should be enabled
3. **Test Admin Creation:** Go to `http://localhost:8080/setup` → should work

## 🚨 Troubleshooting

### If you get permission errors:
1. Make sure you're the project owner
2. Check your Supabase project permissions
3. Try running the SQL in smaller chunks

### If tables still don't appear:
1. Refresh the Supabase dashboard
2. Check the SQL query results for errors
3. Make sure you're in the correct project

## 🎯 Quick Test

After setup, you should be able to:
1. Create admin account at `/setup`
2. Login with admin credentials
3. Access `/admin-dashboard`
4. Add developers and projects

## 📞 Need Help?

If you're still having issues:
1. Double-check you're in the right Supabase project
2. Make sure the SQL ran without errors
3. Try refreshing the browser cache
4. Restart your development server

Once the database is set up, everything should work perfectly! 🚀
