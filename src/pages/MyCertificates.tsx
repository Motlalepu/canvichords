import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import CertificateCard from "@/components/CertificateCard";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface Certificate {
  id: string;
  certificate_number: string;
  purchase_date: string;
  purchase_amount: number;
  payment_provider: string;
  artwork_id: string;
  artworks?: {
    title: string;
    artist_id: string;
    profiles?: {
      display_name: string;
    };
  };
}

const MyCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to view your certificates",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('certificates')
        .select(`
          *,
          artworks (
            title,
            artist_id,
            profiles (
              display_name
            )
          )
        `)
        .eq('buyer_id', user.id)
        .order('purchase_date', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast({
        title: "Error",
        description: "Failed to load your certificates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">My Certificates</h1>
          <p className="text-muted-foreground mb-8">
            Your digital certificates of authenticity for purchased artworks
          </p>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                You don't have any certificates yet
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Purchase artwork to receive digital certificates of authenticity
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {certificates.map((cert) => (
                <CertificateCard
                  key={cert.id}
                  certificate={cert}
                  artworkTitle={cert.artworks?.title}
                  artistName={cert.artworks?.profiles?.display_name}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyCertificates;
