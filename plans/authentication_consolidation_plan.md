# Authentication Consolidation Plan

## Overview

This document outlines the implementation plan for consolidating the dual authentication systems in the Blitzs Project Hub backend. The goal is to eliminate the custom JWT authentication system and standardize on Supabase Auth exclusively.

## Current State Analysis

### Dual Authentication Systems

- **Supabase Auth**: Primary authentication system (recommended)
- **Custom Express Auth**: Legacy system with bcrypt password hashing and JWT tokens

### Components to Address

- `server/controllers/auth.controller.js` - Contains custom auth endpoints
- `server/middleware/auth.middleware.js` - Custom JWT validation
- `server/utils/auth.js` - Password utilities (hashing, comparison)
- `profiles.password` column - Redundant password storage
- Dependencies: `bcryptjs`, `jsonwebtoken`

## Implementation Strategy

### Phase 1: Preparation and Planning

#### 1.1 Backup and Documentation

- Create database snapshot before changes
- Document current authentication flows
- Map all endpoints that use custom auth

#### 1.2 Staging Environment Setup

- Set up isolated test environment
- Deploy migration scripts to staging
- Test all authentication flows in staging

### Phase 2: Frontend Updates

#### 2.1 Update Authentication Logic

- Modify frontend to use only Supabase Auth methods
- Replace any custom JWT usage with Supabase session management
- Update login/signup forms to use Supabase client-side methods

```typescript
// Replace custom auth calls with Supabase Auth
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

#### 2.2 Session Management

- Update session handling to rely solely on Supabase sessions
- Remove any custom token storage/retrieval logic
- Ensure proper session persistence and refresh

### Phase 3: Backend Cleanup

#### 3.1 Remove Custom Authentication Endpoints

- Delete custom signup endpoint (`POST /api/auth/signup`)
- Delete custom signin endpoint (`POST /api/auth/signin`)
- Remove profile update endpoints that handle passwords
- Remove password change endpoints

#### 3.2 Remove Custom Authentication Middleware

- Delete JWT verification middleware in `auth.middleware.js`
- Update route protection to use Supabase session validation
- Implement Supabase session validation middleware

```javascript
// New middleware to validate Supabase sessions
const supabaseAuthMiddleware = async (req, res, next) => {
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
};
```

#### 3.3 Remove Password Utilities

- Delete `server/utils/auth.js` file
- Remove all password hashing/comparison functions
- Eliminate bcrypt dependency usage

### Phase 4: Database Schema Updates

#### 4.1 Remove Password Column

- Drop the `password` column from the `profiles` table
- Verify no other tables store passwords redundantly
- Clean up any related constraints or indexes

```sql
-- SQL to remove password column
ALTER TABLE profiles DROP COLUMN IF EXISTS password;
```

#### 4.2 Validate Referential Integrity

- Ensure all user-related tables reference `auth.users.id` or the correct profile ID
- Update any foreign key relationships if needed
- Verify data consistency after schema changes

### Phase 5: Dependency Management

#### 5.1 Remove Unused Dependencies

- Remove `bcryptjs` from package.json
- Remove `jsonwebtoken` from package.json
- Update import statements in all affected files
- Test that the application runs without these dependencies

#### 5.2 Update Package Configuration

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

### Phase 6: Server-Side Validation

#### 6.1 Update API Controllers

- Modify all controllers to accept Supabase user object
- Update user identification logic to use Supabase user ID
- Ensure all user-specific operations work with Supabase session data

#### 6.2 Update Route Protection

- Replace all custom auth middleware with Supabase auth validation
- Ensure admin routes properly validate Supabase user roles
- Test all protected routes with Supabase sessions

## Testing Strategy

### Pre-Migration Testing

- Verify all authentication flows work with current system
- Test user registration, login, logout, and session management
- Confirm admin functionality remains intact
- Document baseline functionality

### Post-Migration Testing

- Test complete authentication flow with Supabase Auth only
- Verify existing user accounts can still log in
- Confirm all protected routes function properly
- Test admin functions with Supabase session validation
- Validate that password fields are no longer stored

### Rollback Testing

- Verify backup/restore procedures work correctly
- Test fallback to original system if needed
- Ensure data integrity after potential rollback

## Risk Mitigation

### Data Safety

- Full database backup before schema changes
- Test all operations in staging environment first
- Implement gradual rollout if possible

### User Experience

- Plan maintenance window if needed
- Communicate with users about potential disruptions
- Ensure existing sessions remain valid during transition

### Security

- Verify Supabase Auth provides equivalent security
- Test for any new vulnerabilities introduced
- Ensure proper session management

## Success Criteria

### Functional Requirements

- [ ] All authentication flows work exclusively with Supabase Auth
- [ ] No custom JWT endpoints remain active
- [ ] Passwords are no longer stored in database
- [ ] All protected routes function with Supabase sessions
- [ ] Admin functionality works with new authentication system
- [ ] Existing user accounts can authenticate successfully

### Security Requirements

- [ ] Removal of redundant password storage
- [ ] Elimination of custom JWT implementation
- [ ] Secure session management through Supabase
- [ ] No hardcoded credentials in authentication flow

### Performance Requirements

- [ ] Authentication response times remain acceptable
- [ ] No degradation in user experience
- [ ] Efficient session validation

## Rollback Plan

### Phase-Based Rollback

- Maintain database snapshots before each phase
- Keep original code in version control
- Document revert procedures for each step
- Test rollback procedures in staging environment

### Emergency Procedures

- Quick switch back to original authentication if critical issues arise
- Communication plan for users during rollback
- Support procedures for any affected accounts

## Implementation Timeline

The implementation follows a phased approach with validation at each stage:

1. Preparation and staging setup
2. Frontend authentication updates
3. Backend cleanup and middleware updates
4. Database schema modifications
5. Dependency removal and testing
6. Final validation and deployment

Each phase includes testing and validation before proceeding to the next phase.
