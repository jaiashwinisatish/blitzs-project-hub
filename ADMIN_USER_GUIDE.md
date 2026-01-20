# Admin User Guide - How to Add Developers & Projects

## 🔐 Getting Admin Access

### Method 1: Create First Admin (Recommended)
1. **Create a simple admin creation script:**
```typescript
// In your browser console or a temporary component
import { createFirstAdmin } from '@/utils/create-admin';

// Run this to create your admin account
await createFirstAdmin('your-email@example.com', 'your-password', 'Your Name');
```

2. **Or use Supabase Dashboard directly:**
   - Go to your Supabase project dashboard
   - Navigate to Authentication → Users
   - Create a user manually
   - Go to Table Editor → profiles
   - Find the user and set `role` to 'admin'

### Method 2: Update Existing User to Admin
1. Sign up normally through the app
2. Go to Supabase Dashboard → Table Editor → profiles
3. Find your user and change `role` field to 'admin'
4. Refresh the app - you'll now have admin access

## 👥 Adding Developers (Admin Only)

### Method 1: Through Admin Dashboard
1. **Login as Admin** and go to `/admin-dashboard`
2. **Navigate to Developers section**
3. **Click "Add Developer" button**
4. **Fill in developer details:**
   - Name (required)
   - Email (required, unique)
   - Bio (optional)
   - Avatar URL (optional)
   - Skills (array, e.g., ["React", "Node.js", "TypeScript"])
   - Experience level: "beginner" | "intermediate" | "advanced" | "expert"
   - GitHub profile URL (optional)
   - LinkedIn profile URL (optional)
   - Portfolio URL (optional)
5. **Click "Save"**

### Method 2: Direct Database Entry
```sql
INSERT INTO developers (
  name, 
  email, 
  bio, 
  skills, 
  experience, 
  github, 
  linkedin, 
  portfolio
) VALUES (
  'John Doe',
  'john@example.com',
  'Full-stack developer with 5 years experience',
  ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
  'advanced',
  'https://github.com/johndoe',
  'https://linkedin.com/in/johndoe',
  'https://johndoe.dev'
);
```

## 📦 Adding Projects (Admin Only)

### Method 1: Through Admin Dashboard
1. **Login as Admin** and go to `/admin-dashboard`
2. **Navigate to Projects section**
3. **Click "Add Project" button**
4. **Fill in project details:**
   - Title (required)
   - Description (required)
   - Short Description (required, max 200 chars)
   - Price (required, must be >= 0)
   - Category: "web" | "mobile" | "desktop" | "ai" | "blockchain" | "game" | "other"
   - Tech Stack (array, e.g., ["React", "Node.js", "MongoDB"])
   - Features (array, e.g., ["User Authentication", "Real-time Updates"])
   - Images (array of image URLs)
   - Demo Link (required)
   - GitHub Link (optional)
   - Difficulty: "beginner" | "intermediate" | "advanced"
   - Is Free (boolean, default false)
   - Is Published (boolean, default true)
   - Tags (array, e.g., ["frontend", "backend", "fullstack"])
5. **Click "Save"**

### Method 2: Direct Database Entry
```sql
INSERT INTO projects (
  title,
  description,
  short_description,
  price,
  category,
  tech_stack,
  features,
  images,
  demo_link,
  github_link,
  difficulty,
  is_free,
  is_published,
  tags,
  added_by
) VALUES (
  'E-Commerce Platform',
  'A full-featured e-commerce platform with payment integration',
  'Modern e-commerce solution with React and Node.js',
  99.99,
  'web',
  ARRAY['React', 'Node.js', 'Stripe', 'PostgreSQL'],
  ARRAY['User Authentication', 'Payment Processing', 'Admin Dashboard'],
  ARRAY['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  'https://demo.example.com',
  'https://github.com/user/ecommerce-platform',
  'intermediate',
  false,
  true,
  ARRAY['ecommerce', 'react', 'nodejs'],
  (SELECT id FROM profiles WHERE email = 'admin@example.com')
);
```

## 🛠️ Quick Setup Script

Create this temporary component to set up your admin account and add sample data:

```typescript
// src/components/admin/SetupAdmin.tsx
import React, { useState } from 'react';
import { createFirstAdmin } from '@/utils/create-admin';
import { supabase } from '@/lib/supabase';

const SetupAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createAdminAndSampleData = async () => {
    setLoading(true);
    try {
      // Create admin user
      const adminResult = await createFirstAdmin(
        'admin@example.com', 
        'admin123', 
        'Admin User'
      );
      
      if (adminResult.success) {
        setMessage('Admin created! Now adding sample data...');
        
        // Add sample developer
        await supabase.from('developers').insert({
          name: 'Sample Developer',
          email: 'dev@example.com',
          bio: 'Sample developer for testing',
          skills: ['React', 'TypeScript', 'Node.js'],
          experience: 'intermediate',
          github: 'https://github.com/sample',
          linkedin: 'https://linkedin.com/in/sample'
        });

        // Add sample project
        await supabase.from('projects').insert({
          title: 'Sample Project',
          description: 'This is a sample project for testing',
          short_description: 'Sample project description',
          price: 29.99,
          category: 'web',
          tech_stack: ['React', 'TypeScript', 'Tailwind'],
          features: ['Feature 1', 'Feature 2'],
          images: ['https://via.placeholder.com/300x200'],
          demo_link: 'https://demo.example.com',
          difficulty: 'beginner',
          is_free: false,
          is_published: true,
          tags: ['sample', 'demo']
        });

        setMessage('Setup complete! You can now login as admin@example.com / admin123');
      } else {
        setMessage('Error: ' + adminResult.message);
      }
    } catch (error) {
      setMessage('Setup failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Quick Admin Setup</h2>
      <button
        onClick={createAdminAndSampleData}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Setting up...' : 'Create Admin & Sample Data'}
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default SetupAdmin;
```

Add this to your routes temporarily to run the setup:
```typescript
// In App.tsx, add temporarily:
import SetupAdmin from './components/admin/SetupAdmin';

// Add route:
<Route path="/setup" element={<SetupAdmin />} />
```

## 📋 Admin Dashboard Features

Once you have admin access, you can:

### 📊 Dashboard Overview
- View total users, projects, orders, revenue
- See recent activity
- Monitor system health

### 👥 User Management
- View all registered users
- Change user roles (admin/user)
- Activate/deactivate users
- Search and filter users

### 📦 Project Management
- Create new projects
- Edit existing projects
- Delete projects
- Set pricing and visibility
- Manage project categories

### 🚀 Developer Management
- Add new developers
- Edit developer profiles
- Remove developers
- Manage developer information

### 💰 Order Management
- View all purchase orders
- Update order status (pending → completed)
- Handle refunds
- View revenue analytics

### 📞 Client Requests
- View project requests from clients
- Update request status
- Contact clients about their projects

## 🔒 Security Notes

- Admin routes are protected and require authentication
- Only users with `role = 'admin' in profiles table can access admin features
- All admin actions are logged
- Row Level Security ensures data protection

## 🚀 Next Steps

1. **Create your admin account** using one of the methods above
2. **Login with admin credentials**
3. **Go to `/admin-dashboard`**
4. **Start adding developers and projects!**

The admin dashboard is fully functional and ready for production use! 🎉
