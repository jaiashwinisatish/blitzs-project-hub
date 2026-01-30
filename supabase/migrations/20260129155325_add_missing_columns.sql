-- Add added_by column to projects table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'projects' AND column_name = 'added_by') THEN
        ALTER TABLE public.projects ADD COLUMN added_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
    END IF;
END $$;