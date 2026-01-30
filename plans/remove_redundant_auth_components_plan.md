# Plan for Removing Redundant Authentication Components

## Overview

This document outlines the implementation plan for removing redundant authentication components from the Blitzs Project Hub backend. This includes eliminating the custom JWT authentication system, removing password hashing utilities, and cleaning up associated dependencies and configurations.

## Current Redundant Components

### Server-Side Components

- `server/controllers/auth.controller.js` - Contains custom authentication endpoints
- `server/middleware/auth.middleware.js` - Custom JWT validation middleware
- `server/utils/auth.js` - Password hashing and token generation utilities
- Custom authentication routes in `server/routes/auth.routes.js`

### Dependencies

- `bcryptjs` - Used for password hashing (redundant with Supabase Auth)
- `jsonwebtoken` - Used for JWT token generation (redundant with Supabase sessions)

### Database Elements

- `profiles.password` column - Stores passwords redundantly
- Custom user authentication data that duplicates Supabase Auth

## Removal Strategy

### Phase 1: Endpoint Deactivation

#### 1.1 Identify Custom Authentication Endpoints

- `POST /api/auth/signup` - Custom user registration
- `POST /api/auth/signin` - Custom user login
- `POST /api/auth/change-password` - Password change functionality
- `GET /api/auth/profile` - Profile retrieval with custom auth
- `PUT /api/auth/profile` - Profile updates with custom auth

#### 1.2 Endpoint Migration Plan

1. Update frontend to use Supabase Auth methods exclusively
2. Add deprecation warnings to custom endpoints (temporary)
3. Redirect custom endpoints to Supabase Auth where applicable
4. Remove custom endpoint implementations

```javascript
// Example of updated auth controller (after removal of custom endpoints)
// server/controllers/auth.controller.js

import { supabase } from "../config/supabase.js";

export const getCurrentUser = async (req, res) => {
  try {
    // This endpoint would now validate Supabase session instead of custom JWT
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Missing or invalid authorization header" });
    }

    const token = authHeader.substring(7);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid session" });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ user, profile });
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Other controllers would be updated similarly to work with Supabase sessions
```

### Phase 2: Middleware Replacement

#### 2.1 Remove Custom JWT Middleware

- Delete custom JWT validation logic in `auth.middleware.js`
- Replace with Supabase session validation
- Update all protected routes to use new middleware

```javascript
// New auth middleware using Supabase sessions
// server/middleware/auth.middleware.js

import { supabase } from "../config/supabase.js";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Missing or invalid authorization header" });
    }

    const token = authHeader.substring(7);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid session" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ error: "Authentication error" });
  }
};

export const requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Missing or invalid authorization header" });
    }

    const token = authHeader.substring(7);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid session" });
    }

    // Check if user is admin using the profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile || profile.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Admin auth middleware error:", err);
    res.status(500).json({ error: "Authentication error" });
  }
};
```

#### 2.2 Update Route Protection

- Replace all instances of custom auth middleware with Supabase-based middleware
- Ensure admin routes properly validate Supabase user roles
- Test all protected routes with new authentication system

### Phase 3: Utility Functions Removal

#### 3.1 Remove Password Utilities

- Delete `server/utils/auth.js` file completely
- Remove all password hashing and comparison functions
- Eliminate token generation functions

```javascript
// server/utils/auth.js - DELETED CONTENT
/*
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
*/
```

#### 3.2 Update Import Statements

- Remove import statements referencing deleted utility functions
- Update all files that previously used custom auth utilities
- Ensure no broken imports remain in the codebase

### Phase 4: Dependency Removal

#### 4.1 Update package.json

- Remove `bcryptjs` dependency
- Remove `jsonwebtoken` dependency
- Update any related configuration

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.90.1",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "validator": "^13.11.0"
    // Removed: "bcryptjs", "jsonwebtoken"
  }
}
```

#### 4.2 Clean Up Configuration

- Remove JWT-related environment variables from `.env` (after confirming they're no longer used)
- Update any configuration files that referenced custom auth
- Ensure all configuration is compatible with Supabase Auth

### Phase 5: Database Cleanup

#### 5.1 Remove Password Columns

- Remove `password` column from `profiles` table
- Verify no other tables contain password fields
- Clean up any related database constraints

```sql
-- SQL script to clean up database
-- Remove password column from profiles table
ALTER TABLE profiles DROP COLUMN IF EXISTS password;

-- Verify no other tables have password columns
SELECT table_name, column_name
FROM information_schema.columns
WHERE column_name LIKE '%password%'
AND table_schema = 'public'
AND table_name != 'schema_migrations';
```

#### 5.2 Data Validation

- Verify that user data remains intact after schema changes
- Ensure all existing users can authenticate with Supabase Auth
- Test that profile information is accessible through Supabase sessions

## Implementation Steps

### Step 1: Prepare for Changes

1. Create full database backup
2. Set up staging environment with changes
3. Document current authentication flows
4. Plan testing procedures

### Step 2: Frontend Updates

1. Update all authentication calls to use Supabase methods
2. Remove any custom token storage/retrieval
3. Update session management to use Supabase sessions
4. Test all authentication flows in staging

### Step 3: Backend Updates

1. Update auth controller to remove custom endpoints
2. Replace custom middleware with Supabase validation
3. Remove password utilities and update imports
4. Update all controllers to work with Supabase sessions

### Step 4: Database Schema Updates

1. Apply schema changes in staging environment
2. Migrate any necessary data
3. Test all database operations with new schema
4. Verify referential integrity

### Step 5: Dependency Cleanup

1. Remove unused dependencies from package.json
2. Run `npm install` to update node_modules
3. Verify application starts without errors
4. Test all functionality

### Step 6: Production Deployment

1. Schedule maintenance window if needed
2. Deploy changes to production
3. Monitor application for issues
4. Verify all authentication flows work

## Testing Checklist

### Before Removal

- [ ] All custom authentication endpoints are mapped
- [ ] Frontend authentication is updated to Supabase methods
- [ ] Database backup is created
- [ ] Staging environment is ready

### During Implementation

- [ ] Custom endpoints are deactivated gracefully
- [ ] New Supabase-based authentication works
- [ ] All protected routes function properly
- [ ] Admin access controls work correctly

### After Removal

- [ ] Custom authentication files are deleted
- [ ] Dependencies are removed
- [ ] Password columns are dropped from database
- [ ] Application functions normally with Supabase Auth only

## Risk Mitigation

### Data Safety

- Full database backup before any changes
- Staging environment validation
- Rollback procedures documented
- Data integrity checks performed

### User Experience

- Maintain existing user accounts
- Ensure smooth transition for active users
- Communication plan for any disruptions
- Fallback procedures if needed

### Security

- Verify Supabase Auth provides equivalent security
- Test all authorization levels
- Ensure no security gaps are introduced
- Monitor for unusual activity after changes

## Success Criteria

### Functional Requirements

- [ ] All authentication handled exclusively by Supabase Auth
- [ ] Custom authentication endpoints are removed
- [ ] Password hashing utilities are eliminated
- [ ] All protected routes work with Supabase sessions
- [ ] Admin functions operate correctly with new auth system

### Security Requirements

- [ ] No passwords stored in application database
- [ ] No custom JWT implementation remains
- [ ] Authentication handled securely through Supabase
- [ ] Authorization levels properly enforced

### Performance Requirements

- [ ] Authentication response times are acceptable
- [ ] No performance degradation from changes
- [ ] Session management operates efficiently

### Code Quality Requirements

- [ ] No unused dependencies remain
- [ ] No dead code exists in the codebase
- [ ] Import statements are cleaned up
- [ ] Error handling is appropriate for new system
