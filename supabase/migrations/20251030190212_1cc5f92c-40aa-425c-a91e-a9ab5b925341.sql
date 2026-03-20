-- Create storage bucket for artworks
INSERT INTO storage.buckets (id, name, public)
VALUES ('artworks', 'artworks', true);

-- Create RLS policies for artwork uploads
CREATE POLICY "Anyone can view artwork files"
ON storage.objects FOR SELECT
USING (bucket_id = 'artworks');

CREATE POLICY "Authenticated users can upload artwork files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'artworks' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own artwork files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'artworks' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own artwork files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'artworks' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);