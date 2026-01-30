-- Add added_by column to projects table
ALTER TABLE public.projects
ADD COLUMN added_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Update RLS policy for projects to include added_by relationship
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
CREATE POLICY "Admins can insert projects"
    ON public.projects FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_projects_added_by ON public.projects(added_by);
