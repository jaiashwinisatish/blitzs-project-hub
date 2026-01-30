# Unified Database Schema Plan

## Overview

This document outlines the implementation plan for resolving schema fragmentation issues in the Blitzs Project Hub backend. The goal is to unify the conflicting schema files into a single, coherent database structure that follows Supabase best practices.

## Current Schema Issues

### Conflicting Schema Files

- `server/supabase-schema.sql` - Contains `users` table approach
- `server/supabase-profiles-schema.sql` - Contains `profiles` table linked to `auth.users`
- `server/supabase-rls.sql` - Contains RLS policies for various tables

### Key Problems Identified

- Multiple user table approaches (users vs profiles)
- Inconsistent foreign key relationships
- Duplicate role management systems
- Redundant password storage in profiles table

## Recommended Schema Architecture

### Primary Approach: Supabase Auth + Profiles Extension

The recommended approach leverages Supabase's built-in authentication with an extended profiles table:

```sql
-- Authenticated users are stored in auth.users (managed by Supabase)
-- Extended user information is stored in public.profiles

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Profiles are viewable by users who created them." ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
```

### Related Tables Structure

All user-referencing tables should link to `auth.users.id` (via the profiles table):

```sql
-- Projects table referencing user profiles
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  added_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table referencing user profiles
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  project_id UUID REFERENCES public.projects(id),
  amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table referencing user profiles
CREATE TABLE public.project_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  project_id UUID REFERENCES public.projects(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Client requests table referencing user profiles
CREATE TABLE public.client_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Migration Strategy

### Phase 1: Schema Definition and Validation

#### 1.1 Define Unified Schema

- Create a single authoritative schema definition file
- Ensure all table relationships are consistent
- Define proper indexes for performance
- Document the unified schema structure

#### 1.2 Staging Environment Setup

- Apply schema changes to staging environment
- Validate referential integrity
- Test all database operations with new schema
- Ensure RLS policies work correctly

### Phase 2: Data Migration

#### 2.1 Data Audit

- Identify all existing data in current tables
- Map data from old schema to new schema
- Identify any data quality issues
- Plan for orphaned records

#### 2.2 Migration Scripts

- Create scripts to migrate data from old structure to new structure
- Preserve all user data during migration
- Handle any data transformation needs
- Validate data integrity after migration

```sql
-- Example migration script
BEGIN;

-- Create temporary mapping table if needed
CREATE TEMP TABLE user_migration_map AS
SELECT
  u.id as old_user_id,
  p.id as new_profile_id
FROM old_users_table u
LEFT JOIN public.profiles p ON u.email = p.email;

-- Migrate projects data
INSERT INTO public.projects (title, description, url, added_by, created_at, updated_at)
SELECT
  o.title,
  o.description,
  o.url,
  umm.new_profile_id,
  COALESCE(o.created_at, NOW()),
  COALESCE(o.updated_at, NOW())
FROM old_projects_table o
JOIN user_migration_map umm ON o.added_by = umm.old_user_id;

COMMIT;
```

### Phase 3: Application Code Updates

#### 3.1 Update Database Queries

- Modify all queries to use the new unified schema
- Update foreign key references in application code
- Ensure all joins work with new table structure
- Test all database operations thoroughly

#### 3.2 Update API Endpoints

- Modify all API endpoints to work with new schema
- Update request/response models to match new structure
- Ensure pagination and filtering work correctly
- Validate all CRUD operations with new schema

### Phase 4: RLS Policy Consolidation

#### 4.1 Consolidate RLS Policies

- Combine all conflicting RLS policies into unified set
- Ensure policies are consistent across all tables
- Test authorization for different user roles
- Verify admin access patterns work correctly

```sql
-- Unified RLS policy structure
-- Profiles table policies (already defined above)

-- Projects table policies
CREATE POLICY "Projects are viewable by everyone." ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own projects." ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = added_by);

CREATE POLICY "Users can update their own projects." ON public.projects
  FOR UPDATE USING (auth.uid() = added_by);

CREATE POLICY "Admins can manage all projects." ON public.projects
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Orders table policies
CREATE POLICY "Users can view their own orders." ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders." ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders." ON public.orders
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
```

## Schema Validation Checklist

### Structural Requirements

- [ ] All user-referencing tables link to `auth.users.id` via profiles
- [ ] No password columns exist in application tables (Supabase handles auth)
- [ ] Proper indexing for performance
- [ ] Foreign key constraints are valid
- [ ] Generated columns are properly defined

### Data Integrity

- [ ] Referential integrity is maintained
- [ ] No orphaned records exist
- [ ] Unique constraints are properly enforced
- [ ] Check constraints are applied where needed

### Security Requirements

- [ ] RLS policies are properly defined
- [ ] Authentication functions are used appropriately (`auth.uid()`, `auth.role()`)
- [ ] No overly permissive policies exist
- [ ] Admin access patterns are secure

### Performance Considerations

- [ ] Appropriate indexes exist for common queries
- [ ] Foreign key columns are indexed
- [ ] Text search indexes where needed
- [ ] Partitioning for large tables if necessary

## Testing Strategy

### Schema Validation Tests

- Verify all tables exist with correct structure
- Confirm all foreign key relationships work
- Test RLS policies with different user roles
- Validate referential integrity constraints

### Application Integration Tests

- Test all API endpoints with new schema
- Verify user registration and profile creation
- Confirm project creation and management
- Validate order processing and client requests

### Performance Tests

- Measure query performance with new schema
- Test concurrent user operations
- Validate pagination performance
- Check for any performance regressions

## Risk Mitigation

### Data Safety

- Full database backup before schema changes
- Staging environment validation
- Gradual rollout strategy if possible
- Rollback procedures for each phase

### Application Stability

- Thorough testing in staging environment
- Monitoring of application performance
- Error handling for schema-related issues
- Fallback procedures if needed

### User Experience

- Minimize downtime during migration
- Preserve user data and settings
- Maintain application functionality
- Communication plan for any disruptions

## Success Criteria

### Schema Requirements

- [ ] Single, authoritative schema definition
- [ ] All tables follow consistent naming conventions
- [ ] Foreign key relationships are uniform
- [ ] RLS policies are consolidated and functional

### Data Requirements

- [ ] All existing user data is preserved
- [ ] No orphaned records exist after migration
- [ ] Data integrity is maintained
- [ ] Referential integrity is enforced

### Security Requirements

- [ ] RLS policies are properly implemented
- [ ] No unauthorized access is possible
- [ ] Admin functions work correctly
- [ ] User privacy is maintained

### Performance Requirements

- [ ] Query performance meets expectations
- [ ] No significant performance degradation
- [ ] Indexes are optimized for common queries
- [ ] Database operations are efficient
