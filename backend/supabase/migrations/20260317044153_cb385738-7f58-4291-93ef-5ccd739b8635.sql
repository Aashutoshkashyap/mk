
-- Admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Hero Section
CREATE TABLE public.hero_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'Your Trusted Chartered Accountants',
  subtitle TEXT NOT NULL DEFAULT 'Professional CA Services for Auditing, Taxation, and Advisory',
  description TEXT,
  cta_text TEXT DEFAULT 'Get in Touch',
  cta_link TEXT DEFAULT '/contact',
  secondary_cta_text TEXT DEFAULT 'Learn More',
  secondary_cta_link TEXT DEFAULT '/about',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hero" ON public.hero_section FOR SELECT USING (true);
CREATE POLICY "Admin update hero" ON public.hero_section FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Stats
CREATE TABLE public.stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_name TEXT NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read stats" ON public.stats FOR SELECT USING (true);
CREATE POLICY "Admin manage stats" ON public.stats FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- About Section
CREATE TABLE public.about_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heading TEXT NOT NULL,
  subheading TEXT,
  description TEXT,
  image_url TEXT,
  vision_title TEXT DEFAULT 'Our Vision',
  vision_text TEXT,
  mission_title TEXT DEFAULT 'Our Mission',
  mission_text TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.about_section ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read about" ON public.about_section FOR SELECT USING (true);
CREATE POLICY "Admin manage about" ON public.about_section FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Core Values
CREATE TABLE public.core_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);
ALTER TABLE public.core_values ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read values" ON public.core_values FOR SELECT USING (true);
CREATE POLICY "Admin manage values" ON public.core_values FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Gallery
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Admin manage gallery" ON public.gallery_images FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admin manage services" ON public.services FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Sub Services
CREATE TABLE public.sub_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE NOT NULL,
  icon_name TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);
ALTER TABLE public.sub_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read sub_services" ON public.sub_services FOR SELECT USING (true);
CREATE POLICY "Admin manage sub_services" ON public.sub_services FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Team Members
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT,
  experience TEXT,
  bio TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read team" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Admin manage team" ON public.team_members FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Team Member Sectors
CREATE TABLE public.team_sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID REFERENCES public.team_members(id) ON DELETE CASCADE NOT NULL,
  icon_name TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);
ALTER TABLE public.team_sectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read team_sectors" ON public.team_sectors FOR SELECT USING (true);
CREATE POLICY "Admin manage team_sectors" ON public.team_sectors FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Partners/Clients
CREATE TABLE public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Admin manage partners" ON public.partners FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Contact Info
CREATE TABLE public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_name TEXT NOT NULL,
  title TEXT NOT NULL,
  details TEXT[] NOT NULL DEFAULT '{}',
  action_label TEXT,
  action_href TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read contact" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Admin manage contact" ON public.contact_info FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Pre-footer CTA
CREATE TABLE public.prefooter_cta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heading TEXT NOT NULL DEFAULT 'Ready to work with us?',
  description TEXT DEFAULT 'Get a consultation from our team of Chartered Accountants.',
  cta_text TEXT DEFAULT 'Get in Touch',
  cta_link TEXT DEFAULT '/contact',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.prefooter_cta ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cta" ON public.prefooter_cta FOR SELECT USING (true);
CREATE POLICY "Admin manage cta" ON public.prefooter_cta FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Blog Posts
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  thumbnail_url TEXT,
  category TEXT,
  author TEXT,
  content TEXT NOT NULL DEFAULT '',
  image_1_url TEXT,
  image_2_url TEXT,
  views INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published blogs" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admin manage blogs" ON public.blog_posts FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Index for blog slug lookups
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published, published_at DESC);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_hero_updated_at BEFORE UPDATE ON public.hero_section FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_updated_at BEFORE UPDATE ON public.about_section FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cta_updated_at BEFORE UPDATE ON public.prefooter_cta FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON public.stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
