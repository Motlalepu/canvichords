-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'artist', 'collector');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create feature_applications table
CREATE TABLE public.feature_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id uuid REFERENCES public.artworks(id) ON DELETE CASCADE NOT NULL,
  artist_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reason text NOT NULL,
  status text DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS on feature_applications
ALTER TABLE public.feature_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for feature_applications
CREATE POLICY "Artists can create their own applications"
  ON public.feature_applications FOR INSERT
  WITH CHECK (auth.uid() = artist_id);

CREATE POLICY "Artists can view their own applications"
  ON public.feature_applications FOR SELECT
  USING (auth.uid() = artist_id);

CREATE POLICY "Admins can view all applications"
  ON public.feature_applications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all applications"
  ON public.feature_applications FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create featured_artworks table
CREATE TABLE public.featured_artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id uuid REFERENCES public.artworks(id) ON DELETE CASCADE NOT NULL,
  artist_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  application_id uuid REFERENCES public.feature_applications(id) ON DELETE SET NULL,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NOT NULL,
  payment_reference text,
  views integer DEFAULT 0 NOT NULL,
  clicks integer DEFAULT 0 NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE (artwork_id)
);

-- Enable RLS on featured_artworks
ALTER TABLE public.featured_artworks ENABLE ROW LEVEL SECURITY;

-- RLS policies for featured_artworks
CREATE POLICY "Featured artworks are viewable by everyone"
  ON public.featured_artworks FOR SELECT
  USING (true);

CREATE POLICY "Artists can view their own featured artworks"
  ON public.featured_artworks FOR SELECT
  USING (auth.uid() = artist_id);

CREATE POLICY "Admins can manage featured artworks"
  ON public.featured_artworks FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Artists can insert their own featured artworks"
  ON public.featured_artworks FOR INSERT
  WITH CHECK (auth.uid() = artist_id);

CREATE POLICY "Artists can update their own featured stats"
  ON public.featured_artworks FOR UPDATE
  USING (auth.uid() = artist_id);

-- Trigger to update updated_at on feature_applications
CREATE TRIGGER update_feature_applications_updated_at
  BEFORE UPDATE ON public.feature_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();