-- 1. Create the storage bucket for assets if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Set up RLS policies for the bucket
-- Allow public access to read files
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Public Access'
    ) THEN
        CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'site-assets' );
    END IF;
END $$;

-- Allow authenticated users to upload files
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Authenticated Upload'
    ) THEN
        CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'site-assets' );
    END IF;
END $$;

-- Allow admins to manage files (Update/Delete)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Admin Manage'
    ) THEN
        CREATE POLICY "Admin Manage" ON storage.objects FOR ALL TO authenticated USING ( bucket_id = 'site-assets' );
    END IF;
END $$;

-- 3. Ensure your user has the 'admin' role
-- NOTE: Replace 'admin@gmail.com' with your actual account email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'admin@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- 4. Missing Tables and Initial Data
-- Create site_settings if it doesn't exist
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'current',
  company_name TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Public read settings') THEN
        CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Admin manage settings') THEN
        CREATE POLICY "Admin manage settings" ON public.site_settings FOR ALL USING (public.has_role(auth.uid(), 'admin'));
    END IF;
END $$;

INSERT INTO public.site_settings (id, company_name)
VALUES ('current', 'Sharp Edge Business Solutions')
ON CONFLICT (id) DO NOTHING;

-- Create contact_submissions if it doesn't exist
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_submissions' AND policyname = 'Public insert submissions') THEN
        CREATE POLICY "Public insert submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_submissions' AND policyname = 'Admin manage submissions') THEN
        CREATE POLICY "Admin manage submissions" ON public.contact_submissions FOR ALL USING (public.has_role(auth.uid(), 'admin'));
    END IF;
END $$;

-- Create faqs if it doesn't exist
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'faqs' AND policyname = 'Public read faqs') THEN
        CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'faqs' AND policyname = 'Admin manage faqs') THEN
        CREATE POLICY "Admin manage faqs" ON public.faqs FOR ALL USING (public.has_role(auth.uid(), 'admin'));
    END IF;
END $$;

-- Create testimonials if it doesn't exist
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'testimonials' AND policyname = 'Public read testimonials') THEN
        CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'testimonials' AND policyname = 'Admin manage testimonials') THEN
        CREATE POLICY "Admin manage testimonials" ON public.testimonials FOR ALL USING (public.has_role(auth.uid(), 'admin'));
    END IF;
END $$;

-- 5. Fix missing columns
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'hero_section' AND column_name = 'image_url'
    ) THEN
        ALTER TABLE public.hero_section ADD COLUMN image_url TEXT;
    END IF;
END $$;
