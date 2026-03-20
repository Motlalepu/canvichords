-- Create artists table linked to profiles (1:1)
CREATE TABLE
IF NOT EXISTS public.artists
(
  id uuid PRIMARY KEY REFERENCES public.profiles
(id) ON
DELETE CASCADE,
  display_name text,
  bio text,
  social_links jsonb,
  avatar_url text,
  is_active boolean
DEFAULT true NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now
(),
  updated_at timestamptz NOT NULL DEFAULT now
()
);

ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artists are viewable by everyone"
  ON public.artists FOR
SELECT
    USING (true);

CREATE TRIGGER
IF NOT EXISTS update_artists_updated_at
  BEFORE
UPDATE ON public.artists
  FOR EACH ROW
EXECUTE
FUNCTION public.update_updated_at_column
();

-- Add flags to artworks for featured/exhibition
ALTER TABLE public.artworks
  ADD COLUMN
IF NOT EXISTS is_featured boolean DEFAULT false NOT NULL,
ADD COLUMN
IF NOT EXISTS is_exhibition boolean DEFAULT false NOT NULL;
