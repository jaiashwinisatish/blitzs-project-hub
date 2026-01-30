-- Fix RLS policy for projects table to allow authenticated users to insert projects
-- This resolves the 403 Forbidden error when creating projects

-- Option 1: Allow all authenticated users to create projects (recommended for this use case)
CREATE POLICY "Authenticated users can insert projects"
    ON public.projects FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Option 2: Allow users to insert projects with ownership tracking (uncomment if needed)
-- DROP POLICY IF EXISTS "Authenticated users can insert projects" ON public.projects;
-- CREATE POLICY "Users can insert their own projects"
--     ON public.projects FOR INSERT
--     WITH CHECK (auth.uid() = added_by);

-- Verify existing policies
-- SELECT policyname, cmd, qual, from pg_policies WHERE tablename = 'projects';
