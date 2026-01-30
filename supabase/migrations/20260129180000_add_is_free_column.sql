-- Add missing is_free column to projects table
-- This column is referenced in src/services/project.service.ts but doesn't exist in the schema

ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT false;

-- Add index for better performance on is_free queries
CREATE INDEX IF NOT EXISTS idx_projects_is_free ON public.projects(is_free);
