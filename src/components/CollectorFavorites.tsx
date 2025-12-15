import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Favorite {
  id: string;
  artwork_id: string;
  artworks: {
    id: string;
    title: string;
    image_url: string;
    price: number;
    artist_id: string;
  };
}

const CollectorFavorites = ({ userId }: { userId: string }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFavorites = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .select("*, artworks(*)")
      .eq("user_id", userId);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setFavorites(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  const handleRemove = async (id: string) => {
    const { error } = await supabase.from("favorites").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Removed", description: "Artwork removed from favorites" });
      fetchFavorites();
    }
  };

  if (loading) return <div className="text-muted-foreground">Loading favorites...</div>;

  if (favorites.length === 0) {
    return <div className="text-center text-muted-foreground py-8">No favorites yet. Start exploring the gallery!</div>;
  }

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {favorites.map((fav) => (
        <Card key={fav.id} className="overflow-hidden">
          <img src={fav.artworks.image_url} alt={fav.artworks.title} className="w-full h-48 object-cover" />
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground">{fav.artworks.title}</h3>
            <p className="text-sm font-bold text-foreground mt-2">R {fav.artworks.price?.toLocaleString()}</p>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3"
              onClick={() => handleRemove(fav.id)}
            >
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CollectorFavorites;
