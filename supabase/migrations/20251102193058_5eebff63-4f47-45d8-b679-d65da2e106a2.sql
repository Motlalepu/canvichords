-- Add cover_image_url column for artwork cover images (especially for music)
ALTER TABLE public.artworks 
ADD COLUMN IF NOT EXISTS cover_image_url text;

-- Make price nullable for music items
ALTER TABLE public.artworks 
ALTER COLUMN price DROP NOT NULL;