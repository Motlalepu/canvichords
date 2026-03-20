-- Create certificates table for digital certificates of authenticity
CREATE TABLE public.certificates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artwork_id uuid NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  buyer_id uuid NOT NULL,
  artist_id uuid NOT NULL,
  certificate_number text NOT NULL UNIQUE,
  purchase_date timestamp with time zone NOT NULL DEFAULT now(),
  payment_reference text NOT NULL,
  payment_provider text NOT NULL,
  purchase_amount numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Buyers can view their own certificates
CREATE POLICY "Buyers can view their own certificates"
ON public.certificates
FOR SELECT
USING (auth.uid() = buyer_id);

-- Artists can view certificates for their artworks
CREATE POLICY "Artists can view certificates for their artworks"
ON public.certificates
FOR SELECT
USING (auth.uid() = artist_id);

-- Authenticated users can insert certificates (after purchase)
CREATE POLICY "Authenticated users can insert certificates"
ON public.certificates
FOR INSERT
WITH CHECK (auth.uid() = buyer_id);

-- Create index for faster lookups
CREATE INDEX idx_certificates_buyer_id ON public.certificates(buyer_id);
CREATE INDEX idx_certificates_artwork_id ON public.certificates(artwork_id);
CREATE INDEX idx_certificates_certificate_number ON public.certificates(certificate_number);