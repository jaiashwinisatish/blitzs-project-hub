-- Add full_description column to projects table if it doesn't exist
-- This resolves the schema cache error when creating projects

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'projects' AND column_name = 'full_description') THEN
        ALTER TABLE public.projects ADD COLUMN full_description TEXT;
    END IF;
END $$;