-- Add user_id column to client_requests if missing and backfill from profiles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'client_requests' AND column_name = 'user_id') THEN
        ALTER TABLE public.client_requests ADD COLUMN user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;

    -- Backfill user_id where email matches a profile
    UPDATE public.client_requests cr
    SET user_id = p.id
    FROM public.profiles p
    WHERE cr.email IS NOT NULL
      AND p.email IS NOT NULL
      AND cr.user_id IS NULL
      AND cr.email::text = p.email::text;
END $$;
