import { useState, useEffect } from "react";
import { X, Play, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import ContactArtistDialog from "@/components/ContactArtistDialog";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  artist_id?: string;
  year: string;
  image_url: string;
  cover_image_url?: string | null;
  type: string;
  price: number;
  description: string;
  story: string;
  category: string;
}
const Gallery = () => {
  // local UI state
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtworks = async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select(
          `
          *,
          profiles!artworks_artist_id_fkey(display_name)
        `
        )
        .order("created_at", { ascending: false });

      if (!error && data) {
        const formattedArtworks = data.map((artwork: any) => ({
          id: artwork.id,
          title: artwork.title,
          artist: artwork.profiles?.display_name || "Unknown Artist",
          artist_id: artwork.artist_id,
          year: new Date(artwork.created_at).getFullYear().toString(),
          image_url: artwork.image_url,
          cover_image_url: artwork.cover_image_url,
          type:
            artwork.image_url.includes("video") ||
            artwork.image_url.endsWith(".mp4") ||
            artwork.image_url.endsWith(".webm")
              ? "video"
              : artwork.image_url.endsWith(".mp3") ||
                artwork.image_url.endsWith(".wav") ||
                artwork.image_url.endsWith(".mpeg")
              ? "audio"
              : "image",
          price: artwork.price || 0,
          description: artwork.description || "",
          story: artwork.story || "",
          category: artwork.category,
        }));
        setArtworks(formattedArtworks);
      }
      setLoading(false);
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return (
      <section id="gallery" className="py-24 md:py-32 bg-muted/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">Loading collection...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24 md:py-32 bg-muted/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Current Exhibition
          </p>
          <h2 className="text-gallery-heading text-5xl md:text-6xl lg:text-7xl mb-8">
            Collection
          </h2>
          <div className="w-24 h-px bg-foreground/20 mx-auto"></div>
        </div>

        {artworks.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p>No artworks available yet. Check back soon!</p>
          </div>
        ) : (
          /* Magazine-Style Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {artworks
              .filter((artwork) =>
                categoryFilter === "all"
                  ? true
                  : artwork.category?.toLowerCase() ===
                    categoryFilter.toLowerCase()
              )
              .map((artwork) => (
                <div
                  key={artwork.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  {/* Magazine Page Frame */}
                  <div className="relative bg-white p-2 md:p-3 shadow-2xl aspect-[3/4] overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                    <div className="relative w-full h-full overflow-hidden">
                      {artwork.type === "audio" ? (
                        <>
                          {artwork.cover_image_url ? (
                            <img
                              src={artwork.cover_image_url}
                              alt={artwork.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                              <Music className="w-20 h-20 text-primary" />
                            </div>
                          )}
                        </>
                      ) : artwork.type === "video" ? (
                        <video
                          src={artwork.image_url}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={artwork.image_url}
                          alt={artwork.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}

                      {/* Video Indicator */}
                      {artwork.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                            <Play
                              className="w-8 h-8 text-black ml-1"
                              fill="black"
                            />
                          </div>
                        </div>
                      )}

                      {/* Audio Indicator */}
                      {artwork.type === "audio" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                            <Play
                              className="w-8 h-8 text-black ml-1"
                              fill="black"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Title Strip - Magazine Style */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white px-2 py-1.5 border-t border-black/10">
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-wide truncate text-black">
                        {artwork.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          onClick={() => setSelectedArtwork(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-white/10 transition-smooth rounded-full z-10"
            onClick={() => setSelectedArtwork(null)}
          >
            <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>

          <div
            className="max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <ScrollArea className="h-[90vh]">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-2">
                <div className="relative bg-white p-3 md:p-4 shadow-2xl">
                  {selectedArtwork.type === "audio" ? (
                    <div className="w-full aspect-square flex flex-col items-center justify-center gap-6">
                      {selectedArtwork.cover_image_url ? (
                        <img
                          src={selectedArtwork.cover_image_url}
                          alt={selectedArtwork.title}
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                      ) : (
                        <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center rounded-lg">
                          <Music className="w-32 h-32 text-primary" />
                        </div>
                      )}
                      <audio controls className="w-full max-w-md">
                        <source
                          src={selectedArtwork.image_url}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : selectedArtwork.type === "video" ? (
                    <video controls className="w-full h-auto">
                      <source
                        src={selectedArtwork.image_url}
                        type="video/mp4"
                      />
                      Your browser does not support the video element.
                    </video>
                  ) : (
                    <img
                      src={selectedArtwork.image_url}
                      alt={selectedArtwork.title}
                      className="w-full h-auto"
                    />
                  )}
                </div>

                <div className="space-y-6 text-white pb-8">
                  <div>
                    <div className="text-brutalist text-[clamp(2rem,6vw,4rem)] leading-none mb-4">
                      {selectedArtwork.title}
                    </div>
                    <p className="text-xl text-white/70">
                      {selectedArtwork.artist}
                    </p>
                    <p className="text-sm text-white/50 mt-2">
                      {selectedArtwork.year}
                    </p>
                  </div>

                  <div className="h-px bg-white/20"></div>

                  <div>
                    {selectedArtwork.description && (
                      <p className="text-white/70 leading-relaxed">
                        {selectedArtwork.description}
                      </p>
                    )}
                    {selectedArtwork.story && (
                      <p className="text-white/70 leading-relaxed mt-4">
                        {selectedArtwork.story}
                      </p>
                    )}
                    {!selectedArtwork.description && !selectedArtwork.story && (
                      <p className="text-white/70 leading-relaxed">
                        A beautiful piece from our collection. Contact us to
                        learn more about this artwork.
                      </p>
                    )}
                  </div>

                  <div className="h-px bg-white/20"></div>

                  <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">
                        R {selectedArtwork.price.toLocaleString()}
                      </span>
                      <span className="text-white/50 text-sm">ZAR</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="lg"
                        className="flex-1 text-brutalist text-lg"
                        onClick={() => {
                          // Payments removed — navigate to artist portfolio
                          if (selectedArtwork?.artist_id) {
                            navigate(`/portfolio/${selectedArtwork.artist_id}`);
                          }
                        }}
                      >
                        View Artist Portfolio
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() => setContactOpen(true)}
                        className="w-48"
                      >
                        Contact Artist
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      <ContactArtistDialog
        open={contactOpen}
        onOpenChange={setContactOpen}
        artistId={selectedArtwork?.artist_id || ""}
        artistName={selectedArtwork?.artist}
        artworkId={selectedArtwork?.id}
      />
    </section>
  );
};

export default Gallery;
