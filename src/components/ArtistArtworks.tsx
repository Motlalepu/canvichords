import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ArtworkEditDialog from "./ArtworkEditDialog";
import ContactArtistDialog from "./ContactArtistDialog";
import type { Database } from "@/integrations/supabase/types";

type ArtCategory = Database["public"]["Enums"]["art_category"];

interface Artwork {
  id: string;
  title: string;
  image_url: string;
  cover_image_url?: string | null;
  price: number | null;
  category: ArtCategory;
}

const ArtistArtworks = ({
  userId,
  onArtworkChange,
}: {
  userId: string;
  onArtworkChange?: () => Promise<void>;
}) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedArtworkId, setSelectedArtworkId] = useState<
    string | undefined
  >(undefined);
  const { toast } = useToast();

  const fetchArtworks = async () => {
    const { data, error } = await supabase
      .from("artworks")
      .select("*")
      .eq("artist_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setArtworks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtworks();
  }, [userId]);

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;

    const { error } = await supabase.from("artworks").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Artwork deleted" });
      await fetchArtworks();
      if (onArtworkChange) {
        await onArtworkChange();
      }
    }
  };

  if (loading)
    return <div className="text-muted-foreground">Loading artworks...</div>;

  if (artworks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No artworks yet. Add your first piece!
      </div>
    );
  }

  return (
    <>
      <ArtworkEditDialog
        artwork={editingArtwork}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={fetchArtworks}
      />

      <ContactArtistDialog
        open={contactOpen}
        onOpenChange={setContactOpen}
        artistId={userId}
        artworkId={selectedArtworkId}
      />

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artworks.map((artwork) => {
          const isAudio =
            artwork.image_url.endsWith(".mp3") ||
            artwork.image_url.endsWith(".wav") ||
            artwork.image_url.endsWith(".mpeg");
          const isVideo =
            artwork.image_url.endsWith(".mp4") ||
            artwork.image_url.endsWith(".webm") ||
            artwork.image_url.endsWith(".mov");
          const displayImage =
            isAudio && artwork.cover_image_url
              ? artwork.cover_image_url
              : artwork.image_url;

          return (
            <Card key={artwork.id} className="overflow-hidden">
              {isVideo ? (
                <video
                  src={artwork.image_url}
                  className="w-full h-48 object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={displayImage}
                  alt={artwork.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground">
                  {artwork.title}
                </h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {artwork.category}
                </p>
                {artwork.price !== null && (
                  <p className="text-sm font-bold text-foreground mt-2">
                    R {artwork.price?.toLocaleString()}
                  </p>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(artwork)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDelete(artwork.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedArtworkId(artwork.id);
                    setContactOpen(true);
                  }}
                >
                  Contact Artist
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ArtistArtworks;
