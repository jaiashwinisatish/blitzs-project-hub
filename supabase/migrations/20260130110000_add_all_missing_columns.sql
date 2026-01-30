-- Add all missing columns to projects table
-- This script ensures the projects table matches the schema defined in migrations

-- First, create the project_category enum if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_category') THEN
        CREATE TYPE public.project_category AS ENUM ('full-stack', 'mobile', 'template', 'component');
    END IF;
END $$;

-- Add all missing columns to projects table
DO $$
BEGIN
    -- Basic columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'title') THEN
        ALTER TABLE public.projects ADD COLUMN title TEXT NOT NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'slug') THEN
        ALTER TABLE public.projects ADD COLUMN slug TEXT UNIQUE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'short_description') THEN
        ALTER TABLE public.projects ADD COLUMN short_description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'full_description') THEN
        ALTER TABLE public.projects ADD COLUMN full_description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'category') THEN
        ALTER TABLE public.projects ADD COLUMN category project_category DEFAULT 'full-stack';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'price') THEN
        ALTER TABLE public.projects ADD COLUMN price DECIMAL(10,2) DEFAULT 0;
    END IF;

    -- URL columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'thumbnail_url') THEN
        ALTER TABLE public.projects ADD COLUMN thumbnail_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'demo_url') THEN
        ALTER TABLE public.projects ADD COLUMN demo_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'github_repo_url') THEN
        ALTER TABLE public.projects ADD COLUMN github_repo_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'video_url') THEN
        ALTER TABLE public.projects ADD COLUMN video_url TEXT;
    END IF;

    -- Array columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'tech_stack') THEN
        ALTER TABLE public.projects ADD COLUMN tech_stack TEXT[] DEFAULT '{}';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'features') THEN
        ALTER TABLE public.projects ADD COLUMN features TEXT[] DEFAULT '{}';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'images') THEN
        ALTER TABLE public.projects ADD COLUMN images TEXT[] DEFAULT '{}';
    END IF;

    -- Boolean columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'is_featured') THEN
        ALTER TABLE public.projects ADD COLUMN is_featured BOOLEAN DEFAULT false;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'is_published') THEN
        ALTER TABLE public.projects ADD COLUMN is_published BOOLEAN DEFAULT true;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'is_free') THEN
        ALTER TABLE public.projects ADD COLUMN is_free BOOLEAN DEFAULT false;
    END IF;

    -- Foreign key column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'added_by') THEN
        ALTER TABLE public.projects ADD COLUMN added_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
    END IF;

    -- Timestamp columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'created_at') THEN
        ALTER TABLE public.projects ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT now();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'updated_at') THEN
        ALTER TABLE public.projects ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_added_by ON public.projects(added_by);
CREATE INDEX IF NOT EXISTS idx_projects_is_free ON public.projects(is_free);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_is_published ON public.projects(is_published);