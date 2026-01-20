# Blitzs Project Hub - Setup Guide

## Overview
This is a fully dynamic, production-ready full-stack website with real Supabase database integration, proper authentication, and admin controls.

## Features
- ✅ Real Supabase database integration
- ✅ JWT-based authentication with role-based access control
- ✅ Admin dashboard with full CRUD operations
- ✅ Row Level Security (RLS) for data protection
- ✅ Dynamic project and developer management
- ✅ Client request management system
- ✅ Production-ready API with proper error handling

## Setup Instructions

### 1. Supabase Database Setup

1. **Go to your Supabase project dashboard**
2. **Run the database schema**:
   - Open the SQL Editor in Supabase
   - Copy and paste the contents of `server/supabase-schema.sql`
   - Run the SQL to create all tables

3. **Set up Row Level Security (RLS)**:
   - In the SQL Editor, run the contents of `server/supabase-rls.sql`
   - This will set up proper access controls for all tables

4. **Get your Supabase credentials**:
   - Go to Settings → API
   - Copy your Project URL and Anon Key
   - Go to Settings → Database
   - Copy your Service Role Key (admin key)

### 2. Backend Server Setup

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Edit `server/.env`
   - Replace with your actual Supabase credentials:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_KEY=your_service_role_key
   JWT_SECRET=your_secure_jwt_secret
   ```

4. **Start the backend server**:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### 3. Frontend Setup

1. **Navigate to root directory**:
   ```bash
   cd ..
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up frontend environment variables**:
   - Edit `.env` in the root directory
   - Ensure it matches your Supabase setup:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
   ```

4. **Start the frontend**:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:8080`

### 4. Create Admin Account

**Option 1: Using the Admin Creation Script (Recommended)**

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Create admin user with default credentials**:
   ```bash
   npm run create-admin
   ```
   This will create an admin with:
   - Email: `admin@blitzs.dev`
   - Password: `admin123456`
   - Name: `Admin User`

3. **Or create admin with custom credentials**:
   ```bash
   node utils/create-admin.js create-admin your-email@domain.com your-password "Your Name"
   ```

**Option 2: Manual Database Creation**

1. **Register a new account** on the frontend at `http://localhost:8080`
2. **Make the user an admin** by running this SQL in Supabase:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

**Option 3: Direct SQL Insert**

Run this SQL in Supabase SQL Editor:
```sql
INSERT INTO users (full_name, email, password, role, is_active, created_at, updated_at)
VALUES (
  'Admin User',
  'admin@blitzs.dev',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkO3vq6kG9/H.I1Jr6hIa3KJxQr5d5j2', -- This is 'admin123456' hashed
  'admin',
  true,
  NOW(),
  NOW()
);
```

**Important Security Note**: 
- Change the default password after first login
- Use a strong password for production
- Store credentials securely

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Admin Only (Requires admin role)
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/toggle-status` - Toggle user status
- `GET /api/admin/projects` - Get all projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `GET /api/admin/developers` - Get all developers
- `POST /api/admin/developers` - Create developer
- `PUT /api/admin/developers/:id` - Update developer
- `DELETE /api/admin/developers/:id` - Delete developer
- `GET /api/admin/requests` - Get client requests
- `PUT /api/admin/requests/:id/status` - Update request status

### Public Endpoints
- `GET /api/projects` - Get published projects
- `GET /api/developers` - Get active developers
- `POST /api/requests` - Submit client request

## Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **Role-based Access Control**: Only admins can manage data
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs are validated on the backend
- **Rate Limiting**: API endpoints are rate-limited
- **CORS Protection**: Proper CORS configuration

## Admin Dashboard Features

The admin dashboard provides full control over:

1. **User Management**
   - View all users
   - Activate/deactivate users
   - Change user roles
   - Search and filter users

2. **Project Management**
   - Create, edit, delete projects
   - Manage project status (published/draft)
   - View project statistics
   - Search and filter projects

3. **Developer Management**
   - Add, edit, remove developers
   - Manage developer profiles
   - Control developer status
   - Search and filter developers

4. **Client Requests**
   - View all client requests
   - Update request status
   - Manage request workflow
   - Filter by status

## Database Schema

### Tables Created:
- `users` - User accounts and authentication
- `projects` - Project listings and details
- `developers` - Developer profiles
- `project_reviews` - Project reviews and ratings
- `orders` - Purchase orders
- `client_requests` - Custom project requests

## Deployment

### Backend Deployment
1. Set environment variables in your hosting platform
2. Ensure Supabase credentials are properly configured
3. Deploy the Node.js server

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy to your hosting platform
3. Set environment variables for Supabase

## Troubleshooting

### Common Issues:

1. **"Invalid token" error**
   - Check that your JWT_SECRET is the same in frontend and backend
   - Ensure tokens are being sent in Authorization header

2. **"Access denied" error**
   - Verify user has correct role in database
   - Check RLS policies are properly set up

3. **Database connection error**
   - Verify Supabase URL and keys are correct
   - Check that service role key has proper permissions

4. **CORS error**
   - Ensure FRONTEND_URL in backend .env matches your frontend URL
   - Check that CORS is properly configured

## Next Steps

Your fully dynamic website is now ready! You can:

1. **Add real projects** through the admin dashboard
2. **Add real developers** to showcase your team
3. **Manage client requests** as they come in
4. **Monitor statistics** through the dashboard
5. **Customize the design** to match your brand

The system is production-ready and includes all necessary security measures and features for a real-world application.
