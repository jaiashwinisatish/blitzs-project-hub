# Supabase Migration Setup Guide

## 🎯 Overview
This codebase has been successfully migrated from Express + MongoDB to Supabase as the single backend source of truth.

## 📋 Migration Checklist

### ✅ Completed Tasks
- [x] **Backend Architecture Cleanup**: Disabled Express + MongoDB logic
- [x] **Supabase Client Setup**: Configured Supabase client with proper auth
- [x] **Authentication Flow**: Email/password auth with persistent sessions
- [x] **Roles System**: Admin/User roles in profiles table
- [x] **Route Protection**: Protected routes for admin, dashboard, orders
- [x] **Admin Dashboard**: CRUD operations for projects/developers
- [x] **Purchase Flow**: Orders table with access control
- [x] **API Consistency**: All services use Supabase
- [x] **Error Handling**: Proper error handling throughout

## 🗄️ Database Schema

### Tables Created:
- `profiles` - User profiles with roles (linked to auth.users)
- `projects` - Project listings with pricing and visibility
- `developers` - Developer team members
- `orders` - Purchase orders with status tracking
- `client_requests` - Client project requests
- `project_reviews` - User reviews for projects

### Row Level Security (RLS) Enabled:
- Users can only view/update their own profiles
- Admins can view all profiles
- Published projects are public
- Admins can manage all projects
- Order access restricted to owners and admins

## 🔐 Authentication Flow

### User Registration:
1. User signs up with email/password
2. Profile automatically created with 'user' role
3. Email verification required (Supabase handles this)

### User Login:
1. User signs in with credentials
2. Session persisted automatically
3. Profile data loaded and stored in context

### Admin Access:
1. Create first admin using `createFirstAdmin()` utility
2. Update user role to 'admin' in profiles table
3. Admin gets access to protected admin routes

## 🛡️ Security Features

### Route Protection:
- `/admin-dashboard` - Admin only
- `/user-dashboard` - Authenticated users only
- `/orders` - Authenticated users only
- `/unauthorized` - Access denied page

### Data Protection:
- RLS policies enforce data access rules
- Server-side validation in all operations
- Proper error handling without data leakage

## 🚀 Getting Started

### 1. Environment Setup:
```bash
# .env file already configured with:
VITE_SUPABASE_URL="https://afgromdzethkscaskofz.supabase.co"
VITE_SUPABASE_ANON_KEY="sb_publishable_uc-Q0_9szmdqnrMPE0-QGQ_Og9mhzx4"
VITE_SUPABASE_PROJECT_ID="afgromdzethkscaskofz"
```

### 2. Database Setup:
1. Run the SQL schema in `server/supabase-profiles-schema.sql`
2. Create initial admin user using the utility
3. Verify RLS policies are enabled

### 3. Create First Admin:
```typescript
import { createFirstAdmin } from '@/utils/create-admin';

// Run this once to create your admin account
await createFirstAdmin('admin@example.com', 'password', 'Admin User');
```

### 4. Start Development:
```bash
npm run dev
```

## 📱 Features

### User Features:
- ✅ Email/password authentication
- ✅ Profile management
- ✅ Project browsing and purchasing
- ✅ Order tracking
- ✅ Review system
- ✅ Client requests

### Admin Features:
- ✅ User management (role changes, status toggle)
- ✅ Project CRUD operations
- ✅ Developer management
- ✅ Order management
- ✅ Client request handling
- ✅ Dashboard statistics

### Security Features:
- ✅ Persistent sessions
- ✅ Role-based access control
- ✅ Row-level security
- ✅ Protected routes
- ✅ Input validation
- ✅ Error handling

## 🔧 Development Notes

### Services Updated:
- `auth.service.ts` - Uses Supabase Auth
- `project.service.ts` - Direct Supabase queries
- `admin.service.ts` - Admin operations with RLS
- `order.service.ts` - Order management
- `client.service.ts` - Client requests

### Deprecated:
- `lib/api.ts` - Replaced with Supabase client
- Express server routes - No longer needed
- MongoDB models - Replaced with Supabase tables

### Key Files:
- `src/lib/supabase.ts` - Supabase client configuration
- `src/contexts/AuthContext.tsx` - Auth state management
- `src/components/auth/ProtectedRoute.tsx` - Route protection
- `server/supabase-profiles-schema.sql` - Database schema

## 🧪 Testing

### Authentication Test:
1. Try accessing `/admin-dashboard` without login → Should redirect to login
2. Login as regular user → Should block admin routes
3. Login as admin → Should access all routes

### Data Access Test:
1. Users should only see their own orders
2. Admins should see all orders
3. Public projects visible to all
4. Draft projects only visible to admins

## 🎉 Migration Complete!

The website is now fully functional with Supabase as the backend:
- ✅ Fully functional authentication
- ✅ Smooth & bug-free operation
- ✅ Responsive design (mobile + desktop)
- ✅ Production-ready with proper security
- ✅ Single Supabase backend source of truth
