import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Artwork {
  id: string;
  title: string;
  image_url: string;
  price?: number;
  year?: string;
  type?: string;
}

const Portfolio = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<any | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!artistId) return;
    setLoading(true);

    const fetch = async () => {
      // Try to read from artists table, fall back to profiles
      const { data: artistData } = await supabase
        .from("artists")
        .select("*, profiles(*)")
        .eq("id", artistId)
        .limit(1)
        .maybeSingle();

      if (artistData) {
        setArtist(artistData);
      } else {
        // fallback to profiles
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", artistId)
          .limit(1)
          .maybeSingle();
        setArtist(profile || null);
      }

      const { data: artworksData } = await supabase
        .from("artworks")
        .select("*")
        .eq("artist_id", artistId)
        .order("created_at", { ascending: false });

      setArtworks((artworksData as any) || []);
      setLoading(false);
    };

    fetch();
  }, [artistId]);

  if (!artistId) return <div>Artist not found</div>;

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
          <img
            src={artist?.avatar_url || "/favicon.ico"}
            alt={artist?.display_name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">
            {artist?.display_name || "Artist"}
          </h1>
          {artist?.bio && (
            <p className="text-muted-foreground mt-2">{artist.bio}</p>
          )}
          {artist?.social_links && (
            <div className="mt-2">
              {/* rudimentary social links rendering */}
              {Object.entries(artist.social_links || {}).map(([k, v]: any) => (
                <a
                  key={k}
                  href={v as string}
                  target="_blank"
                  rel="noreferrer"
                  className="mr-3 underline"
                >
                  {k}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>

        {loading ? (
          <p>Loading…</p>
        ) : artworks.length === 0 ? (
          <p className="text-muted-foreground">No artworks yet.</p>
        ) : (
          <ScrollArea>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {artworks.map((a) => (
                <div key={a.id} className="bg-white p-2 shadow rounded">
                  <Link to={`/#gallery`}>
                    <img
                      src={a.image_url}
                      alt={a.title}
                      className="w-full h-48 object-cover mb-2"
                      loading="lazy"
                    />
                  </Link>
                  <div>
                    <p className="font-semibold">{a.title}</p>
                    {a.price != null && (
                      <p className="text-muted-foreground">R {a.price}</p>
                    )}
                    <div className="mt-2">
                      <Link to={`/#gallery`}>
                        <Button size="sm">View in Exhibition</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </section>
    </main>
  );
};

export default Portfolio;
