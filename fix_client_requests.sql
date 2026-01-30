ALTER TABLE public.client_requests ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

UPDATE public.client_requests cr SET user_id = p.id FROM public.profiles p WHERE cr.email IS NOT NULL AND p.email IS NOT NULL AND cr.user_id IS NULL AND cr.email::text = p.email::text;